import { WebLink } from "./web-link";

export interface GeneralInfo {
    name: string,
    email?: string,
    phone?: string,
    about?: string,
    links: WebLink[]
}
