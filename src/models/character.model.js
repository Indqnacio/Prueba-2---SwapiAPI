import Character from '../schemas/character.schema.js'

export class CharacterModel {

    static async getAllCharacters(filter, { page = 1, limit = 10 }) {
        return await Character.paginate(filter, { page, limit });
    }

    static async getCharacterById(id) {
        return await Character.findById(id);
    }

    static async createCharacter(characterData) {
        return await Character.create(characterData);
    }

    static async editCharacterById(id, characterData) {
        return await Character.findByIdAndUpdate(id, characterData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deleteCharacterById(id) {
        return await Character.findByIdAndDelete(id);
    }

}