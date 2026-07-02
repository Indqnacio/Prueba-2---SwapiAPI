import { Router } from "express";
import { CharacterController } from "../controllers/character.controller.js"

export const CharacterRoute = Router();

CharacterRoute.get("/", CharacterController.getAllCharacters)
CharacterRoute.get("/:id", CharacterController.getCharacterById)
CharacterRoute.post("/", CharacterController.createCharacter)
CharacterRoute.put("/:id", CharacterController.editCharacterById)
CharacterRoute.delete("/:id", CharacterController.deleteCharacterById)

