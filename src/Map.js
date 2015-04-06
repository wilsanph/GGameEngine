


function Map ( world, data ) {
	
	this.m_game = world.game;
	this.m_world = world;

	this.m_canvas = world.canvas;

	this.data = data;


	this.layers = [];

	/** @type {number} width in tiles */
	this.cols = 0;
	/** @type {number} height in tiles */
	this.rows = 0;

	/** @type {number} width of a single tile */
	this.tileWidth = 0;
	/** @type {number} height of a single tile */
	this.tileHeight = 0;

	this.tileLayers = [];	

	this.baseTextures = {};

	/** @type {Array.<Array.<number>>} */
	this.collisionLayer = [];

	this.init();
}

/** @type {number} */ Map.CELL_EMPTY = 0;
/** @type {number} */ Map.CELL_FULL = 1;

Map.prototype.init = function init() {

	this.cols = this.data["width"];
	this.rows = this.data["height"];
	this.tileWidth = this.data["tilewidth"];
	this.tileHeight = this.data["tileheight"];

	var numLayers = this.data["layers"].length;
	for (var k = 0; k < numLayers; k++) {
		var layer = {};
		layer["name"] = this.data["layers"][k]["name"];
		layer["visible"] = this.data["layers"][k]["visible"];
		layer["grid"] = [];
		for (var i = 0; i < this.rows; i++) {
			var row = [];
			for (var j = 0; j < this.cols; j++) {
				row.push( this.data["layers"][k]["data"][i*this.cols + j] );
			}
			layer["grid"].push( row );
		}
		this.layers.push( layer );
	}

	this.initializeTextures();
	this.initializeCollisions();

	this.createMapLayers();
};

Map.prototype.initializeTextures = function () {
	for ( var i = 0; i < 18; i++ ) {
		var gid = i + 1;
		this.baseTextures[gid] = PIXI.Texture.fromFrame( Common.getTileName( "map1_tile", gid ) + ".png" );
	}
};

Map.prototype.initializeCollisions = function () {
	for ( var i = 0; i < this.rows; i++ ) {
		var row = [];
		for ( var j = 0; j < this.cols; j++ ) {
			row.push( Map.CELL_EMPTY );
		}
		this.collisionLayer.push( row );
	}
};

Map.prototype.createMapLayers = function () {
	for ( var k = 0; k < this.layers.length; k++ ) {
		var tileLayer = [];
		for (var i = 0; i < this.rows; i++) {
			var tileRow = [];
			for (var j = 0; j < this.cols; j++) {
				var gid = this.layers[k]["grid"][i][j];
				var texture = this.baseTextures[gid];
				var sprite = new PIXI.Sprite( texture );
				this.m_canvas.addChild( sprite );
				tileRow.push( sprite );
			}			
			tileLayer.push( tileRow );
		}
		this.tileLayers.push( tileLayer );
	}
};

Map.prototype.update = function ( dt ) {	
	this.render();
};


Map.prototype.render = function () {
	for ( var k = 0; k < this.tileLayers.length; k++ ) {
		for ( var i = 0; i < this.rows; i++ ) {
			for ( var j = 0; j < this.cols; j++ ) {
				if ( this.tileLayers[k][i][j] === null ) {
					continue;
				}
				var xPos = ( j * this.tileWidth );
				var yPos = ( i * this.tileHeight );
				this.tileLayers[k][i][j].position.x = xPos;
				this.tileLayers[k][i][j].position.y = yPos;
			}
		}
	}
};

/**
* @param {number} row
* @param {number} col
* @param {number} layer
* @param {string} tileName
*/
Map.prototype.setTile = function ( row, col, layer, tileName ) {
	var texture = PIXI.Sprite.fromFrame( tileName );
	var sprite = new PIXI.Sprite( texture );
	if ( this.tileLayers[layer][row][col] !== null ) {
		this.deleteTile( row, col, layer );
	}
	this.tileLayers[layer][row][col] = sprite;
	this.m_canvas.addChild( sprite );
	var xPos = ( col * this.tileWidth );
	var yPos = ( row * this.tileHeight );
	this.tileLayers[layer][row][col].position.x = xPos;
	this.tileLayers[layer][row][col].position.y = yPos;
};

/**
* @param {number} row
* @param {number} col
* @param {number} layer
*/
Map.prototype.deleteTile = function ( row, col, layer ) {
	if ( this.tileLayers[layer][row][col] === null ) {
		return;
	}
	this.m_canvas.removeChild( this.tileLayers[layer][row][col] );
	this.tileLayers[layer][row][col] = null;
};

Map.prototype.setCollisionCell = function ( row, col, type ) {
	row = ( row < 0 ) ? 0 : row;
	row = ( row > this.rows - 1 ) ? this.rows - 1 : row;
	col = ( col < 0 ) ? 0 : col;
	col = ( col > this.cols - 1 ) ? this.cols - 1 : col;
	this.collisionLayer[row][col] = type;
};

Map.prototype.getCollisionInCell = function ( row, col ) {
	row = ( row < 0 ) ? 0 : row;
	row = ( row > this.rows - 1 ) ? this.rows - 1 : row;
	col = ( col < 0 ) ? 0 : col;
	col = ( col > this.cols - 1 ) ? this.cols - 1 : col;
	return this.collisionLayer[row][col];
};

Map.prototype.getCollisionInPosition = function ( x, y ) {
	var tCol = Math.floor( x / this.tileWidth );
	var tRow = Math.floor( y / this.tileHeight );
	return this.getCollisionInCell( tRow, tCol );
};

Map.prototype.setCollisionCellByPosition = function ( x, y, type ) {
	var tCol = Math.floor( x / this.tileWidth );
	var tRow = Math.floor( y / this.tileHeight );
	this.setCollisionCell( tRow, tCol, type );
};

Map.prototype.getMapData = function () {
	return this.collisionLayer;
};

Map.prototype.debugDraw = function ( debugGraphics ) {
	debugGraphics.beginFill( 0x0000ff, 0.15 );
	debugGraphics.lineStyle( 2, 0x0000ff, 1 );
	////this.debugGraphics.drawRect( x, y,
	////							 w, h );
	for ( var i = 0; i < this.rows; i++ ) {
		for ( var j = 0; j < this.cols; j++ ) {
			if ( this.collisionLayer[i][j] === Map.CELL_EMPTY ) {
				continue;
			}
			var xPos = j * this.tileWidth;
			var yPos = i * this.tileHeight;
			debugGraphics.drawRect( xPos, yPos,
									this.tileWidth,
									this.tileHeight );
		}
	}
};

