const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    penSettings: () => ipcRenderer.invoke("open-settings")
});