(() => {
  const body = document.body;
  const indexButton = document.querySelector('[data-doc-index-button]');
  const overlay = document.querySelector('[data-doc-index-overlay]');

  const setIndexOpen = (open) => {
    body.classList.toggle('doc-index-open', open);
    if (indexButton) indexButton.setAttribute('aria-expanded', String(open));
  };

  indexButton?.addEventListener('click', () => {
    setIndexOpen(!body.classList.contains('doc-index-open'));
  });

  overlay?.addEventListener('click', () => setIndexOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setIndexOpen(false);
  });

  document.querySelectorAll('.dev-sidebar a').forEach((link) => {
    link.addEventListener('click', () => setIndexOpen(false));
  });

  const content = document.querySelector('[data-doc-content]');
  const toc = document.querySelector('#doc-toc');
  const tocList = document.querySelector('[data-doc-toc-list]');
  const mobileToc = document.querySelector('#doc-toc-mobile');
  const mobileTocList = document.querySelector('[data-doc-toc-mobile-list]');

  if (!content || !toc || !tocList || !mobileToc || !mobileTocList) return;

  const slugify = (text) => text
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, '-')
    .replace(/[^\p{Letter}\p{Number}_-]/gu, '')
    .replace(/^-+|-+$/g, '');

  const used = new Map();
  const headings = [...content.querySelectorAll('h2, h3')];

  if (headings.length === 0) {
    toc.hidden = true;
    mobileToc.hidden = true;
    return;
  }

  const ensureId = (heading) => {
    if (heading.id) return heading.id;
    const base = slugify(heading.textContent || 'section') || 'section';
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    heading.id = count === 0 ? base : `${base}-${count + 1}`;
    return heading.id;
  };

  const items = headings.map((heading) => {
    const id = ensureId(heading);
    const level = heading.tagName === 'H3' ? 3 : 2;
    return { id, level, text: heading.textContent.trim() };
  });

  const render = (target) => {
    target.innerHTML = '';
    for (const item of items) {
      const li = document.createElement('li');
      li.className = `doc-toc-item doc-toc-level-${item.level}`;

      const a = document.createElement('a');
      a.className = 'doc-toc-link';
      a.href = `#${item.id}`;
      a.textContent = item.text;
      a.addEventListener('click', () => {
        document.querySelector('#doc-toc-mobile details')?.removeAttribute('open');
      });

      li.appendChild(a);
      target.appendChild(li);
    }
  };

  render(tocList);
  render(mobileTocList);
  toc.hidden = false;
  mobileToc.hidden = false;

  const links = [...document.querySelectorAll('.doc-toc-link')];
  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, {
      rootMargin: '-80px 0px -65% 0px',
      threshold: [0, 1]
    });

    headings.forEach((heading) => observer.observe(heading));
  }

  if (items[0]) setActive(items[0].id);
})();
