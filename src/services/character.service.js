import { CharacterModel } from "../models/character.model.js";

export class CharacterService {
    static async getAllCharacters(filter, { page, limit }) {
        return await CharacterModel.getAllCharacters(filter, { page, limit });
    }

    static async getCharacterById(id) {
        const character = await CharacterModel.getCharacterById(id);
        if (!character) {
            const err = new Error("Character not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return character;
    }

    static async createCharacter(characterData) {
        return await CharacterModel.createCharacter(characterData);
    }

    static async editCharacterById(id, characterData) {
        const exist = await CharacterModel.getCharacterById(id);
        if (!exist) {
            const err = new Error("Character not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await CharacterModel.editCharacterById(id, characterData);
    }

    static async deleteCharacterById(id) {
        const exist = await CharacterModel.getCharacterById(id);
        if (!exist) {
            const err = new Error("Character not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await CharacterModel.deleteCharacterById(id);
    }

}
