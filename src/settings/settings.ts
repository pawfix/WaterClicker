export let pauseState = false;

export function gamePaused():boolean {
    if (!pauseState) pauseState = true
    if (pauseState) pauseState = false
    return pauseState;
}

interface userSettings {
    bgMusic: boolean
}

export let userSettings: userSettings = {
    bgMusic: true,
}


function addSettingsListeners(): void {

    const settingsBtn:HTMLElement | null = document.getElementById('settingsBtn');
    settingsBtn!.addEventListener('click', () => {
        window.electronAPI.openSettings();
    })

    const main = document.getElementById('main') as HTMLElement
    const header = document.querySelector('#settingsHeader') as HTMLElement

    const buttons = document.querySelectorAll('.headBtn')

    header.addEventListener('click', (event) => {
        const target = (event.target as HTMLElement).closest('.headBtn') as HTMLElement
        if (!target) return

        buttons.forEach(btn => btn.classList.remove('active'))
        target.classList.add('active')

        switch (target.id) {
            case 'settings':
                main.style.transform = 'translateX(0vw)'
                break
            case 'saves':
                main.style.transform = 'translateX(-100vw)'
                break
            case 'credits':
                main.style.transform = 'translateX(-200vw)'
                break
        }
    })
    setHeader()
}

let headerState: boolean = true;

function setHeader():void {
    console.log("Added Header listener")
    const headerBtn:HTMLDivElement | null = document.querySelector('.headerOpen');
    const header:HTMLDivElement | null = document.querySelector('.settingsTopHeaderopHeader');
    const headerBtnPar:HTMLParagraphElement | null = document.querySelector('#headerBtnPar');

    headerBtn!.addEventListener('click', () => {
        console.log("clicked");
        if (headerState) {
            headerState = false;
            header!.style.top = "0px";
            headerBtnPar!.innerText = "/\\";
        } else {
            headerState = true;
            header!.style.top = "-25px";
            headerBtnPar!.innerText = "\\/";
        }
    })
}

export function initSettings(): void {
    addSettingsListeners();
}
