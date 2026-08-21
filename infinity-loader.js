(function () {
    const LOGO = "assets/infinity-developers-logo.png";

    const style = document.createElement("style");

    style.textContent = `
        #infinity-developers-loader {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #020817;
            opacity: 1;
            transition: opacity .5s ease, visibility .5s ease;
        }

        #infinity-developers-loader.hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        #infinity-developers-loader img {
            width: min(420px, 75vw);
            height: auto;
            object-fit: contain;
            animation: infinityLoaderPulse 2s ease-in-out infinite;
            user-select: none;
            -webkit-user-drag: none;
        }

        @keyframes infinityLoaderPulse {
            0%, 100% {
                transform: scale(1);
                filter: drop-shadow(0 0 8px rgba(0, 140, 255, .25));
            }

            50% {
                transform: scale(1.035);
                filter: drop-shadow(0 0 28px rgba(0, 180, 255, .55));
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #infinity-developers-loader img {
                animation: none;
            }
        }
    `;

    document.head.appendChild(style);

    const loader = document.createElement("div");
    loader.id = "infinity-developers-loader";

    loader.innerHTML = `
        <img
            src="${LOGO}"
            alt="Infinity Developers"
        >
    `;

    function initializeLoader() {
        document.body.prepend(loader);
    }

    if (document.body) {
        initializeLoader();
    } else {
        document.addEventListener("DOMContentLoaded", initializeLoader, {
            once: true
        });
    }

    function hideLoader() {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 550);
    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 300);
    });

    /*
     * Manual control
     *
     * InfinityLoader.show()
     * InfinityLoader.hide()
     */

    window.InfinityLoader = {
        show() {
            document.body.prepend(loader);
            loader.classList.remove("hide");
        },

        hide() {
            hideLoader();
        }
    };

})();
