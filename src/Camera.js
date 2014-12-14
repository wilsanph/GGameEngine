

function Camera ( world ) {
	
	this.mWorld = world;

	this.m_x = 0;
	this.m_y = 0;
	this.m_width = 0;
	this.m_height = 0;	

}



Camera.prototype.update = function update( dt ) {
	
};

Camera.prototype.setX = function setX( x ) {
	this.m_x = x;
};

Camera.prototype.setY = function setY( y ) {
	this.m_y = y;
};

Camera.prototype.getX = function getX() {
	return this.m_x;
};


Camera.prototype.getY = function getY() {
	return this.m_y;
};


Camera.prototype.getWidth = function getWidth() {
	return this.m_width;
};


Camera.prototype.getHeight = function getHeight() {
	return this.m_height;
};