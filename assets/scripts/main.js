document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("mainContent");
    const headerPage = document.getElementById('headerPage');
    const menuTop = document.getElementById("menuTop");

    menuTop.addEventListener("click", (evento) => {
        contenedor.classList.remove('fade-in');
        contenedor.offsetWidth;
        const elemento = evento.target;
        if (elemento.classList.contains("menu-item")) {
            const pagina = elemento.dataset.name;
            loadContentPage(pagina, contenedor, headerPage).then(() => {
                contenedor.classList.add('fade-in');
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
    const contenedor = document.getElementById("mainContent");
    const contenido = document.getElementById("show-content");
    const menuMain = document.getElementById("menu-main");

    menuMain.addEventListener("click", (evento) => {
        contenido.classList.remove('fade-in');
        contenido.offsetWidth;
        const elemento = evento.target;
        const pagina = elemento.dataset.name;
        if (!elemento.classList.contains("list-item")) { return; }

        loadContentPage(pagina, contenido, contenedor).then(() => {
            contenido.classList.add('fade-in');
            activateBlockSection();
        });
    });
}

function markBlockSelected(banner, block) {
    const blocks = Array.from(banner.children);
    blocks.forEach(block => {
        if (block.classList.contains("select")) { block.classList.remove("select") }
    });
    block.classList.add("select");
}

function activateBlockSection() {
    const contenedor = document.getElementById("mainContent");
    const contenido = document.getElementById("show-content");
    const banner = document.getElementById("floatBaner");
    if (banner) {
        banner.addEventListener('click', (eve) => {
            contenido.classList.remove('fade-in');
            contenido.offsetWidth;
            const bloque = eve.target;
            const pagina = bloque.dataset.name;
            if (!bloque.classList.contains("float-span")) { return; }
            loadContentPage(pagina, contenido, contenedor).finally(() => {
                markBlockSelected(banner, bloque);
                contenido.classList.add('fade-in');
                contenido.prepend(banner);
            });
        });
    }
}
