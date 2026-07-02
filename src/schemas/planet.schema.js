import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    diameter: String,
    rotation_period: String,
    orbital_period: String,
    gravity: String,
    population: String,
    climate: String,
    terrain: String,
    surface_water: String,
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

planetSchema.plugin(mongoosePaginate);

export default mongoose.model('Planet', planetSchema);