import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  username: String,
  accessLevel: String,
});

interface PermissionDocument extends mongoose.Document {
  username: string,
  accessLevel: string,
}

export default mongoose.model<PermissionDocument>('Permission', permissionSchema);
