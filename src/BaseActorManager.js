function BaseActorManager ( game ) {
	
	this.mGame = game;

	this.actors = [];
}

BaseActorManager.prototype.createBaseActor = function createBaseActor( x, y ) {
	var newActor = new BaseActor( this.mGame, this.mGame.canvas, x, y );
	this.add( newActor );
	return newActor;
};

BaseActorManager.prototype.add = function add ( actor ) {
	this.actors.push( actor );	
};

BaseActorManager.prototype.update = function update ( dt ) {	
	for (var i = 0; i < this.actors.length; i++) {
		if ( this.actors[i].isAwaitingDelete ) {
			this.actors[i].free();
			this.actors[i] = null;
			this,actors.splice( i, 1 );
			i--;
		}
		else {
			this.actors[i].update( dt );
		}		
	}
};

BaseActorManager.prototype.onDebugDraw = function onDebugDraw( graphObj ) {
	for (var i = 0; i < this.actors.length; i++) {
		this.actors[i].onDebugDraw( graphObj );
	}
};

