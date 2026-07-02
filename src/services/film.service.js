import { FilmModel } from "../models/film.model.js";

export class FilmService {
    static async getAllFilms({ page, limit }) {
        return await FilmModel.getAllFilms({ page, limit });
    }

    static async getAllFilmsSimple() {
        return await FilmModel.getAllFilmsSimple();
    }

    static async getFilmById(id) {
        const film = await FilmModel.getFilmById(id);
        if (!film) {
            const err = new Error("Film not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return film;
    }

    static async createFilm(filmData) {
        return await FilmModel.createFilm(filmData);
    }

    static async editFilmById(id, filmData) {
        const exist = await FilmModel.getFilmById(id);
        if (!exist) {
            const err = new Error("Film not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await FilmModel.editFilmById(id, filmData);
    }

    static async deleteFilmById(id) {
        const exist = await FilmModel.getFilmById(id);
        if (!exist) {
            const err = new Error("Film not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await FilmModel.deleteFilmById(id);
    }

}
