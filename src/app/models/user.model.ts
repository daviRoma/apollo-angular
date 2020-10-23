import { ApolloResponse } from './apollo-response.model';
import { Icon } from './icon.model';

/**
 * User Model
 */
export class User {
  id?: number;
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  avatar?: Icon;
}

export class RegistrationRequest {
  username: string;
  password: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

export class UserRequest {
  user_id?: number;
  filter?: string;
  page?: number;
  pag_size?: number;
  sortDirection?: string;
  sortField?: string;
}

export class UserResponse extends ApolloResponse {}
