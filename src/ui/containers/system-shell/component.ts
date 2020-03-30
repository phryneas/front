import { LitElement, customElement, property, TemplateResult, CSSResultArray } from 'lit-element'
import { connect } from '../../../utils/connect'
import {
  store,
  RootState,
  WebsocketSelectors,
  UiSelectors,
  hideLauncher,
  getApplications,
  ApplicationSelectors,
} from '../../../store'
import template from './template'
import style from './style'
// import { EventPathIncludes } from '../../../utils'

@customElement('system-shell' as any)
export class SystemShellElement extends connect(store, LitElement) {
  @property({ type: String }) websocketState: string = WebsocketSelectors.state.toString()
  @property({ type: Boolean }) isLauncherVisible: boolean = false
  // @property({ type: Object }) selectedApplication: object = {}
  @property({ type: String }) selectedApplication: string = 'app-users'

  // @property({ type: Object }) entities: object = {}

  mapState(state: RootState) {
    return {
      websocketState: WebsocketSelectors.state(state),
      isLauncherVisible: UiSelectors.getLauncherVisibility(state),
      // selectedApplication: ApplicationSelectors.component(state),
      // entities: ApplicationSelectors.entities(state),
    }
  }

  mapEvents() {
    return {
      'application-shortcut-click': (e: CustomEvent) => hideLauncher(),
    }
  }

  // Intercept custom events from child components and call Redux action (works only if store is connected)
  // mapEvents() {
  //   return {
  //     // 'launcher-click': (e: CustomEvent) => UserActions.selectUser(e.detail.key),
  //     'launcher-click': (e: CustomEvent) => {
  //       console.log(e)
  //     },
  //   }
  // }

  connectedCallback(): void {
    super.connectedCallback()
    // https://stackoverflow.com/a/37559790/6651080
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && e.keyCode === 80) {
        e.stopPropagation()
        e.preventDefault()
        // console.log(e)
      }
    })
    document.addEventListener('launcher-click', function(e) {
      console.log('launcher-click received', e)
    })
    document.addEventListener('application-shortcut-click', function(e) {
      console.log('start-application-click received', e)
    })
    // this.addEventListener('click', function(e: any) {
    //   if (EventPathIncludes(e, '#main-launcher')) {
    //     console.log('Regular click received', e)
    //   }
    //   console.log('Click received', e)
    // })
  }

  protected render(): TemplateResult {
    return template.call(this)
  }

  public static get styles(): CSSResultArray {
    return [style]
  }
}
