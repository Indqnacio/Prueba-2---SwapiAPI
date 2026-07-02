import { FilmModel } from "../models/film.model.js";


export class FilmServices {
    static async getAllFilms({ page, limit }) {
        return await FilmModel.getAllFilms({ page, limit });
    }

    static async getFilmById(id) {
        const exist = await FilmModel.getFilmById(id);
        if (!exist) {
            const err = new Error("Film not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return await FilmModel.getFilmById(id);
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
