import { StarshipModel } from "../models/starship.model.js";

export class StarshipService {
    static async getAllStarships({ page, limit }) {
        return await StarshipModel.getAllStarships({ page, limit });
    }

    static async getAllStarshipsSimple() {
        return await StarshipModel.getAllStarshipsSimple();
    }

    static async getStarshipById(id) {
        const starship = await StarshipModel.getStarshipById(id);
        if (!starship) {
            const err = new Error("Starship not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return starship;
    }

    static async createStarship(starshipData) {
        return await StarshipModel.createStarship(starshipData);
    }

    static async editStarshipById(id, starshipData) {
        const exist = await StarshipModel.getStarshipById(id);
        if (!exist) {
            const err = new Error("Starship not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await StarshipModel.editStarshipById(id, starshipData);
    }

    static async deleteStarshipById(id) {
        const exist = await StarshipModel.getStarshipById(id);
        if (!exist) {
            const err = new Error("Starship not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await StarshipModel.deleteStarshipById(id);
    }

}
