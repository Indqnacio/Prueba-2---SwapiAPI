import Specie from '../schemas/specie.schema.js'

export class SpecieModel {

    static async getAllSpecies({ page = 1, limit = 10 }) {
        return await Specie.paginate({}, { page, limit });
    }

    static async getAllSpeciesSimple() {
        return await Specie.find().select(
            'name'
        );
    }

    static async getSpecieById(id) {
        return await Specie.findById(id);
    }

    static async createSpecie(specieData) {
        return await Specie.create(specieData);
    }

    static async editSpecieById(id, specieData) {
        return await Specie.findByIdAndUpdate(id, specieData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deleteSpecieById(id) {
        return await Specie.findByIdAndDelete(id);
    }

}