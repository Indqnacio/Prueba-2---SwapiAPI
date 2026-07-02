import mongoose from "mongoose";
import { StarshipService } from "../services/starship.service.js"

export class StarshipsController {
    static async getAllStarships(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await StarshipService.getAllStarships({ page, limit })
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getAllStarshipsSimple(req, res) {
        try {
            const data = await StarshipService.getAllStarshipsSimple()
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getStarshipById(req, res) {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await StarshipService.getStarshipById(id);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err.code === "NOT FOUND") return res.status(404).json({ message: `Starship not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async createStarship(req, res) {
        try {
            const data = await StarshipService.createStarship(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({
                message: error.message
            })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async editStarshipById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await StarshipService.editStarshipById(id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({ message: error.message })
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Starship not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async deleteStarshipById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            await StarshipService.deleteStarshipById(id);
            return res.status(200).send({ id: id, message: `Starship with ID ${id} successfully deleted` });
        } catch (error) {
            console.error(error);
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Starship not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

}