import { html, TemplateResult } from 'lit-element'
import { SystemShellElement } from './component'
import '../../containers/main-launcher'
import '../../containers/app-shell'
import '../system-router'

export default function template(this: SystemShellElement): TemplateResult {
  switch (this.websocketState) {
    case 'WEBSOCKET_CONNECTING':
      return html`
        <div style="background-color: orange;"><p style="color: white;">Connecting...</p></div>
      `
    case 'WEBSOCKET_CONNECTED':
      return html`
        ${this.isLauncherVisible
          ? html`
              <main-launcher id="main-launcher" noshadow></main-launcher>
            `
          : ``}
        <system-router></system-router>
        <app-shell noshadow></app-shell>
      `
    default:
      return html`
        <div style="background-color: red;"><p style="color: white;">WSS connection lost</p></div>
      `
  }
}
