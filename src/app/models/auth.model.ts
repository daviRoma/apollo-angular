/**
 * Auth Model
 */
import { User } from './user.model';

export class Auth {
  token: string;
  role?: Role;
  user?: User;
}

export class Role {
  id: string;
  name?: string;
}
