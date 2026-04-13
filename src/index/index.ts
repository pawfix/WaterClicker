import {userBalance} from "../game/data.ts";
import {doClickerClick} from "../game/clicker.ts";

let rightPanelState:boolean = true;


export function initIndex():void {
    setEventListeners()
}

function setEventListeners():void {
    const rightPanel:HTMLDivElement | null = document.querySelector(".rightSideBar");
    const rightPanelMove:HTMLDivElement | null = document.querySelector('.rightPanelMove');
    const mainContainer:HTMLDivElement | null = document.querySelector('.main');

    rightPanelMove!.addEventListener('click', () => {
        if (rightPanelState) {
            rightPanelState = false;
            mainContainer!.style.width = "65%"
            rightPanel!.style.width = "25%"
        } else if (!rightPanelState) {
            rightPanelState = true;
            mainContainer!.style.width = "90%"
            rightPanel!.style.width = "0"
        }
    })

    const mainClicker:HTMLElement | null = document.querySelector('.icon');

    mainClicker!.addEventListener('click', () => {
        userBalance.pearls += doClickerClick();
    })
}

