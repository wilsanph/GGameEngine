function UIText ( x, y, parent, data ) {
	
	UIELement.call( this, x, y, parent, Application.instance.canvas, data );

	this.str = ( typeof data["string"] === "undefined" ) ? UIText.DEFAULT_TEXT : data["string"];

	this.m_pixiText = null;

}

UIText.prototype = Object.create( UIElement.prototype );
UIText.prototype.constructor = UIElement;


UIText.DEFAULT_TEXT = "FooBar";

UIText.prototype.init = function init() {
	this.m_pixiText = new PIXI.Text( this.str );
	this.m_container.addChild( this.m_pixiText );
	this.m_pixiText.position.x = this.m_x;
	this.m_pixiText.position.y = this.m_y;
	this.m_pixiText.anchor.x = 0.5;
	this.m_pixiText.anchor.y = 0.5;
};