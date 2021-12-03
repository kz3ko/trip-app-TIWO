import { UserDocument } from '../models/user';
import Permission from '../models/permissions';

// eslint-disable-next-line import/prefer-default-export
export const isAdmin = async (user: UserDocument): Promise<boolean> => {
  const permissions = await Permission.find({ username: user.username });
  if (permissions.length) {
    return permissions.some((permission) => permission.accessLevel === 'admin');
  }
  return false;
};
