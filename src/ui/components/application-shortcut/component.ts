import { LitElement, customElement, property, TemplateResult, CSSResultArray } from 'lit-element'
import template from './template'
import style from './style'

@customElement('application-shortcut')
export class ApplicationShortcutElement extends LitElement {
  @property({ type: String }) key: string = ''
  @property({ type: String }) title: string = 'Unknown application'

  onHostClick(): void {
    const evt = new CustomEvent('application-shortcut-click', {
      bubbles: true,
      composed: true,
      detail: {
        key: this.key,
        title: this.title,
      },
    })
    this.dispatchEvent(evt)
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onHostClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onHostClick)
  }

  protected render(): TemplateResult {
    return template.call(this)
  }

  public static get styles(): CSSResultArray {
    return [style]
  }
}

declare global {
  interface DocumentEventMap {
    'application-shortcut-click': CustomEvent<ApplicationShortcutData>
  }

  interface HTMLElementTagNameMap {
    'application-shortcut': ApplicationShortcutElement
  }
}

export interface ApplicationShortcutData {
  key: number
  name: string
}