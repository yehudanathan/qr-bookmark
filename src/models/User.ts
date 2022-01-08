import {Pictures} from './Pictures'
import { AuthUser } from './AuthUser';

export interface User extends AuthUser {
    email: string;
    name: string;
    password: string;
    displayPicture: Pictures
}