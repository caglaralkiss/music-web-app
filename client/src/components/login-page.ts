import { customElement, html } from 'lit-element';
import { PageViewElement } from './page-view-element';

@customElement('app-login')
export class Login extends PageViewElement {
    render() {
        return html`<p>Login Page!</p>`;
    }
}
