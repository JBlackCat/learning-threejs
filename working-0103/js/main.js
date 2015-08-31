function init() {
    var getId = function(id) {
        return document.getElementById(id);
    };

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
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
    camera.lookAt(scene.position);;

    getId("webgl-output").appendChild(renderer.domElement);
    renderer.render(scene, camera);

}

window.onload = init();
