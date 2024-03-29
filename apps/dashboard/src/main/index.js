const path = require('path')
const { app, BrowserWindow } = require('electron')
const { default: installExtension, VUEJS3_DEVTOOLS } = require('electron-devtools-installer')
const isDev = process.env.IS_DEV == 'true' ? true : false

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
      // enableRemoteModule: true,
      // webSecurity: false,
    },
    titleBarStyle: 'hidden'
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev ? 'http://localhost:8081' : `file://${path.join(__dirname, '../../dist/render/')}`
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
    app.whenReady().then(() => {
      installExtension(VUEJS3_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
