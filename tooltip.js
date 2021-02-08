class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Some dummy text.";
    this.attachShadow({ mode: "open" });
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

        :host {
          position: relative;
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

        .tip {
          cursor: help;
        }
      </style>
      <slot>Some default</slot>
      <span class="tip" > (?)<span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("tip-text")) {
      this._tooltipText = this.getAttribute("tip-text");
    }
    this.tooltipIcon = this.shadowRoot.querySelector("span");
    this.tooltipIcon.addEventListener("mouseenter", this._showTooltip);
    this.tooltipIcon.addEventListener("mouseleave", this._hideTooltip);
    this._render();
  }

  disconnectedCallback() {
    this.tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this.tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip = () => {
    this._tooltipVisible = true;
    this._render();
  };

  _hideTooltip = () => {
    this._tooltipVisible = false;
    this._render();
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "tip-text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["tip-text"];
  }
}

customElements.define("jm-tooltip", Tooltip);
