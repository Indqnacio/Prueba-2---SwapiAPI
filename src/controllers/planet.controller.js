import mongoose from "mongoose";
import { PlanetService } from "../services/planet.service.js";

export class PlanetsController {
    static async getAllPlanets(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await PlanetService.getAllPlanets({ page, limit });
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getAllPlanetsSimple(req, res) {
        try {
            const data = await PlanetService.getAllPlanetsSimple();
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }


    static async getPlanetById(req, res) {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await PlanetService.getPlanetById(id);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err.code === "NOT FOUND") return res.status(404).json({ message: `Planet not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async createPlanet(req, res) {
        try {
            const data = await PlanetService.createPlanet(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({
                message: error.message
            })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async editPlanetById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await PlanetService.editPlanetById(id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({ message: error.message })
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Planet not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async deletePlanetById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            await PlanetService.deletePlanetById(id);
            return res.status(200).send({ id: id, message: `Planet with ID ${id} successfully deleted` });
        } catch (error) {
            console.error(error);
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Planet not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

}