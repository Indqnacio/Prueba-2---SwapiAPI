import Starship from '../schemas/starship.schema.js'

export class StarshipModel {

    static async getAllStarships({ page = 1, limit = 10 }) {
        return await Starship.paginate({}, { page, limit });
    }

    static async getAllStarshipsSimple() {
        return await Starship.find().select('name');
    }

    static async getStarshipById(id) {
        return await Starship.findById(id);
    }

    static async createStarship(starshipData) {
        return await Starship.create(starshipData);
    }

    static async editStarshipById(id, starshipData) {
        return await Starship.findByIdAndUpdate(id, starshipData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deleteStarshipById(id) {
        return await Starship.findByIdAndDelete(id);
    }

}