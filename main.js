const {app, Menu} = require('electron')

const path = require('path')

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  if (app.listeners('window-all-closed').length === 1) {
    app.quit()
  }
})

// Create default menu.
app.once('ready', () => {
  if (Menu.getApplicationMenu()) return

  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            return (process.platform === 'darwin') ? 'Ctrl+Command+F' : 'F11'
          })(),
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (() => {
            return (process.platform === 'darwin') ? 'Alt+Command+I' : 'Ctrl+Shift+I'
          })(),
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools()
          }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click () { app.quit() }
        }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

const indexPath = path.join(__dirname, '/index.html')
require('./default_app').load(`file://${indexPath}`)
