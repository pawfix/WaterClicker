import { userBalance } from "../game/data.ts";
import {setUserPrices} from "./rightPanelShop.ts";

let prevPearls = userBalance.pearls;
let prevGems = userBalance.gems;

export function updateRightPanelDisplay() {
    updatePearls();
    updateGems();
    setUserPrices();
}

export function triggerPop(el: HTMLElement) {
    console.log("PoP")

    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
}

export function makeBubble() {
    const main : HTMLElement = document.querySelector('.main')

    const bubble : HTMLImageElement = document.createElement("img");
    bubble.classList.add("bubble")
    bubble.src = "../assets/buble.svg";
    bubble.alt = "Bubble"
    bubble.style.height = "50px";
    bubble.style.top = String(Math.random() * 100) + "vh";
    bubble.style.left = String(Math.random() * 100) + "vw";

    main.appendChild(bubble);

    setTimeout(() => {
        main.removeChild(bubble);
    }, 500);
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

export function createGemIcon(): SVGSVGElement {
    const ns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "15");
    svg.setAttribute("viewBox", "0 0 16 15");
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
        rect(4, 0, 8, 1, "#800000"),
        rect(3, 1, 1, 1, "#800000"),
        rect(4, 1, 3, 1, "#C30000"),
        rect(7, 1, 3, 2, "#FF2727"),
        rect(10, 1, 2, 1, "#C30000"),
        rect(12, 1, 1, 1, "#800000"),

        rect(2, 2, 1, 1, "#800000"),
        rect(3, 2, 1, 1, "#C30000"),
        rect(4, 2, 3, 1, "#FF2727"),
        rect(10, 2, 1, 2, "#FF2727"),
        rect(11, 2, 2, 1, "#C30000"),
        rect(13, 2, 1, 1, "#800000"),

        rect(1, 3, 1, 1, "#800000"),
        rect(2, 3, 1, 4, "#C30000"),
        rect(3, 3, 1, 3, "#FF2727"),
        rect(4, 3, 6, 1, "#FF4646"),
        rect(11, 3, 1, 6, "#FF2727"),
        rect(12, 3, 2, 1, "#C30000"),
        rect(14, 3, 1, 1, "#800000"),

        rect(0, 4, 1, 1, "#800000"),
        rect(1, 4, 1, 1, "#C30000"),
        rect(4, 4, 1, 4, "#FF4646"),
        rect(5, 4, 4, 3, "#FF7070"),
        rect(9, 4, 2, 1, "#FF4646"),
        rect(12, 4, 1, 3, "#FF2727"),
        rect(13, 4, 2, 1, "#C30000"),
        rect(15, 4, 1, 1, "#800000"),

        rect(1, 5, 1, 2, "#800000"),
        rect(9, 5, 1, 3, "#FF7070"),
        rect(10, 5, 1, 2, "#FF4646"),
        rect(13, 5, 1, 2, "#C30000"),
        rect(14, 5, 1, 2, "#800000"),

        rect(3, 6, 1, 2, "#C30000"),
        rect(2, 7, 1, 1, "#800000"),
        rect(5, 7, 1, 2, "#FF4646"),
        rect(6, 7, 3, 2, "#FF7070"),
        rect(10, 7, 1, 3, "#FF2727"),
        rect(12, 7, 1, 1, "#C30000"),
        rect(13, 7, 1, 1, "#800000"),

        rect(3, 8, 1, 2, "#800000"),
        rect(4, 8, 1, 2, "#C30000"),
        rect(9, 8, 1, 2, "#FF4646"),
        rect(12, 8, 1, 2, "#800000"),

        rect(5, 9, 1, 1, "#FF2727"),
        rect(6, 9, 3, 1, "#FF4646"),
        rect(11, 9, 1, 1, "#C30000"),

        rect(4, 10, 1, 1, "#800000"),
        rect(5, 10, 1, 1, "#C30000"),
        rect(6, 10, 1, 1, "#FF2727"),
        rect(7, 10, 2, 1, "#FF4646"),
        rect(9, 10, 1, 1, "#FF2727"),
        rect(10, 10, 1, 1, "#C30000"),
        rect(11, 10, 1, 1, "#800000"),

        rect(5, 11, 1, 2, "#800000"),
        rect(6, 11, 1, 2, "#C30000"),
        rect(7, 11, 2, 1, "#FF2727"),
        rect(9, 11, 1, 2, "#C30000"),
        rect(10, 11, 1, 2, "#800000"),

        rect(7, 12, 1, 2, "#C30000"),
        rect(8, 12, 1, 1, "#FF2727"),

        rect(6, 13, 1, 1, "#800000"),
        rect(8, 13, 1, 1, "#C30000"),
        rect(9, 13, 1, 1, "#800000"),

        rect(7, 14, 2, 1, "#800000"),
    );

    svg.appendChild(g);

    return svg;
}

export function updateGems(): void {
    const gemsDisplay = document.querySelector('#gems') as HTMLParagraphElement;

    if (userBalance.gems !== prevGems) {
        triggerPop(gemsDisplay);
        prevGems = userBalance.gems;
    }

    gemsDisplay.textContent = "";

    const value = document.createElement("span");
    value.textContent = `${userBalance.gems} `;

    const icon = createGemIcon();

    const label = document.createElement("span");
    label.textContent = " gems";

    gemsDisplay.append(value, icon);
}