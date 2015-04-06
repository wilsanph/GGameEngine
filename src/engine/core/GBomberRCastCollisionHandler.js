/**
* @constructor
* @struct
* @param {GBomberWorldActor} agent
* @extends GCollisionHandler
*/
function GBomberRCastCollisionHandler( agent ) {
    /** @type {Array.<Ray>} */
    this.m_rays = [];
    /** @type {number} */
    this.m_fVx = 0;
    /** @type {number} */
    this.m_fVy = 0;

    GCollisionHandler.call( this, agent );
}
Application.subclass( GBomberRCastCollisionHandler, GCollisionHandler );


GBomberRCastCollisionHandler.prototype.init = function () {
    this.m_rays.push( new Ray( this.m_agent, this.m_map, 0 ) );
    this.m_rays.push( new Ray( this.m_agent, this.m_map, 0.5 * Math.PI ) );
    this.m_rays.push( new Ray( this.m_agent, this.m_map, Math.PI ) );
    this.m_rays.push( new Ray( this.m_agent, this.m_map, 1.5 * Math.PI ) );
};

GBomberRCastCollisionHandler.prototype.update = function ( dt ) {
    var fvx = 0;
    var fvy = 0;
    for ( var i = 0; i < this.m_rays.length; i++ ) {
        this.m_rays[i].update( dt );
        if ( this.m_rays[i].length() < 50 ) {
            if ( !this.m_rays[i].isActive ) {
                continue;
            }
            fvx = - Math.abs( this.m_agent.getSpeedX() ) * Math.cos( this.m_rays[i].angle() );
            fvy = - Math.abs( this.m_agent.getSpeedY() ) * Math.sin( this.m_rays[i].angle() );
        }
    }

    this.m_fVx = fvx;
    this.m_fVy = fvy;
    this.m_agent.setX( this.m_agent.getX() + this.m_fVx * dt );
    this.m_agent.setY( this.m_agent.getY() + this.m_fVy * dt );
};

GBomberRCastCollisionHandler.prototype.debugDraw = function ( debugGraphics ) {
    GCollisionHandler.prototype.debugDraw.call( this, debugGraphics );
    for ( var i = 0; i < this.m_rays.length; i++ ) {
        this.m_rays[i].debugDraw( debugGraphics );
    }
};

GBomberRCastCollisionHandler.prototype.setActiveRay = function ( rayIndx, active ) {
    this.m_rays[rayIndx].isActive = active;
};

/**
* @constructor
* @struct
* @param {GBomberWorldActor} agent
* @param {Map} map
* @param {number} angle
*/
function Ray ( agent, map, angle ) {
    /** @type {GBomberWorldActor} */
    this.m_agent = agent;
    /** @type {number} */
    this.m_angle = angle;
    /** @type {Point} */
    this.m_xy0 = new Point( 0, 0 );
    /** @type {Point} */
    this.m_xyf = new Point( 0, 0 );
    /** @type {number} */
    this.m_length = 0;
    /** @type {number} */
    this.m_rayCastStep = 10;
    /** @type {number} */
    this.m_rayCastLength = 200;
    /** @type {Map} */
    this.m_map = map;
    /** @type {boolean} */
    this.isActive = true;
}

Ray.prototype.update = function ( dt ) {
    this.m_xy0.x = this.m_agent.getX();
    this.m_xy0.y = this.m_agent.getY();

    this.rayCast();
};

Ray.prototype.rayCast = function () {
    var numSteps = Math.floor( this.m_rayCastLength / this.m_rayCastStep );
    this.m_length = 0;
    var dxRayCast = this.m_rayCastStep * Math.cos( this.m_angle );
    var dyRayCast = this.m_rayCastStep * Math.sin( this.m_angle );
    for ( var i = 1; i <= numSteps; i++ ) {
        this.m_length += this.m_rayCastStep;
        this.m_xyf.x = this.m_xy0.x + i * dxRayCast;
        this.m_xyf.y = this.m_xy0.y + i * dyRayCast;
        if ( this.m_map.getCollisionInPosition( this.m_xyf.x, 
                                                this.m_xyf.y ) === Map.CELL_FULL ) {
            // If found a full cell in the road, then end the raycasting process
            break;
        }
    }
};

Ray.prototype.xy0 = function () {
    return this.m_xy0;
};

Ray.prototype.xyf = function () {
    return this.m_xyf;
};

Ray.prototype.angle = function () {
    return this.m_angle;
};

Ray.prototype.length = function () {
    return this.m_length;
};

Ray.prototype.debugDraw = function ( debugGraphics ) {
    debugGraphics.lineStyle( 2, 0x00ffff, 0.25 );
    debugGraphics.moveTo( this.m_xy0.x, this.m_xy0.y );
    debugGraphics.lineTo( this.m_xyf.x, this.m_xyf.y );
};