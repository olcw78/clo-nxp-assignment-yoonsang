import { thisbind } from "src/shared/decorator/thisbind";
import { PerspectiveCamera } from "three";
import { Runner } from "./runner";

export class RunnerEventListener {
  constructor(private readonly _impl: Runner) {
    // attach web browsers event listeners.
    window.addEventListener("resize", this.resize);
    window.addEventListener("dblclick", this.toggleFullScreenMode);
    window.addEventListener("keydown", this.onKeyDown);
  }

  // #region behaviour

  @thisbind
  private resize(): void {
    if ("aspect" in this._impl.camera) {
      const perspectiveCamera = this._impl.camera as PerspectiveCamera;
      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
    } else {
      // todo: update resizing window logic on using Orthographic Camera.
    }

    this._impl.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @thisbind
  private toggleFullScreenMode(): void {
    const fullscreenElement =
      document.fullscreenElement ??
      document.webkitFullscreenElement ??
      document.mozFullscreenElement ??
      document.msFullscreenElement;

    if (!fullscreenElement) {
      const canvas = this._impl.renderer.domElement;

      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.mozRequestFullscreen) {
        canvas.mozRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  }

  @thisbind
  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "h":
        if (Runner.guiHidden) {
          Runner.gui.show();
        } else {
          Runner.gui.hide();
        }
        Runner.guiHidden = !Runner.guiHidden;
    }
  }

  // #endregion behaviour
}
