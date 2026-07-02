import { Router } from "express";
import { PlanetsController } from "../controllers/planet.controller.js";

export const PlanetRoute = Router();

PlanetRoute.get("/", PlanetsController.getAllPlanets)
PlanetRoute.get("/:id", PlanetsController.getPlanetById)
PlanetRoute.post("/", PlanetsController.createPlanet)
PlanetRoute.put("/:id", PlanetsController.editPlanetById)
PlanetRoute.delete("/:id", PlanetsController.deletePlanetById)