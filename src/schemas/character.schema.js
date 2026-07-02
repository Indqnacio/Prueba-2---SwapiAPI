import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birth_year: String,
    eye_color: String,
    gender: String,
    hair_color: String,
    height: String,
    mass: String,
    skin_color: String,

    // relaciones 
    films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
    homeworld: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' },
    species: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specie' }],
    starships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]

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

characterSchema.plugin(mongoosePaginate);

export default mongoose.model('Character', characterSchema);