import { Router } from "express";
import { PeoplesController } from "../controllers/people.controller.js"

export const PeopleRoute = Router();

PeopleRoute.get("/", PeoplesController.getAllPeoples)
PeopleRoute.get("/:id", PeoplesController.getPeopleById)
PeopleRoute.post("/", PeoplesController.createPeople)
PeopleRoute.put("/:id", PeoplesController.editPeopleById)
PeopleRoute.delete("/:id", PeoplesController.deletePeopleById)

