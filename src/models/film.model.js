import Film from '../schemas/film.schema.js'

export class FilmModel {

    static async getAllFilms({ page = 1, limit = 10 }) {
        return await Film.paginate({}, { page, limit });
    }

    static async getAllFilmsSimple() {
        return await Film.find().select('title')
    }

    static async getFilmById(id) {
        return await Film.findById(id);
    }

    static async createFilm(filmData) {
        return await Film.create(filmData);
    }

    static async editFilmById(id, filmData) {
        return await Film.findByIdAndUpdate(id, filmData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deleteFilmById(id) {
        return await Film.findByIdAndDelete(id);
    }

}