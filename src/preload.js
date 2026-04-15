const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openSettings: () => ipcRenderer.invoke("open-settings"),
    maximizeWindow: () => ipcRenderer.invoke("window-maximize"),
    minimizeWindow: () => ipcRenderer.invoke("minimize-window"),
    closeWindow: () => ipcRenderer.invoke("close"),

    saveSettings: (settingsData) => ipcRenderer.send("settings-save", settingsData),
    loadSettings: () => ipcRenderer.invoke("settings-load"),

    onSettingsApply: (callback) => ipcRenderer.on("apply-settings-and-save", (_, data) => callback(data)),
    onSettingsRequest: (callback) => ipcRenderer.on("request-settings", () => callback()),

    sendSettingsResponse: (data) => ipcRenderer.send("settings-response", data),
    onRunLoadData: (callback) =>
        ipcRenderer.on("run-load-data", (_, data) => callback(data)),
    loadMainData: () => ipcRenderer.send("load-main-data")
});