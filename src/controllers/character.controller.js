import mongoose from "mongoose";
import { CharacterService } from "../services/character.service.js";

export class CharacterController {

    static async getAllCharacters(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;

            const filter = {};
            if (search) {
                filter.name = { $regex: RegExp.escape(search), $options: 'i' }
            }

            const data = await CharacterService.getAllCharacters(filter, { page, limit })

            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getCharacterById(req, res) {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await CharacterService.getCharacterById(id);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err.code === "NOT FOUND") return res.status(404).json({ message: `Character not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async createCharacter(req, res) {
        try {
            const data = await CharacterService.createCharacter(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({
                message: error.message
            })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async editCharacterById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await CharacterService.editCharacterById(id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({ message: error.message })
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Character not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async deleteCharacterById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            await CharacterService.deleteCharacterById(id);
            return res.status(200).send({ id: id, message: `Character with ID ${id} successfully deleted` });
        } catch (error) {
            console.error(error);
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Character not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}




