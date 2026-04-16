export function createPopUp(title: string, content: string, warned:boolean) {
    const main = document.querySelector('.popupWrap')

    const popup:HTMLDivElement = document.createElement("div");
    popup.classList.add("popup");

    const titleHeading:HTMLHeadingElement = document.createElement("h2");
    titleHeading.textContent = title;

    const contentHeading:HTMLParagraphElement = document.createElement("p");
    contentHeading.textContent = content;


    popup.appendChild(titleHeading);
    popup.appendChild(contentHeading);

    if (warned) {
        popup.style.backgroundColor = "red";
    }

    console.log("Popup made")

    main?.appendChild(popup);

    setTimeout(() => {
        main?.removeChild(popup);
    }, 5000)
}