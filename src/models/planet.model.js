import Planet from '../schemas/planet.schema.js'

export class PlanetModel {

    static async getAllPlanets({ page = 1, limit = 10 }) {
        return await Planet.paginate({}, { page, limit });
    }

    static async getAllPlanetsSimple() {
        return await Planet.find().select('name');
    }

    static async getPlanetById(id) {
        return await Planet.findById(id);
    }

    static async createPlanet(planetData) {
        return await Planet.create(planetData);
    }

    static async editPlanetById(id, planetData) {
        return await Planet.findByIdAndUpdate(id, planetData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deletePlanetById(id) {
        return await Planet.findByIdAndDelete(id);
    }

}