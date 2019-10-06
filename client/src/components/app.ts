import { customElement, html, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';
import { installRouter } from 'pwa-helpers/router';
import { navigate } from '../actions/app/app';

@customElement('app-music')
export class App extends connect(store)(LitElement) {
    @property({ type: String }) page: string;

    render() {
        return html`
    <style>
      :host {
        display: block;
        height: 100vh;
      }
      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }
      [main-title] {
        text-transform: lowercase;
        font-size: 30px;
        text-align: left;
      }
      .main-content {
        padding-top: 20px;
      }
      .main-content .page[active] {
        display: block;
      }
      .main-content .page {
        display: none;
      }
    </style>
    <main class="main-content" role="main">
      <app-songs class="page" ?active="${this.page === 'songs'}"></app-songs>
      <app-search class="page" ?active="${this.page === 'search'}"></app-search>
      <app-login class="page" ?active="${this.page === 'login'}"></app-login>
      <app-not-found class="page" ?active="${this.page === 'not-found'}"></app-not-found>
    </main>
        `;
    }

    firstUpdated() {
        installRouter((location) => {
            store.dispatch(navigate(decodeURIComponent(location.pathname)) as any);
        });
    }

    stateChanged(state) {
        this.page = state.app.page;
    }
}
