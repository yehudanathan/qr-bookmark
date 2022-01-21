import {Pictures} from './Pictures'
import { AuthUser } from './AuthUser';

export interface User extends Omit<AuthUser, "password"> {
    id: number;
    name: string;
    displayPicture: Pictures
}