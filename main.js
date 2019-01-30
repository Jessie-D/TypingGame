const {app, BrowserWindow} = require('electron');
const path = require('path');
const { format  } = require('url');

let win;
function createMainWindow() {
  win = new BrowserWindow({show: false})
  win.maximize()
  win.show() 
  //win.loadURL('file://' + __dirname + '/index.html');
  win.loadURL(format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))
  win.on('closed', () => {
    win = null
  })
   // win.openDevTools();
}

app.on('ready', function() {
  win = createMainWindow()
});
 

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (win === null) {
    win = createMainWindow()
  }
})