/**
* @constructor
* @param {PIXI.DisplayObjectContainer} canvas
* @param {World} world
* @param {number} x
* @param {number} y
* @param {Object=} params
* @extends GBomberWorldActor
*/
function GBomberPlayer ( canvas, world, x, y, params ) {
    /** @type {Character} */
    this.m_character = null;

    GBomberWorldActor.call( this, canvas, world, x, y, params );
}
Application.subclass( GBomberPlayer, GBomberWorldActor );

GBomberPlayer.prototype.init = function () {
	this.m_character = new Character( this.m_x,
					                  this.m_y,
					                  this.m_canvas );
	this.m_character.addState( "stand_right", "red_stand_right" );
	this.m_character.addState( "stand_left", "red_stand_left" );
	this.m_character.addState( "stand_up", "red_stand_up" );
	this.m_character.addState( "stand_down", "red_stand_down" );

	this.m_character.addState( "walk_right", "red_walk_right" );
	this.m_character.addState( "walk_left", "red_walk_left" );
	this.m_character.addState( "walk_up", "red_walk_up" );
	this.m_character.addState( "walk_down", "red_walk_down" );

	this.m_character.gotoState( "stand_left" );

	this.m_collisionHandler = new GBomberRCastCollisionHandler( this );
};

GBomberPlayer.prototype.update = function ( dt ) {
	this.m_collisionHandler.update( dt );
    GBomberWorldActor.prototype.update.call( this, dt );
    this.m_character.setX( this.m_x );
    this.m_character.setY( this.m_y );
    this.m_character.update( dt );
};


GBomberPlayer.prototype.onKeyDown = function ( keyCode ) {
	if ( keyCode === Common.KEY_LEFT ) {
	    this.m_vx = -0.1;
	    this.m_collisionHandler.setActiveRay( 0, false );
	    this.m_collisionHandler.setActiveRay( 2, true );
		this.m_character.gotoState( "walk_left" );
	}
	else if ( keyCode === Common.KEY_RIGHT ) {
	    this.m_vx = 0.1;
	    this.m_collisionHandler.setActiveRay( 2, false );
	    this.m_collisionHandler.setActiveRay( 0, true );
		this.m_character.gotoState( "walk_right" );
	}
	else if ( keyCode === Common.KEY_UP ) {
	    this.m_vy = -0.1;
	    this.m_collisionHandler.setActiveRay( 1, false );
	    this.m_collisionHandler.setActiveRay( 3, true );
		this.m_character.gotoState( "walk_up" );
	}
	else if ( keyCode === Common.KEY_DOWN ) {
	    this.m_vy = 0.1;
	    this.m_collisionHandler.setActiveRay( 3, false );
	    this.m_collisionHandler.setActiveRay( 1, true );
		this.m_character.gotoState( "walk_down" );
	}
};

GBomberPlayer.prototype.onKeyUp = function ( keyCode ) {
	if ( keyCode === Common.KEY_LEFT ) {
	    this.m_vx = 0;
	    this.m_collisionHandler.setActiveRay( 0, true );
		this.m_character.gotoState( "stand_left" );
	}
	else if ( keyCode === Common.KEY_RIGHT ) {
	    this.m_vx = 0;
	    this.m_collisionHandler.setActiveRay( 2, true );
		this.m_character.gotoState( "stand_right" );
	}
	else if ( keyCode === Common.KEY_UP ) {
	    this.m_vy = 0;
	    this.m_collisionHandler.setActiveRay( 3, true );
	    this.m_collisionHandler.setActiveRay( 1, true );
		this.m_character.gotoState( "stand_up" );
	}
	else if ( keyCode === Common.KEY_DOWN ) {
	    this.m_vy = 0;
	    this.m_collisionHandler.setActiveRay( 3, true );
	    this.m_collisionHandler.setActiveRay( 1, true );
		this.m_character.gotoState( "stand_down" );
	}	
};
