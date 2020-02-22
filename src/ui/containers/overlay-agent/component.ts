import { LitElement, customElement, property, TemplateResult, CSSResultArray } from 'lit-element'
import template from './template'
import style from './style'

@customElement('overlay-agent' as any)
export class OverlayAgentElement extends LitElement {
  protected render(): TemplateResult {
    return template.call(this)
  }

  public static get styles(): CSSResultArray {
    return [style]
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'overlay-agent': OverlayAgentElement
  }
}
