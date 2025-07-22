import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A reading progress bar component.
 *
 * @csspart progress-bar - The container for the progress bar.
 * @csspart progress - The progress indicator itself.
 */
@customElement('reading-progress')
export class ReadingProgress extends LitElement {
  /**
   * The color of the progress bar.
   */
  @property({ type: String })
  color = '#6a1b9a';

  @state()
  private _progress = 0;

  private _updateProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    if (scrollableHeight > 0) {
      this._progress = (scrollTop / scrollableHeight) * 100;
    } else {
      this._progress = 0;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._updateProgress);
    this._updateProgress(); // Initial calculation
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._updateProgress);
  }

  render() {
    return html`
      <div class="progress-bar" part="progress-bar">
        <div
          class="progress"
          part="progress"
          style="width: ${this._progress}%; background-color: ${this.color};"
        >
          <div class="glow" style="box-shadow: 0 0 10px ${this.color}, 0 0 20px ${this.color}; background-color: ${this.color};"></div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px; /* A bit thicker for better visibility */
      z-index: 9999;
      pointer-events: none; /* Allow clicks to go through */
    }

    .progress-bar {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }

    .progress {
      height: 100%;
      position: relative;
      transition: width 50ms linear; /* Smooth transition */
    }

    .glow {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 65px; /* Size of the glowing spot */
      height: 3px; /* Size of the glowing spot */
      border-radius: 50%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'reading-progress': ReadingProgress;
  }
}