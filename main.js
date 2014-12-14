


function Application () {
	
	Application.instance = this;

	this.stage = new PIXI.Stage( 0x66ff99, true );

	this.renderer = PIXI.autoDetectRenderer( Application.APP_WIDTH,
											 Application.APP_HEIGHT );

	document.body.appendChild( this.renderer.view )	;

	this.canvas = new PIXI.DisplayObjectContainer();
	this.stage.addChild( this.canvas );	

	this.stage.mousedown = function  ( eData ) {
		Application.instance.onMouseDown( eData );
	};

	this.game = new Game( this.canvas );

	this.oldTime = 0;
	this.newTime = 0;
	this.deltaTime = 0;
}

Application.instance = null;
Application.APP_WIDTH = 400;
Application.APP_HEIGHT = 300;

Application.prototype.onMouseDown = function onMouseDown( eData ) {
	console.log( "eventMouseDown" );
	console.log( eData );
	if ( this.game !== null ) {
		this.game.onMouseDown( eData.global.x, eData.global.y );
	}
};

Application.prototype.update = function update() {
	console.log( "update Application" );

	this.newTime = Date.now();
	this.deltaTime = this.newTime - this.oldTime;
	this.oldTime = this.newTime;

	this.game.update( this.deltaTime );
};


function Game( canvas ){

	this.texture = PIXI.Texture.fromImage( "bunny.png" )
	this.bunny = new PIXI.Sprite( this.texture );
	this.canvas = canvas;

	this.bunny.anchor.x = 0.5;
	this.bunny.anchor.y = 0.5;
	this.bunny.position.x = 0.5 * Application.APP_WIDTH;
	this.bunny.position.y = 0.5 * Application.APP_HEIGHT;

	this.canvas.addChild( this.bunny );

	this.mFooParticles = [];

}

Game.MAX_DELTA = 50;

Game.prototype.update = function update( dt ) {
	console.log( "update Game, dt: " + dt );
	dt = ( dt > Game.MAX_DELTA ) ? Game.MAX_DELTA : dt;
	this.bunny.rotation += 2 * Math.PI / 2000 * dt;
	for (var i = 0; i < this.mFooParticles.length; i++) {
		if ( this.mFooParticles[i].isAwaitingDelete ) {
			this.mFooParticles[i].free();
			this.mFooParticles[i] = null;
			this.mFooParticles.splice(i,1);
			i--;
		}
		else{
			this.mFooParticles[i].update( dt );	
		}		
	};
};

Game.prototype.debug_createParticles = function debug_createParticles( x, y ) {
		for (var i = 0; i < 100; i++) {
		var particle = new Particle( this,
									 x, y,
									 2 * Math.PI / 100 * i,
									 0.1);
		this.mFooParticles.push( particle );
	};
};

Game.prototype.onMouseDown = function onMouseDown( x, y ) {
	this.debug_createParticles( x, y );
};

function Particle ( game, x, y, angle, speed ) {

	this.mGame = game;
	this.canvas = game.canvas;

	this.m_x = x;
	this.m_y = y;
	
	this.mAngle = angle;
	this.m_vx = speed * Math.cos( this.mAngle );
	this.m_vy = speed * Math.sin( this.mAngle );

	this.mLifeTime = Particle.LIFE_TIME;

	this.mTexture = PIXI.Texture.fromImage( "particle1.png" );
	this.mSprite = new PIXI.Sprite( this.mTexture );

	this.mSprite.anchor.x = 0.5;
	this.mSprite.anchor.y = 0.5;
	this.mSprite.position.x = this.m_x;
	this.mSprite.position.y = this.m_y;

	this.canvas.addChild( this.mSprite );

	this.dispose = false;
	this.isAwaitingDelete = false;
}

Particle.LIFE_TIME = 1000;


Particle.prototype.update = function update( dt ) {
	this.mLifeTime -= dt;
	if ( this.mLifeTime < 0 ) {
		// Just for now, destroy the particle, and ...
		// ... don't dispose it
		this.isAwaitingDelete = true;
		this.dispose = true;
		this.onDispose();
	}
	else {
		this.mSprite.alpha = ( this.mLifeTime / Particle.LIFE_TIME );
	}
	this.motionModel( dt );
	this.mSprite.position.x = this.m_x;
	this.mSprite.position.y = this.m_y;
};

Particle.prototype.motionModel = function motionModel( dt ) {
	this.m_x += this.m_vx * dt;
	this.m_y += this.m_vy * dt;
};

Particle.prototype.onDispose = function onDispose() {
	this.m_x = 0;
	this.m_y = 0;
	this.m_vx = 0;
	this.m_vy = 0;
};

Particle.prototype.free = function free() {
	if ( this.mSprite !== null ) {
		this.canvas.removeChild( this.mSprite );
		this.mSprite = null;
		this.mTexture = null;
	}
};

var app = new Application();


requestAnimFrame( animate );

function animate () {
	requestAnimFrame( animate );

	app.update();

	app.renderer.render( app.stage );

}