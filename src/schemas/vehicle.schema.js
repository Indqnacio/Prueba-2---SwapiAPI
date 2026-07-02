import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    vehicle_class: String,
    length: String,
    passengers: String,
    max_atmosphering_speed: String,
    cargo_capacity: String,
    consumables: String
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
            return ret;
        }
    }
})

vehicleSchema.plugin(mongoosePaginate);

export default mongoose.model('Vehicle', vehicleSchema);