import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const starshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    starship_class: String,
    length: String,
    passengers: String,
    max_atmosphering_speed: String,
    hyperdrive_rating: String,
    MGLT: String,
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

starshipSchema.plugin(mongoosePaginate);

export default mongoose.model('Starship', starshipSchema);