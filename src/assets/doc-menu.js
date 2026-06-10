(() => {
    const SIDEBAR_SELECTOR = ".dev-sidebar, .developer-sidebar, .policy-sidebar";
    const MAIN_SELECTOR = ".dev-main, .developer-main, .policy-main";

    let button = null;
    let overlay = null;

    function getSidebar() {
        return document.querySelector(SIDEBAR_SELECTOR);
    }

    function isOpen() {
        return document.body.classList.contains("doc-index-open");
    }

    function setOpen(open) {
        document.body.classList.toggle("doc-index-open", open);

        if (button) {
            button.setAttribute("aria-expanded", open ? "true" : "false");
        }
    }

    function closeMenu() {
        setOpen(false);
    }

    function toggleMenu() {
        setOpen(!isOpen());
    }

    function createButton() {
        if (button) {
            return button;
        }

        button = document.createElement("button");
        button.type = "button";
        button.className = "doc-index-button";
        button.setAttribute("aria-label", "ページ一覧を開く");
        button.setAttribute("aria-expanded", "false");

        button.innerHTML = `
            <span class="doc-index-button-bars" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </span>
        `;

        button.addEventListener("click", toggleMenu);
        document.body.appendChild(button);

        return button;
    }

    function createOverlay() {
        if (overlay) {
            return overlay;
        }

        overlay = document.createElement("div");
        overlay.className = "doc-index-overlay";
        overlay.addEventListener("click", closeMenu);
        document.body.appendChild(overlay);

        return overlay;
    }

    function setupSidebar(sidebar) {
        sidebar.id = sidebar.id || "doc-page-index";

        createButton().setAttribute("aria-controls", sidebar.id);
        createOverlay();

        sidebar.addEventListener("click", event => {
            if (event.target.closest("a")) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.matchMedia("(min-width: 1361px)").matches) {
                closeMenu();
            }
        });
    }

    function init() {
        const sidebar = getSidebar();

        if (!sidebar) {
            return false;
        }

        setupSidebar(sidebar);
        return true;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            if (init()) {
                return;
            }

            const observer = new MutationObserver(() => {
                if (init()) {
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    } else if (!init()) {
        const observer = new MutationObserver(() => {
            if (init()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();