document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const glow = document.querySelector(".cursor-glow");

    if (glow) {

        document.addEventListener("mousemove", function (event) {

            glow.style.left = event.clientX + "px";
            glow.style.top = event.clientY + "px";

        });

    }


    /* =====================================================
       TEMA
    ===================================================== */

    const themeButtons =
        document.querySelectorAll(".theme-button");

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add("light-theme");

        } else {

            document.body.classList.remove("light-theme");

        }


        themeButtons.forEach(function (button) {

            const buttonTheme =
                button.dataset.theme;

            button.classList.toggle(
                "active",
                buttonTheme === theme
            );

        });


        localStorage.setItem(
            "portfolio-theme",
            theme
        );

    }


    /* =====================================================
       TEMA INICIAL
    ===================================================== */

    applyTheme(
        savedTheme === "light"
            ? "light"
            : "dark"
    );


    /* =====================================================
       BOTÕES
    ===================================================== */

    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedTheme =
                button.dataset.theme;

            applyTheme(selectedTheme);

        });

    });

});