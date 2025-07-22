import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A floating sharing web component.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('floating-sharer')
export class FloatingSharer extends LitElement {
  @property({ type: String, attribute: 'source-url' })
  sourceUrl = window.location.href;

  @property({ type: String, attribute: 'subscribe-url' })
  subscribeUrl = '';

  @state()
  private isOpen = false;

  private handleClickOutside = (event: MouseEvent) => {
    if (this.isOpen && !this.contains(event.target as Node)) {
      this.isOpen = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  private _onSubscribeClick() {
    if (this.subscribeUrl) {
      window.open(this.subscribeUrl, '_blank');
    }
  }

  private _onShareClick() {
    this.isOpen = !this.isOpen;
  }

  private _onCollapseClick() {
    this.isOpen = false;
  }

  private _share(network: string) {
    const encodedUrl = encodeURIComponent(this.sourceUrl);
    let shareUrl = '';
    switch (network) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.isOpen ? this.renderExpanded() : this.renderCollapsed()}
      </div>
    `;
  }

  renderCollapsed() {
    return html`
      <div class="collapsed-view">
        <button @click=${this._onSubscribeClick} class="icon-button" aria-label="Subscribe">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </button>
        <button @click=${this._onShareClick} class="icon-button" aria-label="Share">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
        </button>
      </div>
    `;
  }

  renderExpanded() {
    return html`
      <div class="expanded-view">
        <button @click=${() => this._share('twitter')} class="icon-button" aria-label="Share on Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.858-.764-.024-1.482-.234-2.11-.583v.061c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.198 4.352 3.234-1.595 1.248-3.604 1.991-5.786 1.991-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/></svg>
        </button>
        <button @click=${() => this._share('facebook')} class="icon-button" aria-label="Share on Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
        </button>
        <button @click=${() => this._share('linkedin')} class="icon-button" aria-label="Share on LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.594-11.018-3.714v-2.155z"/></svg>
        </button>
        <button @click=${() => this._share('whatsapp')} class="icon-button" aria-label="Share on Whatsapp">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.587-1.52l-6.19 1.669zm4.81-3.662l.333.199c1.594.952 3.43.455 4.955-.104 1.523-.559 2.871-1.451 3.91-2.627 1.038-1.176 1.745-2.593 2.029-4.093.285-1.5-.002-3.038-.71-4.394s-1.733-2.484-3.097-3.291c-1.363-.808-2.95-1.22-4.558-1.193-3.128.02-5.922 1.655-7.331 4.196-1.41 2.54-1.223 5.59.48 7.932l.217.324-1.123 4.096 4.195-1.104z"/></svg>
        </button>
        <button @click=${this._onCollapseClick} class="icon-button" aria-label="Collapse">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      border-radius: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 8px;
    }

    .collapsed-view,
    .expanded-view {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .icon-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .icon-button:hover {
      background-color: #f0f0f0;
    }

    .icon-button svg {
      fill: #333;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'floating-sharer': FloatingSharer;
  }
}
