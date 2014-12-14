




function Particle ( game, x, y, angle, speed ) {

	this.mGame = game;
	this.canvas = game.canvas;

	this.m_x = x;
	this.m_y = y;
	
	this.mAngle = angle;
	this.m_vx = speed * Math.cos( this.mAngle );
	this.m_vy = speed * Math.sin( this.mAngle );

	this.mLifeTime = Particle.LIFE_TIME;

	//this.mTexture = PIXI.Texture.fromImage( "particle1.png" );
	this.mTexture = PIXI.Texture.fromFrame( Game.ASSETS_NAMES["particle"] );
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












