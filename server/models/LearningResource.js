
import mongoose from 'mongoose';

const LearningResourceSchema = new mongoose.Schema({
  title:{ type:String, required:true },
  type: { type:String, enum:['pdf','video'], required:true },
  url:  { type:String, required:true },
  description:String,
  published:{ type:Boolean, default:true }
},{timestamps:true});

export default mongoose.model('LearningResource', LearningResourceSchema);
