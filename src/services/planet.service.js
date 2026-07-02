import { PlanetModel } from "../models/planet.model.js";

export class PlanetService {
    static async getAllPlanets({ page, limit }) {
        return await PlanetModel.getAllPlanets({ page, limit });
    }

    static async getAllPlanetsSimple() {
        return await PlanetModel.getAllPlanetsSimple();
    }

    static async getPlanetById(id) {
        const planet = await PlanetModel.getPlanetById(id);
        if (!planet) {
            const err = new Error("Planet not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return planet;
    }

    static async createPlanet(planetData) {
        return await PlanetModel.createPlanet(planetData);
    }

    static async editPlanetById(id, planetData) {
        const exist = await PlanetModel.getPlanetById(id);
        if (!exist) {
            const err = new Error("Planet not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await PlanetModel.editPlanetById(id, planetData);
    }

    static async deletePlanetById(id) {
        const exist = await PlanetModel.getPlanetById(id);
        if (!exist) {
            const err = new Error("Planet not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await PlanetModel.deletePlanetById(id);
    }

}
