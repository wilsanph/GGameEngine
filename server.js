var http = require( 'http' ),
	util = require( 'util' ),
	io	= require( 'socket.io' );

function Player ( x, y, id ) {
	
	this.m_x = x;
	this.m_y = y;
	this.id = id;
};

function GameServer () {
	
	GameServer.instance = this;

	this.m_server = null;
	this.m_players = {};
	this.m_socket = null;

	this.init();
};

GameServer.instance = null;

GameServer.prototype.init = function init() {
	this.m_server = http.createServer( this.requestHandler );
	this.m_server.listen( 8001 );
	this.m_socket = io.listen( this.m_server );	

	this.setEventHandlers();	
};

GameServer.prototype.setEventHandlers = function setEventHandlers() {
	console.log( 'setting the event handlers' );
	this.m_socket.sockets.on( 'connection', GameServer.instance.onSocketConnection );
	console.log( this.m_socket.sockets.on );
};

GameServer.prototype.requestHandler = function requestHandler ( req, res ) {
	console.log( 'connection' );
	res.writeHead( 200, { 'Content-Type' : 'text/html' } );
	res.write( 'hello Gaby!!!' );
	res.end();
};

GameServer.prototype.onSocketConnection = function onSocketConnection( client ) {
	console.log( 'GameServer::onSocketConnection> client connected' );
	console.log( 'client: ' );
	//console.log( client );
	client.on( 'disconnect' , this.onClientDisconnected );
	client.on( 'new player' , this.onClientNewPlayer );
	client.on( 'move player' , this.onClientMovePlayer );
};
	
GameServer.prototype.onClientDisconnected = function onClientDisconnected () {
	util.log( 'GameServer::onClientDisconnected>' );
};

GameServer.prototype.onClientNewPlayer = function onClientNewPlayer ( data ) {
	
};

GameServer.prototype.onClientMovePlayer = function onClientMovePlayer ( data ) {
	
};

new GameServer();