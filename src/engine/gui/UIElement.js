/**
* @param {number} x
* @param {number} y
* @param {StateScene} parent StateScene the element it belongs to
* @param {DisplayObjectContainer} canvas optional specific container where to render
* @param {Object} data properties of this element parsed from the UI.json file
*/
function UIElement ( x, y, parent, canvas, data ) {
	
	this.m_x = x;
	this.m_y = y;

	this.name = data["id"];
	this.type = data["type"];

	this.bounds = new Rectangle();
	var bounds = ( typeof data["bounds"] === "undefined" ) ? { x : -0.5 * UIElement.DEFAULT_WIDTH,
															   y : -0.5 * UIElement.DEFAULT_HEIGHT,
															   w : UIElement.DEFAULT_WIDTH,
															   h : UIElement.DEFAULT_HEIGHT } : data["bounds"];
	this.bounds.x = bounds["x"];
	this.bounds.y = bounds["y"];
	this.bounds.w = bounds["w"];
	this.bounds.h = bounds["h"];

	this.parentScene = parent;
	this.m_container = new PIXI.DisplayObjectContainer();
	this.m_rootCanvas = null;
	if ( canvas !== null ) {
		this.m_rootCanvas = canvas;
	}
	else {
		this.m_rootCanvas = this.parentScene.canvas;
	}
	this.m_rootCanvas.addChild( this.m_container );
	this.m_container.position.x = this.m_x;
	this.m_container.position.y = this.m_y;
}

UIElement.DEFAULT_WIDTH 	= 100;
UIElement.DEFAULT_HEIGHT 	= 100;

UIElement.prototype.setPosition = function setPosition( x, y ) {
	this.m_x = x;
	this.m_y = y;
};


UIElement.prototype.update = function update( dt ) {
	
};

UIElement.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	debugGraphics.lineStyle( 2, 0x0000ff, 1 );
	debugGraphics.drawRect( this.m_x, this.m_y,
							this.bounds.w, this.bounds.h );
	debugGraphics.drawCircle( this.m_x, this.m_y, 10 );
};

UIElement.prototype.free = function free() {
	this.m_rootCanvas.removeChild( this.m_container );
};