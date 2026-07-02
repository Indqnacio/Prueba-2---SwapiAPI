import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const speciesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classification: String,
    designation: String,
    average_height: String,
    average_lifespan: String,
    eye_colors: String,
    hair_colors: String,
    skin_colors: String,
    language: String,

    // relaciones 
    homeworld: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }
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

speciesSchema.plugin(mongoosePaginate);

export default mongoose.model('Specie', speciesSchema);