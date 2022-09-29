export {};

declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullscreenElement: Element | null;
    msFullscreenElement: Element | null;
  }

  interface HTMLElement {
    webkitRequestFullscreen: () => Promise<void>;
    mozRequestFullscreen: () => Promise<void>;
    msRequestFullscreen: () => Promise<void>;
  }
}
