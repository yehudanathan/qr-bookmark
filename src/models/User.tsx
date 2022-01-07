import {Pictures} from './Pictures'

export interface User {
    email: string,
    name: string,
    password: string,
    displayPicture: Pictures
}