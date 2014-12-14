
function UIClip ( x, y, parent, data ) {

	UIElement.call( this, x, y, parent, null, data );

	this.m_clipName = data["clip"];
	this.m_clip = null;

	this.m_stopped = true;

	this.init();	
}

UIClip.prototype = Object.create( UIElement.prototype );
UIClip.prototype.constructor = UIElement;

UIClip.prototype.init = function init() {
	this.m_clip = new Animation( this.m_clipName );
	this.m_clip.sprite.position.x = 0;
	this.m_clip.sprite.position.y = 0;
	this.m_clip.sprite.anchor.x = 0.5;
	this.m_clip.sprite.anchor.y = 0.5;
	this.m_container.addChild( this.m_clip );
};

UIClip.prototype.setRunning = function setRunning() {
	this.m_stopped = false;
};

UIClip.prototype.setStopped = function setStopped() {
	this.m_stopped = true;
}

UIClip.prototype.update = function update( dt ) {
	if ( this.m_clip !== null ) {
		if ( !this.m_stopped ) {
			this.m_clip.update( dt );
		}
	}
};

UIClip.prototype.free = function free() {
	this.m_container.removeChild( this.m_clip );
	this.m_clip = null;
	UIElement.prototype.free.call( this );
	this.m_container = null;
};

UIClip.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	debugGraphics.lineStyle( 2, 0xff0000, 1 );
	debugGraphics.drawRect( this.m_x, this.m_y,
							this.bounds.w, this.bounds.h );
	debugGraphics.drawCircle( this.m_x, this.m_y, 10 );
};