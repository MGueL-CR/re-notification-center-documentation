document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-main");
    const contenedor = document.getElementById("show-content");

    menu.addEventListener("click", async (evento) => {
        if (evento.target.classList.contains("list-item")) {

            const pagina = evento.target.getAttribute("data-name");
            const urlDestino = pagina
                ? `/assets/pages/${pagina}.html`
                : "/assets/pages/pag404.html";

            try {
                const respuesta = await fetch(urlDestino);

                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar el contenido");
                }

                const html = await respuesta.text();
                contenedor.innerHTML = html;
            } catch (error) {
                contenedor.innerHTML = `<div class="card warn"> <h2>Error al cargar la sección! </h2> <hr /><p>Detalle:</p><p> ${error.message}</p></div>`;
            }
        }
    });
});