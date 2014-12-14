


function World ( game, worldData, generalData ) {

	
	this.game = game;
	this.canvas = game.canvas;

	this.worldData = worldData;
	this.generalData = generalData;

	this.camera = null;
	this.map = null;
	
	this.m_testCharacter = null;

	this.init();
}


World.prototype.init = function init() {
	this.camera = new Camera( this );
	this.map = new Map( this, this.worldData );

	this.m_testCharacter = new Character( 0.5 * Application.APP_WIDTH,
					                  	  0.5 * Application.APP_HEIGHT,
					                  	  this.canvas );
	this.m_testCharacter.addState( "stand_right", "red_stand_right" );
	this.m_testCharacter.addState( "stand_left", "red_stand_left" );
	this.m_testCharacter.addState( "stand_up", "red_stand_up" );
	this.m_testCharacter.addState( "stand_down", "red_stand_down" );

	this.m_testCharacter.addState( "walk_right", "red_walk_right" );
	this.m_testCharacter.addState( "walk_left", "red_walk_left" );
	this.m_testCharacter.addState( "walk_up", "red_walk_up" );
	this.m_testCharacter.addState( "walk_down", "red_walk_down" );

	this.m_testCharacter.gotoState( "stand_left" );

};

World.prototype.update = function update ( dt ) {
	this.camera.update( dt );
	this.map.update( dt );
	this.m_testCharacter.update( dt );
};

World.prototype.onKeyDown = function onKeyDown( keyCode ) {
	if ( keyCode === Common.KEY_LEFT ) {
		this.camera.setX( this.camera.getX() - 2 );
		//this.m_testClip.position.x += 10;
		this.m_testCharacter.gotoState( "walk_left" );
	}
	else if ( keyCode === Common.KEY_RIGHT ) {
		this.camera.setX( this.camera.getX() + 2 );
		//this.m_testClip.position.x -= 10;
		this.m_testCharacter.gotoState( "walk_right" );
	}
	else if ( keyCode === Common.KEY_UP ) {
		this.camera.setY( this.camera.getY() - 2 );
		//this.m_testClip.position.y -= 10;
		this.m_testCharacter.gotoState( "walk_up" );
	}
	else if ( keyCode === Common.KEY_DOWN ) {
		this.camera.setY( this.camera.getY() + 2 );
		//this.m_testClip.position.y += 10;
		this.m_testCharacter.gotoState( "walk_down" );
	}
};

World.prototype.onKeyUp = function onKeyUp( keyCode ) {
	if ( keyCode === Common.KEY_LEFT ) {
		this.m_testCharacter.gotoState( "stand_left" );
	}
	else if ( keyCode === Common.KEY_RIGHT ) {
		this.m_testCharacter.gotoState( "stand_right" );
	}
	else if ( keyCode === Common.KEY_UP ) {
		this.m_testCharacter.gotoState( "stand_up" );
	}
	else if ( keyCode === Common.KEY_DOWN ) {
		this.m_testCharacter.gotoState( "stand_down" );
	}	
};