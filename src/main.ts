//
// 28 Sep 2022 이윤상 CLO Virtual Fashion NXP Web Graphics Assignment.
//

import { checkWebGLCompatibility } from "@lib/util/WebGLCompatibilityCheck";
import "resetcss/reset.min.css";
import { run } from "./playground";

// start running assignment.
(async function entry() {
  if (!checkWebGLCompatibility()) {
    return;
  }

  await run();
})();
