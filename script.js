const menu_header = document.querySelector('.menu-icon');
const info = document.querySelector('.info-header');

menu_header.addEventListener("click", () => {
    info.classList.toggle('active');

    if (info.classList.contains('active')) {
        menu_header.src = "img/close-menu-icon.png"; // Ícone de fechar
    } else {
        menu_header.src = "img/menu-icon.png"; // Ícone de menu
    }
});
