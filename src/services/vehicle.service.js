import { VehicleModel } from "../models/vehicle.model.js";

export class VehicleService {
    static async getAllVehicles({ page, limit }) {
        return await VehicleModel.getAllVehicles({ page, limit });
    }

    static async getAllVehiclesSimple() {
        return await VehicleModel.getAllVehiclesSimple();
    }

    static async getVehicleById(id) {
        const vehicle = await VehicleModel.getVehicleById(id);
        if (!vehicle) {
            const err = new Error("Vehicle not found");
            err.code = "NOT FOUND";
            throw err;
        }
        return vehicle;
    }

    static async createVehicle(vehicleData) {
        return await VehicleModel.createVehicle(vehicleData);
    }

    static async editVehicleById(id, vehicleData) {
        const exist = await VehicleModel.getVehicleById(id);
        if (!exist) {
            const err = new Error("Vehicle not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await VehicleModel.editVehicleById(id, vehicleData);
    }

    static async deleteVehicleById(id) {
        const exist = await VehicleModel.getVehicleById(id);
        if (!exist) {
            const err = new Error("Vehicle not found");
            err.code = "NOT FOUND";
            throw err;
        }

        return await VehicleModel.deleteVehicleById(id);
    }

}
