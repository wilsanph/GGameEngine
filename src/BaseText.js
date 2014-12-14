
/**
* @param {PIXI.DisplayObjectContainer} canvas
* @param {number} x
* @param {number} y
* @param {string} strText
* @param {Object} style
* @param {Object=} params
* @extends PIXI.Text
*/
function BaseText ( canvas, x, y, strText, style, params ) {
	PIXI.Text.call( this, strText, style );

	this.mCanvas = canvas;
	this.m_x = x;
	this.m_y = y;

	this.mText = strText;
	this.mParams = params;	

	this.isAwaitingDelete = false;
	this.isRemoved = false;

	this.mCanvas.addChild( this );
	this.position.x = this.m_x;
	this.position.y = this.m_y;
}

BaseText.prototype = Object.create( PIXI.Text.prototype );
BaseText.prototype.constructor = PIXI.Text;

BaseText.prototype.update = function update( dt ) {
	// override this	
};


BaseText.prototype.free = function free() {
	if ( !this.isRemoved ) {
		this.mCanvas.removeChild( this );
		this.isRemoved = false;
	}
};



