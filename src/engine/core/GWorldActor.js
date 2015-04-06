/**
* @constructor
* @param {PIXI.DisplayObjectContainer} canvas
* @param {World} world
* @param {number} x
* @param {number} y
* @param {Object=} params
*/
function GWorldActor( canvas, world, x, y, params ) {
    /** @type {PIXI.DisplayObjectContainer} */
    this.m_canvas = canvas;
    /** @type {World} */
    this.m_world = world;
    /** @type {number} */
    this.m_x = x;
    /** @type {number} */
    this.m_y = y;
    /** @type {Object} */
    this.m_params = params;
    

    this.m_sprite = null;


    this.init();
}

GWorldActor.prototype.init = function () {
    
};

GWorldActor.prototype.update = function ( dt ) {

};

GWorldActor.prototype.setX = function ( x ) {
    this.m_x = x;
};

GWorldActor.prototype.world = function () {
    return this.m_world;
};

GWorldActor.prototype.setY = function ( y ) {
    this.m_y = y;
};

GWorldActor.prototype.getX = function () {
    return this.m_x;
};

GWorldActor.prototype.getY = function () {
    return this.m_y;
};

GWorldActor.prototype.free = function () {

};

GWorldActor.prototype.debugDraw = function ( debugGraphics ) {
    
};