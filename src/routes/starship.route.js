import { Router } from "express";
import { StarshipsController } from "../controllers/starship.controller.js"

export const StarshipRoute = Router();

StarshipRoute.get("/", StarshipsController.getAllStarships)
StarshipRoute.get("/simple", StarshipsController.getAllStarshipsSimple)
StarshipRoute.get("/:id", StarshipsController.getStarshipById)
StarshipRoute.post("/", StarshipsController.createStarship)
StarshipRoute.put("/:id", StarshipsController.editStarshipById)
StarshipRoute.delete("/:id", StarshipsController.deleteStarshipById)