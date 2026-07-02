import Vehicle from '../schemas/vehicle.schema.js'

export class VehicleModel {

    static async getAllVehicles({ page = 1, limit = 10 }) {
        return await Vehicle.paginate({}, { page, limit });
    }

    static async getAllVehiclesSimple() {
        return await Vehicle.find().select('name');
    }

    static async getVehicleById(id) {
        return await Vehicle.findById(id);
    }

    static async createVehicle(vehicleData) {
        return await Vehicle.create(vehicleData);
    }

    static async editVehicleById(id, vehicleData) {
        return await Vehicle.findByIdAndUpdate(id, vehicleData, {
            returnDocument: "after",
            runValidators: true
        });
    }

    static async deleteVehicleById(id) {
        return await Vehicle.findByIdAndDelete(id);
    }

}