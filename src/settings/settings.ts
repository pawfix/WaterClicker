export let pauseState = false;

export function gamePaused(): boolean {
    pauseState = !pauseState;
    return pauseState;
}

interface UserSettings {
    bgMusic: boolean;
}

export let userSettings: UserSettings = {
    bgMusic: true,
};

export function initSettingsBtn(): void {
    const settingsBtn: HTMLElement | null = document.getElementById('settingsBtn');

    settingsBtn!.addEventListener('click', () => {
        window.electronAPI.openSettings();
    });
}

export async function initSettings(): Promise<void> {
    addSettingsListeners();

    const data = await window.electronAPI.loadSettings();
    if (!data) return;

    userSettings.bgMusic = data.bgMusic;

    applySettingsToUI();
}

function applySettingsToUI(): void {
    const bgMusicToggle = document.getElementById('bgMusicToggle') as HTMLInputElement | null;

    if (bgMusicToggle) {
        bgMusicToggle.checked = userSettings.bgMusic;
    }
}

function addSettingsListeners(): void {
    console.log("Adding settingsListeners listener");

    const header: HTMLElement | null = document.querySelector('#settingsHeader');
    const main = document.getElementById('main') as HTMLElement;

    const buttons = document.querySelectorAll('.headBtn');

    header!.addEventListener('click', (event) => {
        const target = (event.target as HTMLElement).closest('.headBtn') as HTMLElement;
        if (!target) return;

        buttons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        switch (target.id) {
            case 'settings':
                main.style.transform = 'translateX(0vw)';
                break;
            case 'saves':
                main.style.transform = 'translateX(-100vw)';
                break;
            case 'credits':
                main.style.transform = 'translateX(-200vw)';
                break;
        }
    });

    setHeader();
    addToggleListeners();
}

function addToggleListeners(): void {
    const bgMusicToggle = document.getElementById('bgMusicToggle') as HTMLInputElement | null;

    if (!bgMusicToggle) return;

    bgMusicToggle.addEventListener('change', () => {
        userSettings.bgMusic = bgMusicToggle.checked;

        window.electronAPI.saveSettings({
            bgMusic: userSettings.bgMusic
        });
    });
}

let headerState: boolean = true;

function setHeader(): void {
    console.log("Added Header listener");

    const headerBtn: HTMLDivElement | null = document.querySelector('.headerOpen');
    const header: HTMLDivElement | null = document.querySelector('.settingsTopHeaderopHeader');
    const headerBtnPar: HTMLParagraphElement | null = document.querySelector('#headerBtnPar');

    headerBtn!.addEventListener('click', () => {
        if (headerState) {
            headerState = false;
            header!.style.top = "0px";
            headerBtnPar!.innerText = "/\\";
        } else {
            headerState = true;
            header!.style.top = "-25px";
            headerBtnPar!.innerText = "\\/";
        }
    });
}