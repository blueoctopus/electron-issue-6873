'use strict';

const {app, BrowserWindow} = require('electron')

var mainWindow = null

const log = (...args) => {
  mainWindow.webContents.executeJavaScript(
      'console.log.apply(console, ' + JSON.stringify(args) + ')');
};

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

exports.load = (appUrl) => {
  app.on('ready', () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      backgroundColor: '#FFFFFF',
      useContentSize: true
    })
    mainWindow.loadURL(appUrl)
    mainWindow.focus()

    mainWindow.on('scroll-touch-begin', () => {
      log('scroll-touch-begin');
    });
    mainWindow.on('scroll-touch-end', () => {
      log('scroll-touch-end');
    });
  })
}
