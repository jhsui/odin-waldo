import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.post("/waldo/validation", (req, res) =>
  controller.figureValidator(req, res, "waldo"),
);
router.post("/odlaw/validation", (req, res) =>
  controller.figureValidator(req, res, "odlaw"),
);
router.post("/wizard/validation", (req, res) =>
  controller.figureValidator(req, res, "wizard"),
);
router.post("/wenda/validation", (req, res) =>
  controller.figureValidator(req, res, "wenda"),
);

export default router;
