const main = document.getElementById('main') as HTMLElement | null
const header = document.querySelector('header') as HTMLElement | null

if (!main || !header) {
    throw new Error('Missing #main or header element in DOM')
}


console.log("Settings")
header.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest('.headBtn') as HTMLElement | null

    console.log("Settings")
    if (!target) return

    console.log("test")
    switch (target.id) {
        case 'settings':
            main.style.transform = 'translateX(200vw)'
            console.log("Settings")
            break

        case 'saves':
            main.style.transform = 'translateX(100vw)'
            console.log("Saves")
            break
        case 'credits':
            main.style.transform = 'translateX(0vw)'
            console.log("Credits")
            break
    }
})