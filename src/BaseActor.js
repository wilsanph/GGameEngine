/**
* @constructor
* @param {Game} game
* @param {PIXI.DisplayObjectContainer} canvas
* @param {number} x
* @param {number} y
* @param {Object=} params
*/
function BaseActor ( game, canvas, x, y, params ) {
	
	this.mGame = game;
	this.mCanvas = canvas;
	this.mParams = params;

	this.x = x;
	this.y = y;

	this.mTexture = null;
	this.mSprite = null;

	/** @type {boolean} */
	this.isInFloor = false;

	// Physics related parameters *************************
	this.mGravity = BaseActor.GRAVITY;
	this.mRestitution = BaseActor.RESTITUTION;
	this.mJumpSpeed = BaseActor.JUMP_SPEED;
	this.mRunningSpeed = BaseActor.RUNNING_SPEED;

	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	//*****************************************************

	this.bounds = new Rectangle( -40, -40, 80, 80 );

	this.isAwaitingDelete = false;

	this.worldState = -1;

	this.init();
}

BaseActor.GRAVITY = 0.0001;

BaseActor.RESTITUTION = 0.2;

BaseActor.JUMP_SPEED = 0.3;

BaseActor.RUNNING_SPEED = 0.05;


BaseActor.WORLD_STATE_IN_AIR = 0;
BaseActor.WORLD_STATE_IN_FLOOR = 1;

BaseActor.prototype.init = function init() {
	this.mTexture = PIXI.Texture.fromFrame( Game.ASSETS_NAMES["saurio"] );
	this.mSprite = new PIXI.Sprite( this.mTexture );
	this.mSprite.position.x = this.x;
	this.mSprite.position.y = this.y;
	this.mSprite.anchor.x = 0.5;
	this.mSprite.anchor.y = 0.5;
	this.mSprite.scale.x = 0.5;
	this.mSprite.scale.y = 0.5;
	this.mCanvas.addChild( this.mSprite );
};

/**
* @param {number} dt
*/
BaseActor.prototype.update = function update( dt ) {	
	this.motionModel( dt );

	this.mSprite.position.x = this.x;
	this.mSprite.position.y = this.y;

	this.checkBoundaryCollisions( dt );
};

/**
* @param {number} dt
*/
BaseActor.prototype.motionModel = function motionModel( dt ) {
	this.vx += this.ax * dt;
	this.vy += ( this.ay * dt ) * ( ( this.worldState === BaseActor.WORLD_STATE_IN_AIR ) ? 1 : 0 );
	this.x += this.vx * dt;
	this.y += this.vy * dt;
};

/**
* @param {number} dt
*/
BaseActor.prototype.checkBoundaryCollisions = function checkBoundaryCollisions( dt ) {
	if ( this.y + 0.75 * this.bounds.h > Game.GAME_AREA_BOTTOM ) {
		this.worldState = BaseActor.WORLD_STATE_IN_FLOOR;
		this.y = Game.GAME_AREA_BOTTOM - 0.75 * this.bounds.h;
	}
};

BaseActor.prototype.applyImpulse = function applyImpulse( vx, vy ) {
	this.vx += vx;
	this.vy += vy;
};

BaseActor.prototype.onJump = function onJump() {
	if ( this.worldState === BaseActor.WORLD_STATE_IN_AIR ) {
		return;
	}
	this.y = Game.GAME_AREA_BOTTOM - 0.75 * this.bounds.h - 2;
	this.worldState = BaseActor.WORLD_STATE_IN_AIR;
	this.applyImpulse( 0, -BaseActor.JUMP_SPEED );
};

BaseActor.prototype.free = function free() {
	if ( this.mSprite !== null ) {
		this.mCanvas.removeChild( this.mSprite );
		this.mSprite = null;
		this.mTexture = null;
	}
};



BaseActor.prototype.onDebugDraw = function onDebugDraw( graphObj ) {
	graphObj.lineStyle( 2, 0xff0000 , 1 );
	graphObj.drawRect( this.x + this.bounds.x,
					   this.y + this.bounds.y,
					   this.bounds.w,
					   this.bounds.h );
};