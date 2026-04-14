import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fileURLToPath from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
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

  win.loadFile(path.join(__dirname, "../index/index.html"));
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
      preload: path.join(__dirname, "../src/preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },

    frame: true,
  });

  settings.loadFile("./src/settings/settings.html");

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