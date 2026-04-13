import {userBalance} from "../game/data.ts";
import {doClickerClick} from "../game/clicker.ts";

let rightPanelState:boolean = true;
let headerState:boolean = true;



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
        console.log(userBalance.pearls);
    })
}

function setHeader():void {
    console.log("Added Header listener")
    const headerBtn:HTMLDivElement | null = document.querySelector('.headerOpen');
    const header:HTMLDivElement | null = document.querySelector('.topHeader');
    const headerBtnPar:HTMLParagraphElement | null = document.querySelector('#headerBtnPar');

    headerBtn!.addEventListener('click', () => {
        console.log("clicked");
        if (headerState) {
            headerState = false;
            headerBtn!.style.top = "25px";
            header!.style.top = "0px";
            headerBtnPar!.innerText = "/\\";
        } else {
            headerState = true;
            headerBtn!.style.top = "25px";
            header!.style.top = "-25px";
            headerBtnPar!.innerText = "\\/";
        }
    })
}

export function initIndex():void {
    setEventListeners()
    setHeader()
}
