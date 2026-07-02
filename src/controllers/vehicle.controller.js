import mongoose from "mongoose";
import { VehicleService } from "../services/vehicle.service.js"

export class VehicleController {
    static async getAllVehicles(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await VehicleService.getAllVehicles({ page, limit });
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getAllVehiclesSimple(req, res) {
        try {
            const data = await VehicleService.getAllVehiclesSimple();
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async getVehicleById(req, res) {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await VehicleService.getVehicleById(id);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err.code === "NOT FOUND") return res.status(404).json({ message: `Vehicle not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async createVehicle(req, res) {
        try {
            const data = await VehicleService.createVehicle(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({
                message: error.message
            })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async editVehicleById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            const data = await VehicleService.editVehicleById(id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            if (error.name === "ValidationError") return res.status(400).json({ message: error.message })
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Vehicle not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    static async deleteVehicleById(req, res) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format." })
        try {
            await VehicleService.deleteVehicleById(id);
            return res.status(200).send({ id: id, message: `Vehicle with ID ${id} successfully deleted` });
        } catch (error) {
            console.error(error);
            if (error.code === "NOT FOUND") return res.status(404).json({ message: `Vehicle not found by id: ${id}` })
            return res.status(500).json({ message: "Internal server error." })
        }
    }

}