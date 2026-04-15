import {initSettings} from "./settings.ts";
import {addSettingsFormListeners, addSettingsSaveListeners} from "./settingsForm.ts";

function settingsInitApp() : void {
    initSettings()
    addSettingsFormListeners()
    addSettingsSaveListeners()
}

settingsInitApp()