
function Character ( x, y, canvas ) {
	
	this.m_x = x;	
	this.m_y = y;
	this.m_canvas = canvas;	

	this.m_name = "noname";
	
	this.state = "None";
	this.m_states = {};

	this.m_clip = null;	

	this.m_endAnimationCaller = null;
	this.m_endAnimationCallback = null;
}


Character.prototype.setEndAnimationCallback = function setEndAnimationCallback( caller, callback ) {
	this.m_endAnimationCaller = caller;
	this.m_endAnimationCallback = callback;	
};

Character.prototype.setName = function setName( name ) {
	this.m_name = name;
};

Character.prototype.setX = function ( x ) {
	this.m_x = x;
};

Character.prototype.setY = function ( y ) {
	this.m_y = y;
};

Character.prototype.addState = function addState( idState, animationID ) {
	this.m_states[idState] = animationID;
};


Character.prototype.update = function update( dt ) {
	if ( this.m_clip !== null ) {
		this.m_clip.position.x = this.m_x;
		this.m_clip.position.y = this.m_y;
		this.m_clip.update( dt );		
	}
};


Character.prototype.gotoState = function gotoState( state ) {
	if ( this.state === state ) {
		return;
	}
	this.state = state;

	// Check if the animationID for this given state is in the ...
	// ... registered states
	if ( typeof this.m_states[state] === "undefined" ) {
		console.log( "Character::gotoState> state " + state + "is not registered in " +
					 this.m_name );
		return;
	}
	if ( this.m_clip !== null ) {
		this.m_canvas.removeChild( this.m_clip );
	}
	this.m_clip = new Animation( this.m_states[this.state] );
	this.m_clip.position.x = this.m_x;
	this.m_clip.position.y = this.m_y;
	//this.m_clip.anchor.x = 0.5;
	//this.m_clip.anchor.y = 0.5;
	this.m_canvas.addChild( this.m_clip );
	this.m_clip.setEndAnimationCallback( this.m_endAnimationCaller, this.m_endAnimationCallback );
};

