/**
* @constructor
* @param {PIXI.DisplayObjectContainer} canvas
* @param {World} world
* @param {number} x
* @param {number} y
* @param {Object=} params
* @extends GWorldActor
*/
function GBomberWorldActor( canvas, world, x, y, params ) {
    /** @type {GBomberRCastCollisionHandler} */
    this.m_collisionHandler = null;
    /** @type {number} */
    this.m_vx = 0;
    /** @type {number} */
    this.m_vy = 0;

    GWorldActor.call( this, canvas, world, x, y, params );
}
Application.subclass( GBomberWorldActor, GWorldActor );

GBomberWorldActor.prototype.update = function ( dt ) {
    this.m_x += this.m_vx * dt;
    this.m_y += this.m_vy * dt;
};

GBomberWorldActor.prototype.getSpeedX = function () {
    return this.m_vx;
};

GBomberWorldActor.prototype.getSpeedY = function () {
    return this.m_vy;
};

GBomberWorldActor.prototype.setSpeedX = function ( vx ) {
    this.m_vx = vx;
};

GBomberWorldActor.prototype.setSpeedY = function ( vy ) {
    this.m_vy = vy;
};

GBomberWorldActor.prototype.debugDraw = function ( debugGraphics ) {
    GWorldActor.prototype.debugDraw.call( this, debugGraphics );
    if ( this.m_collisionHandler !== null ) {
        this.m_collisionHandler.debugDraw( debugGraphics );
    }
};