import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  gameId: { type: Number, required: true },
  settings: { type: Object, default: {} }
}, { timestamps: true });

configSchema.index({ userId: 1, gameId: 1 }, { unique: true });

export default mongoose.model('GameConfig', configSchema);
