import { i as a, n as c, r as g, a as d, x as h, t as w } from "./state-DWSnhQMX.js";
var b = Object.defineProperty, u = Object.getOwnPropertyDescriptor, p = (e, o, i, t) => {
  for (var r = t > 1 ? void 0 : t ? u(o, i) : o, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (r = (t ? l(o, i, r) : l(r)) || r);
  return t && r && b(o, i, r), r;
};
let s = class extends d {
  constructor() {
    super(...arguments), this.color = "#6a1b9a", this._progress = 0, this._updateProgress = () => {
      const e = document.documentElement.scrollHeight - window.innerHeight, o = window.scrollY;
      e > 0 ? this._progress = o / e * 100 : this._progress = 0;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("scroll", this._updateProgress), this._updateProgress();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("scroll", this._updateProgress);
  }
  render() {
    return h`
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
};
s.styles = a`
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
p([
  c({ type: String })
], s.prototype, "color", 2);
p([
  g()
], s.prototype, "_progress", 2);
s = p([
  w("reading-progress")
], s);
export {
  s as ReadingProgress
};
