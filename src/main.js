var app = new Application();


requestAnimFrame( animate );

function animate () {
	requestAnimFrame( animate );

	app.update();

	app.renderer.render( app.stage );

}