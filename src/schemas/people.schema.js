import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const peopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birth_year: Date,
    eye_color: String,
    gender: String,
    hair_color: String,
    height: String,
    mass: String,
    skin_color: String,

    // relaciones 
    films: [String],
    homeworld: String,
    species: [String],
    starships: [String],
    vehicles: [String]

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

peopleSchema.plugin(mongoosePaginate);

export default mongoose.model('People', peopleSchema);