document.addEventListener("DOMContentLoaded", () => {
    const menuMain = document.getElementById("menu-main");
    const contenido = document.getElementById("show-content");
    const contenedor = document.getElementById("mainContent");
    const headerPage = document.getElementById('headerPage');
    const menuTop = document.getElementById("menuTop");
    /*
        menuMain.addEventListener("click", (evento) => {
            const elemento = evento.target;
            if (elemento.classList.contains("list-item")) {
                const pagina = elemento.getAttribute("data-name");
                loadContentPage(pagina, contenido, contenedor);
            }
        });*/

    menuTop.addEventListener("click", (evento) => {
        const elemento = evento.target;
        if (elemento.classList.contains("menu-item")) {
            const pagina = elemento.getAttribute("data-name");
            loadContentPage(pagina, contenedor, headerPage);
        }

        if (elemento.classList.contains("submenu-item")) {
            const pagina = elemento.getAttribute("data-name");
            loadContentPage(pagina, contenido, contenedor);
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
