(() => {
    const CONTENT_SELECTOR = ".markdown";
    const HEADING_SELECTOR = "h1, h2, h3";
    const TOC_ID = "doc-toc";
    const LINK_ACTIVE_CLASS = "active";

    let lastSignature = "";
    let observer = null;
    let ticking = false;
    let mutationObserver = null;

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function getContent() {
        return document.querySelector(CONTENT_SELECTOR);
    }

    function getHeadings() {
        const content = getContent();

        if (!content) {
            return [];
        }

        return Array.from(content.querySelectorAll(HEADING_SELECTOR))
            .filter(heading => heading.textContent.trim().length > 0);
    }

    function makeHeadingId(index) {
        return `section-${index + 1}`;
    }

    function ensureHeadingIds(headings) {
        const used = new Set();

        headings.forEach((heading, index) => {
            let id = heading.id && heading.id.trim() ? heading.id.trim() : makeHeadingId(index);
            let uniqueId = id;
            let count = 2;

            while (used.has(uniqueId)) {
                uniqueId = `${id}-${count}`;
                count += 1;
            }

            heading.id = uniqueId;
            used.add(uniqueId);
        });
    }

    function getSignature(headings) {
        return headings.map(heading => {
            return `${heading.tagName}:${heading.id}:${heading.textContent.trim()}`;
        }).join("|");
    }

    function ensureTocElement() {
        let toc = document.getElementById(TOC_ID);

        if (toc) {
            return toc;
        }

        toc = document.createElement("aside");
        toc.id = TOC_ID;
        toc.className = "doc-toc";
        toc.setAttribute("aria-label", "ページ内目次");
        document.body.appendChild(toc);

        return toc;
    }

    function levelOf(heading) {
        return Number(heading.tagName.slice(1));
    }

    function renderToc(headings) {
        const toc = ensureTocElement();

        if (headings.length < 2) {
            toc.hidden = true;
            toc.innerHTML = "";
            return;
        }

        toc.hidden = false;
        toc.innerHTML = `
            <nav class="doc-toc-nav">
                <ol class="doc-toc-list">
                    ${headings.map(heading => {
                        const level = levelOf(heading);
                        const title = heading.textContent.trim();

                        return `
                            <li class="doc-toc-item doc-toc-level-${level}">
                                <a class="doc-toc-link" href="#${escapeHtml(heading.id)}" data-doc-toc-link="${escapeHtml(heading.id)}">
                                    ${escapeHtml(title)}
                                </a>
                            </li>
                        `;
                    }).join("")}
                </ol>
            </nav>
        `;
    }

    function setActive(id) {
        document.querySelectorAll("[data-doc-toc-link]").forEach(link => {
            link.classList.toggle(LINK_ACTIVE_CLASS, link.dataset.docTocLink === id);
        });
    }

    function observeActiveHeading(headings) {
        if (observer) {
            observer.disconnect();
        }

        if (headings.length === 0) {
            return;
        }

        observer = new IntersectionObserver(entries => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visible.length > 0) {
                setActive(visible[0].target.id);
                return;
            }

            const headingsAboveViewport = headings
                .filter(heading => heading.getBoundingClientRect().top < 120);
            const above = headingsAboveViewport[headingsAboveViewport.length - 1];

            if (above) {
                setActive(above.id);
            }
        }, {
            root: null,
            rootMargin: "-96px 0px -65% 0px",
            threshold: [0, 1]
        });

        headings.forEach(heading => observer.observe(heading));
        setActive(headings[0].id);
    }

    function enableTocClick() {
        document.addEventListener("click", event => {
            const link = event.target.closest("[data-doc-toc-link]");

            if (!link) {
                return;
            }

            const heading = document.getElementById(link.dataset.docTocLink);

            if (!heading) {
                return;
            }

            event.preventDefault();
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${heading.id}`);
            setActive(heading.id);
        });
    }

    function rebuildToc() {
        ticking = false;

        const headings = getHeadings();
        ensureHeadingIds(headings);

        const signature = getSignature(headings);

        if (signature === lastSignature) {
            return;
        }

        lastSignature = signature;
        renderToc(headings);
        observeActiveHeading(headings);
    }

    function scheduleRebuild() {
        if (ticking) {
            return;
        }

        ticking = true;
        requestAnimationFrame(rebuildToc);
    }

    function observeDocumentChanges() {
        mutationObserver = new MutationObserver(scheduleRebuild);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        ensureTocElement();
        enableTocClick();
        observeDocumentChanges();
        scheduleRebuild();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
