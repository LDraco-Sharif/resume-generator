import { Tech } from "./tech";
import { Project } from "./project";

export interface ProjectTech {
    projects: Project[],
    tech: Tech
}
