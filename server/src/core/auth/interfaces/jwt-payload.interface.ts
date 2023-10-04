import { UserRole } from 'src/modules/user/user.entity';

export interface JwtPayload {
  uuid: string;
  username: string;
  role?: UserRole;
}
