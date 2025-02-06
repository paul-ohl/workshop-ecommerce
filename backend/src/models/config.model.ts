import mongoose, { Schema } from 'mongoose';

export const RefTypeSchema = new Schema({
  label: { type: String, required: true },
  // /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/gm.test(v);
  color: { type: String, required: false },
  pathToImg: { type: String, required: false },
  value: { type: Number, required: true },
  isDefault: { type: Boolean, default: false },
});

export const ConfigElementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  refs: { type: [RefTypeSchema], required: true },
  isMultiSelection: { type: Boolean, required: true },
  isBase: { type: Boolean, default: false },
});

export const ConfigSchema = new Schema({
  colorsConfigs: { type: [ConfigElementSchema], required: true },
  techConfigs: { type: [ConfigElementSchema], required: true },
});

const ConfigModel = mongoose.model('Config', ConfigSchema);

export default ConfigModel;
