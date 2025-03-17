class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'image', 'alt', 'description', 'link', 'link-text'];
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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--section-odd-bg, #002530);
          padding: var(--section-padding, clamp(2rem, 4vw, 4rem));
          margin: var(--spacing-unit, clamp(0.5rem, 2vw, 1.5rem)) 0;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
          transition: transform var(--transition-speed, 0.3s) ease;
          width: 100%;
          border-radius: 8px;
          font-family: "Montserrat", system-ui, sans-serif;
          font-size: var(--base-font-size, clamp(1rem, 2vw, 1.25rem));
          color: var(--nav-text, #f9f9f9);
        }

        :host(:hover) {
          transform: scale(1.01);
        }

        h2 {
          margin-top: 0;
          font-size: 1.5em;
          color: var(--link-color, #afdde5);
          font-family: "Roboto", Arial, sans-serif;
        }

        figure {
          margin: var(--spacing-unit, clamp(0.5rem, 2vw, 1.5rem)) 0;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        figcaption {
          font-style: italic;
          color: var(--link-color, #afdde5);
          margin-top: 0.75rem;
          font-size: 0.9em;
          text-align: center;
          padding: 0.5rem 1rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        img {
          max-width: min(100%, 70dvh);
          height: auto;
          display: block;
          margin: 0 auto;
        }

        aside {
          font-size: 0.85em;
          color: #8a9ea1;
          font-style: italic;
          padding: 0.75rem 1.5rem;
          border-left: 3px solid var(--link-color, #afdde5);
          margin: 1rem 0;
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 0 4px 4px 0;
          max-width: fit-content;
          transform: translateX(2rem);
          animation: slideIn 0.5s ease-out;
        }

        a {
          color: var(--link-color, #afdde5);
          text-decoration: none;
          transition: color var(--transition-speed, 0.3s) ease;
        }

        a:hover {
          color: var(--hover-bg, #e42e00);
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
      </style>
      <h2>${title}</h2>
      <figure>
        <picture>
          <img src="${image}" alt="${alt}">
        </picture>
        <figcaption>${title}</figcaption>
      </figure>
      <p>${description}</p>
      <aside>
        <a href="${link}">${linkText}</a>
      </aside>
    `;
  }
}

customElements.define('project-card', ProjectCard);