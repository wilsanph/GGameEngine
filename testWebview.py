from PySide import QtCore, QtGui, QtWebKit

import sys


class GTestWindow( QtGui.QMainWindow ):

    def __init__( self ):
        super( GTestWindow, self ).__init__()
        self.m_centralWidget = QtGui.QWidget()
        self.setCentralWidget( self.m_centralWidget )

        self.m_webview = QtWebKit.QWebView()
        self.m_layout = QtGui.QVBoxLayout()
        self.m_layout.addWidget( self.m_webview )
        self.m_centralWidget.setLayout( self.m_layout )

        self.m_btnFrenzy = QtGui.QPushButton( 'Activate frenzy' )
        self.m_btnFrenzy.clicked.connect( self.onActivateFrenzy )
        self.m_layout.addWidget( self.m_btnFrenzy )

        self.m_webview.load( 'http://192.168.1.35/games/gbombers/src/index.html' )

    def onActivateFrenzy( self ):
        print 'using frenzy cheat'
        frame = self.m_webview.page().mainFrame()
        frame.evaluateJavaScript( 'Global.game.world().player().onGetFrenzyItem();' )

app = QtGui.QApplication( sys.argv )

mainWindow = GTestWindow()
mainWindow.show()

##view = QtWebKit.QWebView( None )
##view.load( 'http://192.168.1.35/' )
##view.show()

sys.exit( app.exec_() )

