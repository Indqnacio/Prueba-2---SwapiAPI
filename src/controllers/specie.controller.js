import mongoose from "mongoose";
import { SpecieService } from "../services/specie.service.js"

export class SpeciesController {
    static async getAllSpecies(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await SpecieService.getAllSpecies({ page, limit });
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getAllSpeciesSimple(req, res) {
        try {
            const data = await SpecieService.getAllSpeciesSimple();
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getSpecieById(req, res) {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await SpecieService.getSpecieById(id);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err.code === "NOT FOUND") return res.status(404).json({ message: `Specie not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async createSpecie(req, res) {
        try {
            const data = await SpecieService.createSpecie(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({
                message: error.message
            })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async editSpecieById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await SpecieService.editSpecieById(id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({ message: error.message })
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Specie not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async deleteSpecieById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            await SpecieService.deleteSpecieById(id);
            return res.status(200).send({ id: id, message: `Specie with ID ${id} successfully deleted` });
        } catch (error) {
            console.error(error);
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Specie not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

}