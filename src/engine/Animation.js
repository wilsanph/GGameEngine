

/**
* @param {string} id
* @extends ṔIXI.DisplayObjectContainer
*/
function Animation ( id ) {	

	PIXI.DisplayObjectContainer.call( this );

	/** @type {Object} */
	this.data = window["animations"][id];

	this.name = id;

	this.isValid = true;

	this.totalFrames = 0;
	this.fps = 30;
	this.textureMap = null;
	this.frames = null;

	this.m_deltaTime = 0;
	this.m_time = 0;

	this.currentFrame = 0;

	this.loop = true;

	this.sprite = null;

	this.m_caller = null;
	this.m_callback = null;

	this.init();
};


Animation.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
Animation.prototype.constructor = PIXI.DisplayObjectContainer;


Animation.prototype.setEndAnimationCallback = function setEndAnimationCallback( caller, callback ) {
	this.m_caller = caller;
	this.m_callback = callback;
};

Animation.prototype.init = function init() {

	if ( typeof this.data === "undefined"  ) {
		console.error( "Animation> couldn't find the animation with id " + this.name );
		this.isValid = false;
		return;
	}

	this.totalFrames = this.data["totalFrames"];
	this.fps = this.data["fps"];
	this.textureMap = this.data["textureMap"];
	this.frames = this.data["frames"];

	this.m_deltaTime = 1000 / this.fps;
	this.setFrame( this.currentFrame );
	this.addChild( this.sprite );
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
};

Animation.prototype.update = function update( dt ) {
	if ( !this.isValid ) {
		return;
	}

	this.m_time += dt;
	if ( this.m_time > this.m_deltaTime ) {
		this.m_time = 0;
		this.currentFrame++;
		if ( this.currentFrame >= this.totalFrames ) {
			if ( this.m_caller !== null && this.m_callback !== null ) {
				this.m_callback.call( this.m_caller, this );
			}
			if ( this.loop ) {
				this.currentFrame = 0;
			}
		}
		this.setFrame( this.currentFrame );
	}
};


Animation.prototype.setFrame = function setFrame( frame ) {
	if ( !this.isValid ) {
		return;
	}

	var frameTextureID = this.textureMap[this.frames[frame]];
	if ( this.sprite !== null ) {
		this.sprite.setTexture( PIXI.TextureCache[frameTextureID] );
	}
	else {
		this.sprite	= new PIXI.Sprite( PIXI.TextureCache[frameTextureID] );		
	}	
};

