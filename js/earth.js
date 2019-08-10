export function Earth() {

    const textureLoader = new THREE.TextureLoader();
    const ballMat = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        roughness: 0.5,
        metalness: 1.0
    } );
    textureLoader.load( "textures/planets/earth_atmos_2048.jpg", function ( map ) {
        map.anisotropy = 4;
        ballMat.map = map;
        ballMat.needsUpdate = true;
    } );
    textureLoader.load( "textures/planets/earth_specular_2048.jpg", function ( map ) {
        map.anisotropy = 4;
        ballMat.metalnessMap = map;
        ballMat.needsUpdate = true;
    } );

    var ballGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    var ballMesh = new THREE.Mesh( ballGeometry, ballMat );

    ballMesh.position.set( 1, 0.25, 1 );
    ballMesh.rotation.y = Math.PI;
    ballMesh.name = 'earth'
    // ballMesh.castShadow = true;
    return ballMesh
}