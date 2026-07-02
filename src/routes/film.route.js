import { Router } from "express";
import { FilmsController } from "../controllers/film.controller.js";

export const FilmRoute = Router();

FilmRoute.get("/", FilmsController.getAllFilms)
FilmRoute.get("/simple", FilmsController.getAllFilmsSimple)
FilmRoute.get("/:id", FilmsController.getFilmById)
FilmRoute.post("/", FilmsController.createFilm)
FilmRoute.put("/:id", FilmsController.editFilmById)
FilmRoute.delete("/:id", FilmsController.deleteFilmById)
