
import mongoose from 'mongoose';

const ClientContactSchema = new mongoose.Schema({
  userId: { type:String, required:true, index:true },
  name:   { type:String, required:true },
  email:  String,
  phone:  String,
  address:String,
  notes:  String
},{timestamps:true});

export default mongoose.model('ClientContact', ClientContactSchema);
