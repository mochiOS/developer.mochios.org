(() => {
    const DESKTOP_QUERY = "(min-width: 1280px)";
    const HEADING_SELECTOR = ".markdown h1, .markdown h2, .markdown h3";

    let desktopToc = null;
    let mobileToc = null;
    let observer = null;
    let lastHeadingSignature = "";

    function slugify(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
            .replace(/^-+|-+$/g, "") || "section";
    }

    function getHeadings() {
        return Array.from(document.querySelectorAll(HEADING_SELECTOR))
            .filter(heading => heading.textContent.trim() !== "");
    }

    function ensureHeadingIds(headings) {
        const used = new Set();

        headings.forEach(heading => {
            let base = heading.id || slugify(heading.textContent);
            let id = base;
            let index = 2;

            while (used.has(id) || document.querySelectorAll(`#${CSS.escape(id)}`).length > 1) {
                id = `${base}-${index}`;
                index += 1;
            }

            heading.id = id;
            used.add(id);
        });
    }

    function getHeadingLevel(heading) {
        return Number(heading.tagName.slice(1));
    }

    function getHeadingSignature(headings) {
        return headings.map(heading => {
            return `${heading.tagName}:${heading.id}:${heading.textContent.trim()}`;
        }).join("|");
    }

    function createLink(heading) {
        const link = document.createElement("a");
        link.className = "doc-toc-link";
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent.trim();
        link.dataset.targetId = heading.id;

        link.addEventListener("click", event => {
            event.preventDefault();

            const target = document.getElementById(heading.id);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", `#${heading.id}`);

            if (mobileToc) {
                const details = mobileToc.querySelector("details");

                if (details) {
                    details.open = false;
                }
            }
        });

        return link;
    }

    function buildList(headings) {
        const list = document.createElement("ol");
        list.className = "doc-toc-list";

        headings.forEach(heading => {
            const item = document.createElement("li");
            item.className = `doc-toc-item doc-toc-level-${getHeadingLevel(heading)}`;

            item.appendChild(createLink(heading));
            list.appendChild(item);
        });

        return list;
    }

    function ensureDesktopToc() {
        if (desktopToc) {
            return desktopToc;
        }

        desktopToc = document.createElement("aside");
        desktopToc.id = "doc-toc";
        desktopToc.className = "doc-toc";
        desktopToc.setAttribute("aria-label", "ページ内目次");

        document.body.appendChild(desktopToc);

        return desktopToc;
    }

    function findContentMountPoint() {
        return document.querySelector("[data-dev-content]")
            || document.querySelector("[data-developer-content]")
            || document.querySelector("[data-policy-content]")
            || document.querySelector(".markdown");
    }

    function ensureMobileToc() {
        if (mobileToc) {
            return mobileToc;
        }

        mobileToc = document.createElement("section");
        mobileToc.id = "doc-toc-mobile";
        mobileToc.className = "doc-toc-mobile";
        mobileToc.setAttribute("aria-label", "ページ内目次");

        const mountPoint = findContentMountPoint();

        if (mountPoint && mountPoint.parentNode) {
            mountPoint.parentNode.insertBefore(mobileToc, mountPoint);
        } else {
            document.body.prepend(mobileToc);
        }

        return mobileToc;
    }

    function renderDesktopToc(headings) {
        const toc = ensureDesktopToc();
        toc.innerHTML = "";

        if (headings.length <= 1) {
            toc.hidden = true;
            return;
        }

        const inner = document.createElement("div");
        inner.className = "doc-toc-nav";

        inner.appendChild(buildList(headings));
        toc.appendChild(inner);
        toc.hidden = false;
    }

    function renderMobileToc(headings) {
        const toc = ensureMobileToc();
        toc.innerHTML = "";

        if (headings.length <= 1) {
            toc.hidden = true;
            return;
        }

        const details = document.createElement("details");
        details.className = "doc-toc-accordion";

        const summary = document.createElement("summary");
        summary.className = "doc-toc-summary";
        summary.textContent = "このページの目次";

        const body = document.createElement("div");
        body.className = "doc-toc-accordion-body";
        body.appendChild(buildList(headings));

        details.appendChild(summary);
        details.appendChild(body);
        toc.appendChild(details);
        toc.hidden = false;
    }

    function updateActiveLink() {
        const headings = getHeadings();

        if (headings.length === 0) {
            return;
        }

        let active = headings[0];

        for (const heading of headings) {
            const rect = heading.getBoundingClientRect();

            if (rect.top <= 120) {
                active = heading;
            } else {
                break;
            }
        }

        document.querySelectorAll(".doc-toc-link").forEach(link => {
            link.classList.toggle("active", link.dataset.targetId === active.id);
        });
    }

    function renderToc() {
        const headings = getHeadings();

        ensureHeadingIds(headings);

        const signature = getHeadingSignature(headings);

        if (signature === lastHeadingSignature) {
            updateActiveLink();
            return;
        }

        lastHeadingSignature = signature;

        renderDesktopToc(headings);
        renderMobileToc(headings);
        updateActiveLink();
    }

    function observeMarkdownChanges() {
        if (observer) {
            observer.disconnect();
        }

        observer = new MutationObserver(() => {
            window.requestAnimationFrame(renderToc);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        renderToc();
        observeMarkdownChanges();

        window.addEventListener("scroll", updateActiveLink, { passive: true });
        window.addEventListener("resize", updateActiveLink);
        window.matchMedia(DESKTOP_QUERY).addEventListener("change", updateActiveLink);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();