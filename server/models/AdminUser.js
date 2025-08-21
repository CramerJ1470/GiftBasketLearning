
import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
  fullName: { type:String, required:true },
  loginName:{ type:String, required:true, unique:true },
  email:    { type:String, required:true, unique:true },
  phoneNumber: String,
  address: String,
  password: { type:String, required:true },
  role: { type:String, default:'admin' }
},{timestamps:true});

export default mongoose.model('AdminUser', AdminUserSchema);
