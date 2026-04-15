import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 720,
    title: "Water Clicker",

    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },

    frame: false,
  });

  mainWindow.loadFile(path.join(__dirname, "../index/index.html"));
}

let settings: BrowserWindow | null = null;

function createSettingsWindow() {
  if (settings) {
    settings.focus();
    return;
  }



  settings = new BrowserWindow({
    width: 1240,
    height: 720,
    title: "Settings",

    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },

    frame: true,
  });

  const settingsPath = path.join(app.getAppPath(), 'src', 'settings', 'settings.html');
  settings.loadFile(settingsPath);

  settings.on("closed", () => {
    settings = null;
  });
}

ipcMain.handle("open-settings", () => {
  console.log("SETTINGS 2");
  createSettingsWindow();
});

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("close", () => {
  mainWindow?.close();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('window-minimize', e => {
  BrowserWindow.fromWebContents(e.sender).minimize();
});



ipcMain.handle('window-maximize', e => {
  const win = BrowserWindow.fromWebContents(e.sender);
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.on("settings-save", (_, settingsData) => {
  if (mainWindow) {
    mainWindow.webContents.send("apply-settings-and-save", settingsData);
  }
});

ipcMain.handle("settings-load", async () => {
  if (!mainWindow) return null;

  return new Promise((resolve) => {
    mainWindow.webContents.once("settings-response", (_, data) => {
      resolve(data);
    });

    mainWindow.webContents.send("request-settings");
  });
});

ipcMain.on("settings-response", (_, data) => {
  // this is needed to complete the round-trip
  if (mainWindow) {
    mainWindow.webContents.emit("settings-response", null, data);
  }
});

ipcMain.on("load-main-data", () => {
  if (mainWindow) {
    mainWindow.webContents.send("run-load-data");
  }
});