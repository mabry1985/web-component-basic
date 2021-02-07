class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip);
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip);
    this.appendChild(tooltipIcon);
  }

  _showTooltip = () => {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = 'This is the tooltip text!';
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip = () => {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('jm-tooltip', Tooltip)