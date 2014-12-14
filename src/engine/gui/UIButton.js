
function UIButton ( x, y, parent, data ) {
	
	UIClip.call( this, x, y, parent, data );


}

UIButton.prototype = Object.create( UIClip.prototype );
UIButton.prototype.constructor = UIClip;

UIButton.prototype.init = function init() {
	UIClip.prototype.init.call( this );

	this.m_clip.sprite.setInteractive( true );
	var self = this;
	this.m_clip.sprite.mousedown = function ( e ) {
		self.parentScene.onUIPress( self, e );
	};
	
};