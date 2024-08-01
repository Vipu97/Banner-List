import mongoose, { Schema, Document, Model } from 'mongoose';

export interface BannerSchema extends Document {
    id: number,
    title: string,
    description: string,
    cta: string,
    image: string,
    background: string,
}

const BannerSchema: Schema<BannerSchema> = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
    image: { type: String, required: true },
    background: { type: String, required: true },
});

const Banner: Model<BannerSchema> = mongoose.models.Banner || mongoose.model<BannerSchema>('Banner', BannerSchema);

export default Banner;
