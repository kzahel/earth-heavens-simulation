import * as earth from './earth.js'

const clock = new THREE.Clock();

function drawParticles(scene) {
    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    for ( var i = 0; i < 10000; i ++ ) {
        vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // x
        vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // y
        vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // z
    }
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    scene.add( particles );
}

function createLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const color = '#fcc'
    const sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    const light1 = new THREE.PointLight( color, 2, 50 );
    light1.name = 'light1'
    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color } ) ) );
    scene.add( light1 );
}

function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( '#000' );
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 15;

    const earthMesh = earth.Earth()

    drawParticles(scene)
    createLights(scene)
    scene.add(earthMesh)

    return {renderer, scene, camera}
}

const startTime = Date.now()

const tick = function (renderer, camera, scene) {
	const simtime = (Date.now() - startTime) * 0.0005;
    const delta = clock.getDelta();
    console.log('udpate')

    const light1 = scene.getObjectByName('light1')
    light1.position.x = Math.sin( simtime * 0.7 ) * 30;
    light1.position.y = Math.cos( simtime * 0.5 ) * 40;
    light1.position.z = -10 + Math.cos( simtime * 0.3 ) * 30;

    scene.getObjectByName('earth').rotation.y += 0.002;
    renderer.render( scene, camera );
};

function startloop(func) {
    console.log('startloop')

    function loop() {
        requestAnimationFrame(loop)
        func()
    }

    loop()
}

function main() {
    const {renderer, camera, scene} = createScene()
    const updateFn = function() { tick(renderer, camera, scene) }
    startloop(updateFn)
}

main()