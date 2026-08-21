(() => {
    const loader = document.createElement("div");

    loader.id = "infinity-loader";

    loader.innerHTML = `
        <img
            src="assets/infinity-developers-logo.png"
            alt="Infinity Developers"
            width="220"
        >
    `;

    loader.style.cssText = `
        position:fixed;
        inset:0;
        z-index:999999;
        display:grid;
        place-items:center;
        background:#020817;
        opacity:1;
        transition:opacity .4s ease;
    `;

    document.body.prepend(loader);

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.remove();
        }, 500);

    }, 2000);
})();
