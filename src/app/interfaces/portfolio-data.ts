import { EducationInfo } from "./education-info";
import { Experience } from "./experience";
import { GeneralInfo } from "./general-info";

export interface PortfolioData {
    general: GeneralInfo,
    education: EducationInfo[],
    experiences: Experience[]
}
