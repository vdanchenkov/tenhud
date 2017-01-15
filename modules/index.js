import { app, BrowserWindow, default as electron } from 'electron'
import path from 'path'
import url from 'url'

let mainWindow

function createWindow () {
  const display = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: display.width - 400,
    y: (display.height - 600) / 2 | 0,
    alwaysOnTop: true
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
