/**
 * User State interface.
 */
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { User } from '../models/user.model';

export interface UserState extends EntityState<User>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});

export const initialUserState: UserState = userAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
