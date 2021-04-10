import { Water } from './examples/jsm/objects/Water2.js';


let scene, camera, renderer, water;

function init() {

	// Check if WebGL is available see Three/examples
	// No need for webgl2 here - change as appropriate
	if ( THREE.WEBGL.isWebGLAvailable() === false ) {

		// if not print error on console and exit
		document.body.appendChild( WEBGL.getWebGLErrorMessage() );

	}
	var container = document.createElement( 'div' );
	document.body.appendChild( container );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 200);
	camera.position.set(-15, 7,15);
	camera.lookAt(scene.position);

	const planeGeometry = new THREE.PlaneGeometry(10,10);
	const planeMaterial = new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.4});
	const sand = new THREE.Mesh(planeGeometry, planeMaterial);
	sand.rotation.x = Math.PI*-0.5;
	scene.add(sand);

	const waterGeometry = new THREE.PlaneGeometry(10,10);

	water = new Water( waterGeometry, {
		color: '#ffffff',
		scale: 4,
		flowDirection: new THREE.Vector2(1,1),
		textureWidth: 1024,
		textureHeight: 1024
	});

	const cubeTextureLoader = new THREE.CubeTextureLoader();
	cubeTextureLoader.setPath( 'textures/cube/Park2/' );

	const cubeTexture = cubeTextureLoader.load( [
		"posx.jpg", "negx.jpg",
		"posy.jpg", "negy.jpg",
		"posz.jpg", "negz.jpg"
	] );

	const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
	directionalLight.position.set( - 1, 1, 1 );
	scene.add( directionalLight );


	scene.background = cubeTexture;
	water.position.y = 1;
	water.rotation.x = Math.PI * -0.5;
	scene.add(water);

}

function onResize() {

	// Modify camera to keep aspect ratio

	camera.updateProjectionMatrix();
	// If we use a canvas then we also have to worry of resizing it
	renderer.setSize( window.innerWidth, window.innerHeight );

}
function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {
	renderer.render( scene, camera );

}
window.onload = init;
window.onload = animate();
window.addEventListener( 'resize', onResize, true );
