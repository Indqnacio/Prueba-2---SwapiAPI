
import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller.js"

export const VehicleRoute = Router();

VehicleRoute.get("/", VehicleController.getAllVehicles)
VehicleRoute.get("/simple", VehicleController.getAllVehiclesSimple)
VehicleRoute.get("/:id", VehicleController.getVehicleById)
VehicleRoute.post("/", VehicleController.createVehicle)
VehicleRoute.put("/:id", VehicleController.editVehicleById)
VehicleRoute.delete("/:id", VehicleController.deleteVehicleById)