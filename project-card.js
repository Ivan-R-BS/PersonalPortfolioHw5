class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'image', 'alt', 'description', 'link', 'link-text', 'is-even'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot.innerHTML !== '') {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute('title') || '';
    const image = this.getAttribute('image') || '';
    const alt = this.getAttribute('alt') || '';
    const description = this.getAttribute('description') || '';
    const link = this.getAttribute('link') || '#';
    const linkText = this.getAttribute('link-text') || 'Learn More';
    const isEven = this.hasAttribute('is-even');

    this.shadowRoot.innerHTML = `
      <style>
        @font-face {
       font-family: 'Montserrat';
  src: url('fonts/Montserrat-Regular.woff2') format('woff2'),
       url('fonts/Montserrat-Regular.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('fonts/Roboto-Regular.woff2') format('woff2'),
       url('fonts/Roboto-Regular.woff') format('woff');
  font-display: swap;
}


:root {
  --primary-color: #003135;
  --header-bg: #024950;
  --nav-bg: #3c698a;
  --nav-text: #f9f9f9;
  --hover-bg: #e42e00;
  --footer-text: yellow;
  --link-color: #afdde5;
  --section-even-bg: #004850;
  --section-odd-bg: #002530;
  --section-padding: clamp(2rem, 4vw, 4rem);
  --spacing-unit: clamp(0.5rem, 2vw, 1.5rem);
  --container-padding: max(1rem, 5%);
  --base-font-size: clamp(1rem, 2vw, 1.25rem);
  --h1-font-size: clamp(1.5rem, 4vw, 2.5rem);
  --transition-speed: 0.3s;
  --hover-transform: translateY(-0.25rem);
}


[data-theme="light"] {
  --primary-color: #d3afaf;
  --header-bg: rgb(255,0,255);
  --nav-bg: #ddd;
  --nav-text: #333;
  --hover-bg: #131010;
  --footer-text: #de1c1c;
  --link-color: #1b6898;
  --section-even-bg: #69b16e;
  --section-odd-bg: #369dcc;
}

body {
  background-color: var(--primary-color);
  margin: 0;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", system-ui, sans-serif;
  font-size: var(--base-font-size);
  color: var(--nav-text);
}

header {
  padding: 0;
  width: 100%;
}

header h1 {
  width: inherit;
  background-color: var(--header-bg);
  margin: 0;
  padding: var(--spacing-unit);
  font-size: var(--h1-font-size);
  font-family: "Roboto", Arial, sans-serif;
}


section {
  padding: var(--section-padding);
  margin: 0;
  transition: background-color var(--transition-speed) ease;
  animation: slideIn 0.5s ease-out;
}

.section-even {
  background-color: var(--section-even-bg);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
}

.section-odd {
  background-color: var(--section-odd-bg);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
}

section:hover {
  transform: scale(1.01);
  transition: transform var(--transition-speed) ease;
}



figure {
  margin: var(--spacing-unit) 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

figcaption {
  font-style: italic;
  color: var(--link-color);
  margin-top: 0.75rem;
  font-size: 0.9em;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

aside {
  font-size: 0.85em;
  color: #8a9ea1;
  font-style: italic;
  padding: 0.75rem 1.5rem;
  border-left: 3px solid var(--link-color);
  margin: 1rem 0;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 0 4px 4px 0;
  max-width: fit-content;
  transform: translateX(2rem);
  animation: slideIn 0.5s ease-out;
}

img, video, iframe {
  max-width: min(100%, 70dvh);
  height: auto;
  display: block;
  margin: 0 auto;
}




@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-unit);
  width: 100%;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}


.card-button {
  display: inline-block;
  background-color: var(--nav-bg);
  color: var(--nav-text);
  text-decoration: none;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  transition: transform var(--transition-speed) ease, 
              background-color var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
  margin-top: 0.5rem;
}

.card-button:hover {
  background-color: var(--hover-bg);
  transform: var(--hover-transform);
  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.2);
}
      </style>
      <section class="${isEven ? 'section-even' : 'section-odd'}">
      <h2>${title}</h2>
      <figure>
        <picture>
          <img src="${image}" alt="${alt}">
        </picture>
        <figcaption>${title}</figcaption>
      </figure>
      <p>${description}</p>
      <aside>
        <a href="${link}" class="card-button">${linkText}</a>
      </aside>
      </section>
    `;
  }
}

customElements.define('project-card', ProjectCard);