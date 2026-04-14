import { userBalance } from "../game/data.ts";
import {setUserPrices} from "./rightPanelShop.ts";

let prevPearls = userBalance.pearls;
let prevGems = userBalance.gems;

export function updateRightPanelDisplay() {
    updatePearls();
    updateGems();
    setUserPrices();
}

function triggerPop(el: HTMLElement) {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
}

function updatePearls() {
    const pearlDisplay = document.querySelector('#pearls') as HTMLParagraphElement;

    pearlDisplay.textContent = "";

    const value = document.createElement("span");
    value.textContent = `${userBalance.pearls} `;

    const icon = createPearlIcon();

    const label = document.createElement("span");
    label.textContent = " pearls";

    pearlDisplay.append(value, icon);
}

export function createPearlIcon(): SVGSVGElement {
    const ns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 8 8");
    svg.setAttribute("shape-rendering", "crispEdges");

    const g = document.createElementNS(ns, "g");
    g.setAttribute("shape-rendering", "crispEdges");

    const rect = (x: number, y: number, w: number, h: number, fill: string) => {
        const r = document.createElementNS(ns, "rect");
        r.setAttribute("x", String(x));
        r.setAttribute("y", String(y));
        r.setAttribute("width", String(w));
        r.setAttribute("height", String(h));
        r.setAttribute("fill", fill);
        return r;
    };

    g.append(
        rect(1,0,4,1,"#F9FFFF"),
        rect(5,0,1,1,"#F7E5CD"),
        rect(0,1,2,1,"#F9FFFF"),
        rect(2,1,2,4,"#FFFFFF"),
        rect(4,1,2,1,"#F9FFFF"),
        rect(6,1,1,1,"#F7E5CD"),
        rect(0,2,1,3,"#F9FFFF"),
        rect(1,2,1,2,"#FFFFFF"),
        rect(4,2,1,2,"#FFFFFF"),
        rect(5,2,2,3,"#F9FFFF"),
        rect(7,2,1,4,"#F7E5CD"),
        rect(1,4,1,2,"#F9FFFF"),
        rect(4,4,1,3,"#F9FFFF"),
        rect(0,5,1,1,"#F7E5CD"),
        rect(2,5,2,2,"#F9FFFF"),
        rect(5,5,1,1,"#F9FFFF"),
        rect(6,5,1,2,"#F7E5CD"),
        rect(1,6,1,1,"#F7E5CD"),
        rect(5,6,1,2,"#F7E5CD"),
        rect(2,7,3,1,"#F7E5CD"),
    );

    svg.appendChild(g);

    return svg;
}

function updateGems(): void {
    const gemsDisplay = document.querySelector('#gems') as HTMLParagraphElement;

    if (userBalance.gems !== prevGems) {
        triggerPop(gemsDisplay);
        prevGems = userBalance.gems;
    }

    gemsDisplay.innerText = `${userBalance.gems} gems`;
}