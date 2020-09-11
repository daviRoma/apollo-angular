/**
 * User Model
 */
export class User {
  id?: number;
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  avatar?: any;
}

export class UserRequest {
  user_id?: number;
  filter?: string;
  page?: number;
  pag_size?: number;
  sortDirection?: string;
  sortField?: string;
}

export class UserResponse {
  data?: any;
  self?: string;
  links?: any;
  meta?: any;
}
