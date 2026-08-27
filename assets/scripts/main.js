document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("mainContent");
    const headerPage = document.getElementById('headerPage');
    const menuTop = document.getElementById("menuTop");

    menuTop.addEventListener("click", (evento) => {
        const elemento = evento.target;
        if (elemento.classList.contains("menu-item")) {
            const pagina = elemento.dataset.name;
            loadContentPage(pagina, contenedor, headerPage).then(() => {
                if (elemento.dataset.section) {
                    activateLinksSideMenu();
                }
            });
        }

        if (elemento.classList.contains("submenu-item")) {
            const pagina = elemento.dataset.name;
            const superior = elemento.closest('.menu-item');
            if (superior.dataset.section) {
                loadContentPage(`${superior.dataset.section}-folder`, contenedor, headerPage).then(() => {
                    const contenido = document.getElementById("show-content");
                    activateLinksSideMenu();
                    loadContentPage(pagina, contenido, contenedor);
                });
            } else {
                loadContentPage(pagina, contenedor, headerPage);
            }
        }
    });

    loadContentPage("intro-main", contenedor, headerPage);
});

async function loadContentPage(pagina, contenido, contenedor) {


    const urlDestino = pagina
        ? `/assets/pages/${pagina}.html`
        : "/assets/pages/pag404.html";

    try {
        const respuesta = await fetch(urlDestino);

        if (!respuesta.ok) {
            //throw new Error("No se pudo cargar o mostrar el contenido");
            console.error("Error 404!", "No se pudo cargar o mostrar el contenido. El archivo o página no se encuentró.");
            loadContentPage("pag404", contenido, contenedor);
            return;
        }

        const html = await respuesta.text();
        contenido.innerHTML = html;
        contenedor.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        contenido.innerHTML = `<div class="card warn"> <h2>Error al cargar la sección! </h2> <hr /><p>Detalle:</p><p> ${error.message}</p></div>`;
    }
}

function activateLinksSideMenu() {
    const menuMain = document.getElementById("menu-main");
    const contenedor = document.getElementById("mainContent");
    const contenido = document.getElementById("show-content");
    menuMain.addEventListener("click", (evento) => {
        const elemento = evento.target;
        if (elemento.classList.contains("list-item")) {
            const pagina = elemento.dataset.name;
            loadContentPage(pagina, contenido, contenedor);
        }
    });
}
