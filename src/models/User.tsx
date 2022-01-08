import {Pictures} from './Pictures'

export interface User {
    id: number;
    email: string,
    name: string,
    password: string,
    displayPicture: Pictures
}