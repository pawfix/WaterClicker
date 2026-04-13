import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Water Clicker",
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      accessibleTitle: "Water Clicker"
    },
    frame: false,
  })

  mainWindow.loadFile('./src/index.html');
}

app.whenReady().then(() => {
  createWindow()
})

