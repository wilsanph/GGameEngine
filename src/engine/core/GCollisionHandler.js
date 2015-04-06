/**
* @constructor
* @struct
* @param {GWorldActor} agent
*/
function GCollisionHandler( agent ) {
    /** @type {GWorldActor} */
    this.m_agent = agent;
    /** @type {Map} */
    this.m_map = agent.world().map;

    this.init();
}

GCollisionHandler.prototype.init = function () {
    // Override this
};

GCollisionHandler.prototype.update = function ( dt ) {
    // Override this
};

GCollisionHandler.prototype.free = function () {
    // Override this
};

GCollisionHandler.prototype.debugDraw = function ( debugGraphics ) {
    // Override this
};