import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
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

filmSchema.plugin(mongoosePaginate);

export default mongoose.model('Film', filmSchema);