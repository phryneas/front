import { LitElement, customElement, property, TemplateResult } from 'lit-element'
// import { connect } from '@captaincodeman/redux-connect-element'
import { connect } from '../../../utils/connect'
import { store, RootState, Application, ApplicationSelectors } from '../../../store'
import template from './template'
import style from './style'

@customElement('main-launcher')
export class MainLauncherElement extends connect(store, LitElement) {
  @property({ type: Boolean, reflect: true }) visible: boolean = false
  @property({ type: Array }) applications: Application[]
  @property({ type: String }) selected: string

  mapState(state: RootState) {
    return {
      applications: ApplicationSelectors.applications(state),
      selected: ApplicationSelectors.selected(state),
    }
  }

  onButtonClick(): void {
    const event = new CustomEvent('launcher-click', {
      bubbles: true,
      composed: true,
      detail: {},
    })
    this.dispatchEvent(event)
  }

  public static styles = [style]

  protected render(): TemplateResult {
    return template.call(this)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-launcher': MainLauncherElement
  }
}