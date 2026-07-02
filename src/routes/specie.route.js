import { Router } from "express";
import { SpeciesController } from "../controllers/specie.controller.js";

export const SpecieRoute = Router();

SpecieRoute.get("/", SpeciesController.getAllSpecies)
SpecieRoute.get("/:id", SpeciesController.getSpecieById)
SpecieRoute.post("/", SpeciesController.createSpecie)
SpecieRoute.put("/:id", SpeciesController.editSpecieById)
SpecieRoute.delete("/:id", SpeciesController.deleteSpecieById)