/**
* @constructor
* @param {Game} game
*/
function GSandbox ( game ) {
    GSandbox.instance = this;

    /** @type {Game} */
    this.m_game = game;
    /** @type {PIXI.DisplayObjectContainer} */
    this.m_canvas = Application.instance.canvas;
    /** @type {PIXI.Sprite} */
    this.m_tooltip = null;
}

GSandbox.instance = null;

GSandbox.prototype.game = function () {
    return this.m_game;
};

GSandbox.prototype.setTooltip = function ( x, y, spriteID ) {
    if ( this.m_tooltip !== null ) {
        this.m_canvas.removeChild( this.m_tooltip );
        this.m_tooltip = null;
    }

};

GSandbox.prototype.onPointerPress = function ( x, y, id ) {
    
};

GSandbox.prototype.addActor = function ( x, y, params ) {

};

GSandbox.prototype.setTile = function ( row, col, layer, tileID ) {
    this.m_game.world.map.setTile( row, col, layer, tileID );
};

GSandbox.prototype.deleteTile = function ( row, col, layer ) {
    this.m_game.world.map.deleteTile( row, col, layer );
};

GSandbox.prototype.setCollisionCell = function ( row, col, type ) {
    this.m_game.world.map.setCollisionCell( row, col, type );
};

GSandbox.prototype.setCollisionCellByPosition = function ( x, y, type ) {
    this.m_game.world.map.setCollisionCellByPosition( x, y, type );
};

GSandbox.prototype.getMapData = function () {
    return this.m_game.world.map.getMapData();
};

