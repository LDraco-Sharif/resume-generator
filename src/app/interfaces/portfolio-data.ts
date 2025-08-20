import { EducationInfo } from "./education-info";
import { Experience } from "./experience";
import { GeneralInfo } from "./general-info";
import { ProjectTech } from "./project-tech";

export interface PortfolioData {
    general: GeneralInfo,
    education: EducationInfo[],
    experiences: Experience[],
    projectTech: ProjectTech
}
