class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy text.';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26)
        }

        :host(.important) {
          background: var(--color-primary, #ccc);
          padding: 0.15rem
        }

        :host-context(p) {
          font-weight: bold;
        }

        .highlight {
        }

        ::slotted(.highlight) {
          border-bottom: 1px dotted red;        }

      </style>
      <slot>Some default</slot>
      <span> (?)<span>
    `;
    
  }
  
  connectedCallback() {
    if(this.hasAttribute('tip-text')) {
      this._tooltipText = this.getAttribute('tip-text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip);
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip);
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  _showTooltip = () => {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip = () => {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('jm-tooltip', Tooltip)