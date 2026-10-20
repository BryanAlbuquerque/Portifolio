
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const modal = document.getElementById("projectGalleryModal");
    const mainImage = document.getElementById("projectGalleryMainImage");
    const title = document.getElementById("projectGalleryTitle");
    const thumbnails = document.getElementById("projectGalleryThumbnails");

    if (!modal || !mainImage || !title || !thumbnails) {
        console.error("Galeria: elementos obrigatórios do modal não encontrados.");
        return;
    }

    // Use caminhos absolutos a partir da raiz da aplicação.
    // Se o site estiver em um subcaminho, configure os caminhos via Razor.
    const galleries = {
        studiopodologia: {
            title: "Studio de Podologia",
            images: [
                "/images/projects/StudioPodologia.png",
                "/images/projects/StudioPodologia-01.png",
                "/images/projects/StudioPodologia-02.png",
                "/images/projects/StudioPodologia-03.png",
                "/images/projects/StudioPodologia-04.png"
            ]
        },

        pimentaselvagem: {
            title: "Pimenta Selvagem",
            images: [
                "/images/projects/PimentaSelvagem.png",
                "/images/projects/PimentaSelvagem-01.png",
                "/images/projects/PimentaSelvagem-02.png",
                "/images/projects/PimentaSelvagem-03.png",
                "/images/projects/PimentaSelvagem-04.png",
                "/images/projects/PimentaSelvagem-05.png"
            ]
        }
    };

    let currentGallery = null;
    let currentIndex = 0;
    let lastFocusedElement = null;

    const galleryIsOpen = () => modal.classList.contains("is-open");

    function renderImage(index) {
        if (!currentGallery || currentGallery.images.length === 0) {
            return;
        }

        const total = currentGallery.images.length;
        currentIndex = ((index % total) + total) % total;

        const imagePath = currentGallery.images[currentIndex];

        mainImage.src = imagePath;
        mainImage.alt =
            `${currentGallery.title} - imagem ${currentIndex + 1} de ${total}`;

        [...thumbnails.children].forEach((button, thumbnailIndex) => {
            const isActive = thumbnailIndex === currentIndex;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-current", isActive ? "true" : "false");
        });
    }

    function openGallery(galleryKey) {
        const gallery = galleries[galleryKey];

        if (!gallery || gallery.images.length === 0) {
            console.error(`Galeria não encontrada: ${galleryKey}`);
            return;
        }

        lastFocusedElement = document.activeElement;
        currentGallery = gallery;
        currentIndex = 0;

        title.textContent = gallery.title;
        thumbnails.replaceChildren();

        gallery.images.forEach((imagePath, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "project-gallery-thumbnail";
            button.setAttribute(
                "aria-label",
                `Visualizar imagem ${index + 1} de ${gallery.images.length}`
            );

            const image = document.createElement("img");
            image.src = imagePath;
            image.alt = "";
            image.loading = "lazy";
            image.decoding = "async";

            button.appendChild(image);

            button.addEventListener("click", () => {
                renderImage(index);
            });

            thumbnails.appendChild(button);
        });

        renderImage(0);

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("gallery-is-open");

        modal.querySelector(".project-gallery-close")?.focus();
    }

    function closeGallery() {
        if (!galleryIsOpen()) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("gallery-is-open");

        mainImage.removeAttribute("src");
        mainImage.alt = "";
        thumbnails.replaceChildren();

        currentGallery = null;
        currentIndex = 0;

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }

        lastFocusedElement = null;
    }

    // Delegação de eventos: também funciona com elementos
    // adicionados posteriormente ao HTML.
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const galleryTrigger = target.closest("[data-gallery]");

        if (galleryTrigger) {
            const galleryKey = galleryTrigger.dataset.gallery;

            if (galleries[galleryKey]) {
                event.preventDefault();
                openGallery(galleryKey);
            }

            return;
        }

        if (target.closest("[data-gallery-close]")) {
            closeGallery();
            return;
        }

        if (target.closest("[data-gallery-prev]")) {
            if (currentGallery) {
                renderImage(currentIndex - 1);
            }

            return;
        }

        if (target.closest("[data-gallery-next]")) {
            if (currentGallery) {
                renderImage(currentIndex + 1);
            }
        }
    });

    // Navegação por teclado.
    document.addEventListener("keydown", (event) => {
        if (!galleryIsOpen() || !currentGallery) {
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeGallery();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            renderImage(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            renderImage(currentIndex + 1);
        }
    });

    // Evita que a página role enquanto a galeria estiver aberta.
    // O CSS deve definir o comportamento visual de .gallery-is-open.
});
