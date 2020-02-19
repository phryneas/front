import { css } from 'lit-element'

export default css`
  * {
    box-sizing: border-box;
  }
  :host {
    display: block;
    padding: 1rem;
    box-sizing: border-box;
    border: 1px solid var(--color-gray-40);
    border-radius: 6px;
    background: var(--color-gray-30);
    box-shadow: var(--shadow-4);
  }

  :host(:hover) {
    background-color: var(--color-gray-40);
    box-shadow: var(--shadow-8);
  }
`
