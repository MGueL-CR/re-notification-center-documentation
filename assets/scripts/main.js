document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-main");
    const contenido = document.getElementById("show-content");
    const contenedor = document.getElementById("main-content");

    menu.addEventListener("click", async (evento) => {
        if (evento.target.classList.contains("list-item")) {
            const pagina = evento.target.getAttribute("data-name");
            const urlDestino = pagina
                ? `/assets/pages/${pagina}.html`
                : "/assets/pages/pag404.html";

            try {
                const respuesta = await fetch(urlDestino);

                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar o mostrar el contenido");
                }

                const html = await respuesta.text();
                contenido.innerHTML = html;
                contenedor.scrollIntoView({ behavior: "smooth" });
            } catch (error) {
                contenido.innerHTML = `<div class="card warn"> <h2>Error al cargar la sección! </h2> <hr /><p>Detalle:</p><p> ${error.message}</p></div>`;
            }
        }
    });
});