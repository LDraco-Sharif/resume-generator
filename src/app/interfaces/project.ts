import { WebLink } from "./web-link";

export interface Project {
    name: string,
    techs: string[]
    descriptions: string[],
    links: WebLink[]
}
