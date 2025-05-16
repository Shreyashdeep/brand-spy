import { Router } from "express";
import brandRoutes from "./brandRoutes";

const router = Router();

router.use("/", brandRoutes);

export default router; 