import { SpecieModel } from "../models/specie.model.js";

export class SpecieService {
    static async getAllSpecies({ page, limit }) {
        return await SpecieModel.getAllSpecies({ page, limit });
    }

    static async getAllSpeciesSimple() {
        return await SpecieModel.getAllSpeciesSimple();
    }

    static async getSpecieById(id) {
        const specie = await SpecieModel.getSpecieById(id);
        if (!specie) {
            const err = new Error("Specie not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return specie;
    }

    static async createSpecie(specieData) {
        return await SpecieModel.createSpecie(specieData);
    }

    static async editSpecieById(id, specieData) {
        const exist = await SpecieModel.getSpecieById(id);
        if (!exist) {
            const err = new Error("Specie not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await SpecieModel.editSpecieById(id, specieData);
    }

    static async deleteSpecieById(id) {
        const exist = await SpecieModel.getSpecieById(id);
        if (!exist) {
            const err = new Error("Specie not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await SpecieModel.deleteSpecieById(id);
    }

}
