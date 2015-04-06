from PySide import QtCore, QtGui, QtWebKit

import sys


class GWebView( QtWebKit.QWebView ):

    def __init__( self ):
        super( GWebView, self ).__init__()
        self.canAddCollision = False

    def mousePressEvent( self, e ):
        super( GWebView, self ).mousePressEvent( e )
        print 'onPress'
        if not self.canAddCollision:
            return
        frame = self.page().mainFrame()
        print 'GSandbox.instance.setCollisionCellByPosition( %(x)s , %(y)s , Map.CELL_FULL );' % { 'x': e.pos().x(), 'y': e.pos().y() }
        frame.evaluateJavaScript( 'GSandbox.instance.setCollisionCellByPosition( %(x)s , %(y)s , Map.CELL_FULL );' % { 'x': e.pos().x(), 'y': e.pos().y() } )
        foo = frame.evaluateJavaScript( 'GSandbox.instance.getMapData();' )
        print foo


class GTestWindow( QtGui.QMainWindow ):

    def __init__( self ):
        super( GTestWindow, self ).__init__()
        self.m_centralWidget = QtGui.QWidget()
        self.setCentralWidget( self.m_centralWidget )

        self.m_webview = GWebView()
        self.m_layout = QtGui.QVBoxLayout()
        self.m_layout.addWidget( self.m_webview )
        self.m_centralWidget.setLayout( self.m_layout )

        self.m_btnAddCollision = QtGui.QPushButton( 'Add collision' )
        self.m_btnAddCollision.clicked.connect( self.onAddCollision )
        self.m_layout.addWidget( self.m_btnAddCollision )

        self.m_webview.load( 'http://192.168.1.35/games/gbombers/src/index.html' )

        self.canAddCollision = False

    def onAddCollision( self ):
        self.m_webview.canAddCollision = not self.m_webview.canAddCollision


app = QtGui.QApplication( sys.argv )

mainWindow = GTestWindow()
mainWindow.show()

##view = QtWebKit.QWebView( None )
##view.load( 'http://192.168.1.35/' )
##view.show()

sys.exit( app.exec_() )

