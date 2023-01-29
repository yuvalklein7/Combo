const fs = require("fs")
const path = require("path")
const { app, BrowserWindow, ipcMain } = require('electron');
const { channels } = require('../src/shared/channels')
const isDev = true;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
    icon: __dirname + '/443525.png',
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${__dirname}/../build/index.html`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  ipcMain.on(channels.SendHistory, (event, arg) => {
    const newHistory = arg;
    let nowDate = new Date()
    console.log(nowDate);
    let s = `${nowDate.getDate()}/${nowDate.getMonth()+1}/${nowDate.getFullYear()} ${(nowDate.getHours()<10?'0':'') + nowDate.getHours()}:${(nowDate.getMinutes()<10?'0':'') + nowDate.getMinutes()}`
    fs.readFile(path.join(path.resolve(__dirname, '..'), '/src/assets/HistorySearches.json'), 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data); 
        obj.searches.push({
          date: s,
          value: newHistory.addHistory.val,
          years: newHistory.addHistory.years
        });
        json = JSON.stringify(obj); 
        fs.writeFile(path.join(path.resolve(__dirname, '..'), '/src/assets/HistorySearches.json'), json, 'utf8', function (err) {
          if (err) console.log(err);
        });
      }
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
