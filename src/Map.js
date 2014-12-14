


function Map ( world, data ) {
	
	this.mGame = world.game;
	this.mWorld = world;

	this.mCanvas = world.canvas;

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

	this.init();
}

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

	this.createMapLayers();
};

Map.prototype.initializeTextures = function initializeTextures() {
	for (var i = 0; i < 18; i++) {
		var gid = i + 1;
		this.baseTextures[gid] = PIXI.Texture.fromFrame( Common.getTileName( "map1_tile", gid ) + ".png" );
	}
};

Map.prototype.createMapLayers = function createMapLayers() {
	for (var k = 0; k < this.layers.length; k++) {
		var tileLayer = [];
		for (var i = 0; i < this.rows; i++) {
			var tileRow = [];
			for (var j = 0; j < this.cols; j++) {
				var gid = this.layers[k]["grid"][i][j];
				var texture = this.baseTextures[gid];
				var sprite = new PIXI.Sprite( texture );
				this.mCanvas.addChild( sprite );
				tileRow.push( sprite );
			}			
			tileLayer.push( tileRow );
		}
		this.tileLayers.push( tileLayer );
	}
};

Map.prototype.update = function update( dt ) {	
	this.render();
};


Map.prototype.render = function render() {
	// Use the world camera current position to render the appropiate tiles in ...
	// ... their respective positions
	var xOffset = this.mWorld.camera.getX();
	var yOffset = this.mWorld.camera.getY();

	for (var k = 0; k < this.tileLayers.length; k++) {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				var xPos = ( j * this.tileWidth ) - xOffset;
				var yPos = ( i * this.tileHeight ) - yOffset;
				this.tileLayers[k][i][j].position.x = xPos;
				this.tileLayers[k][i][j].position.y = yPos;
			}
		}
	}

};


