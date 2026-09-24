document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("projectGalleryModal");
    const mainImage = document.getElementById("projectGalleryMainImage");
    const title = document.getElementById("projectGalleryTitle");
    const thumbnails = document.getElementById("projectGalleryThumbnails");

    if (!modal || !mainImage || !title || !thumbnails) {
        return;
    }


    /* Galerias */

    const galleries = {

        studiopodologia: {
            title: "Studio Podologia",
            images: [
                "~/images/projects/StudioPodologia.png",
                "~/images/projects/StudioPodologia-01.png",
                "~/images/projects/StudioPodologia-02.png",
                "~/images/projects/StudioPodologia-03.png"
            ]
        },

        pimentaselvagem: {
            title: "Pimenta Selvagem",
            images: [
                "~/images/projects/PimentaSelvagem.png",
                "~/images/projects/PimentaSelvagem-02.png",
                "~/images/projects/PimentaSelvagem-03.png",
                "~/images/projects/PimentaSelvagem-04.png",
                "~/images/projects/PimentaSelvagem-05.png",
            ]
        }
    };


    /* Converte ~/ para / */

    const resolveUrl = (path) => {
        return path.replace(/^~\//, "/");
    };


    let currentGallery = null;
    let currentIndex = 0;
    let lastFocusedElement = null;


    /* Mostra uma imagem */

    const renderImage = (index) => {

        if (!currentGallery || !currentGallery.images.length) {
            return;
        }

        const total = currentGallery.images.length;

        currentIndex = (index + total) % total;

        const imagePath = resolveUrl(
            currentGallery.images[currentIndex]
        );

        mainImage.src = imagePath;

        mainImage.alt =
            `${currentGallery.title} - imagem ${currentIndex + 1}`;


        [...thumbnails.children].forEach(
            (thumbnail, thumbnailIndex) => {

                thumbnail.classList.toggle(
                    "is-active",
                    thumbnailIndex === currentIndex
                );
            }
        );
    };


    /* Abre a galeria */

    const openGallery = (galleryKey) => {

        const gallery = galleries[galleryKey];

        if (!gallery || !gallery.images.length) {
            return;
        }

        currentGallery = gallery;
        currentIndex = 0;

        lastFocusedElement = document.activeElement;

        title.textContent = gallery.title;

        thumbnails.innerHTML = "";


        gallery.images.forEach((image, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "project-gallery-thumbnail";

            button.setAttribute(
                "aria-label",
                `Abrir imagem ${index + 1}`
            );


            const img = document.createElement("img");

            img.src = resolveUrl(image);

            img.alt =
                `${gallery.title} - miniatura ${index + 1}`;

            img.loading = "lazy";


            button.appendChild(img);

            button.addEventListener("click", () => {
                renderImage(index);
            });

            thumbnails.appendChild(button);
        });


        renderImage(0);


        modal.classList.add("is-open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "gallery-is-open"
        );


        modal
            .querySelector(".project-gallery-close")
            ?.focus();
    };


    /* Fecha a galeria */

    const closeGallery = () => {

        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "gallery-is-open"
        );


        mainImage.src = "";

        thumbnails.innerHTML = "";


        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

        currentGallery = null;
        currentIndex = 0;
    };


    /* Abre ao clicar em qualquer elemento da galeria */

    document
        .querySelectorAll("[data-gallery]")
        .forEach((element) => {

            element.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    const galleryKey =
                        element.dataset.gallery;

                    openGallery(galleryKey);
                }
            );
        });


    /* Fechar */

    document
        .querySelectorAll("[data-gallery-close]")
        .forEach((element) => {

            element.addEventListener(
                "click",
                closeGallery
            );
        });


    /* Voltar */

    document
        .querySelector("[data-gallery-prev]")
        ?.addEventListener(
            "click",
            () => {

                if (!currentGallery) {
                    return;
                }

                renderImage(
                    currentIndex - 1
                );
            }
        );


    /* Avançar */

    document
        .querySelector("[data-gallery-next]")
        ?.addEventListener(
            "click",
            () => {

                if (!currentGallery) {
                    return;
                }

                renderImage(
                    currentIndex + 1
                );
            }
        );


    /* Teclado */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!modal.classList.contains("is-open")) {
                return;
            }


            if (event.key === "Escape") {

                closeGallery();

                return;
            }


            if (event.key === "ArrowLeft") {

                renderImage(
                    currentIndex - 1
                );

                return;
            }


            if (event.key === "ArrowRight") {

                renderImage(
                    currentIndex + 1
                );
            }
        }
    );
});