function getById(id) {
    "use strict";
    return document.getElementById(id);
}

function initStats() {
    "use strict";

    var stats = new Stats();

    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';

    getById('stats-output').appendChild(stats.domElement);

    return stats;
}

var camera;
var scene;
var renderer;

function initScene() {
    "use strict";

    var stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var axes = new THREE.AxisHelper( 20 );
    scene.add(axes);

    var planeGeometry = new THREE.PlaneBufferGeometry(60,20);
    var planeMaterial = new THREE.MeshLambertMaterial ({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.receiveShadow = true;

    plane.rotation.x=-0.5*Math.PI;
    plane.position.x=15;
    plane.position.y=0;
    plane.position.z=0;

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true;

    cube.position.x=-4;
    cube.position.y=3;
    cube.position.z=0;

    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.castShadow = true;

    sphere.position.x=20;
    sphere.position.y=4;
    sphere.position.z=2;

    scene.add(sphere);

    var spotLight = new THREE.SpotLight( 0xffffff );

    spotLight.castShadow = true;

    spotLight.position.set( -40, 60, -10 );

    scene.add( spotLight );

    camera.position.x=-30;
    camera.position.y=40;
    camera.position.z=30;
    camera.lookAt(scene.position);

    //Needs to be defined outside of the renderScene
    //Or else step is always starts at 0 and doesn't work.
    var step = 0;

    var controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.02;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    function renderScene() {
        stats.update();

        //animate the cube - rotate around all axes.
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        //animate the sphere - bounce the sphere.
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * (Math.abs(Math.cos(step))));

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    getById("webgl-output").appendChild(renderer.domElement);
    renderScene();

}

//Not Debounced
// function onResize(){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     console.log('resize');
// }

window.onload = initScene();

//Debounced
// window.addEventListener('resize', onResize, false);

//Debounced - Better, but how do I put this in a separate function outside of the add eventlister so I can remove if needed?
var resizeTimer;
window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('resize');
    }, 250);
}, false);
