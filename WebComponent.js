export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this._handleAttributes();
  }

  /**
   * Return your CSS tag in of this function
   * @example CSS() { return html`<style> .foo { color: red; } </style>` }
   */
  CSS() {}

  /**
   * Return your markup inside of this function
   * @example HTML() { return html`<div> foo </div>` }
   */
  HTML() {}

  connectedCallback() {
    this.cssNode = this.CSS();
    this.domNode = this.HTML();
    if (this.cssNode) this.shadowRoot.appendChild(this.cssNode);
    if (this.domNode) this.shadowRoot.appendChild(this.domNode);
  }

  // Attribute Handling
  ////////////////////////////////////////////////////////////

  /**
   * Return an array of attributes you want to observe
   * + This will automatically observe the attributes and
   * also add GETTERS and SETTERS for the attribute
   * 
   * Use handle<Name>Change(newValue, oldValue) {} to react to attribute changes
   * 
   * @example 
   * static get observedAttributes() {} { return ['status'] }
   * // Will trigger following function on attribute change:
   * handleStatusChange(newValue, oldValue) {}
   * // And add:
   * get status() {
   *  return this.getAttribute('status');
   * }
   * set status(newValue) {
   *  return this.setAttribute('status', newValue);
   * }
   * // Note: it will automatically handle boolean values in setters like so:
   * set status(newValue) {
   *  if(newValue)
   *    return this.setAttribute('status', '');
   *  else
   *    return this.removeAttribute('status');
   * }
   */
  static get observedAttributes() {}

  _handleAttributes() {
    const attrs = this.constructor.observedAttributes;
    if (!attrs || attrs.length <= 0) return;
    attrs.forEach(attr => {
      Object.defineProperty(this, attr, {
        get: function () {
          return this.getAttribute(attr);
        },
        set: function (newValue) {
          if (typeof newValue !== "boolean")
            return this.setAttribute(attr, newValue);

          if (newValue)
            return this.setAttribute(attr, '');
          else
            return this.removeAttribute(attr);
        }
      });
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const capitalizedName = name.substring(0, 1).toUpperCase() + name.substring(1);
    this[`handle${capitalizedName}Change`] &&
      this[`handle${capitalizedName}Change`](newValue, oldValue);
  }
}
