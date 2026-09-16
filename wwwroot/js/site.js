document.addEventListener("DOMContentLoaded", function () {

    const themeButtons = document.querySelectorAll(".theme-button");
    const themePhotos = document.querySelectorAll(".theme-photo");

    function aplicarTema(theme) {

        document.documentElement.setAttribute("data-theme", theme);
        document.body.setAttribute("data-theme", theme);

        themeButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );

        });

        themePhotos.forEach(photo => {

            const darkSrc = photo.dataset.darkSrc;
            const lightSrc = photo.dataset.lightSrc;

            if (theme === "light") {

                if (lightSrc) {
                    photo.src = lightSrc;
                }

            } else {

                if (darkSrc) {
                    photo.src = darkSrc;
                }

            }

        });

        localStorage.setItem("portfolio-theme", theme);
    }

    themeButtons.forEach(button => {

        button.addEventListener("click", function () {

            aplicarTema(this.dataset.theme);

        });

    });

    const temaSalvo =
        localStorage.getItem("portfolio-theme") || "dark";

    aplicarTema(temaSalvo);

});