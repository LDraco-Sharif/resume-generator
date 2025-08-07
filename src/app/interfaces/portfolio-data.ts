import { EducationInfo } from "./education-info";
import { GeneralInfo } from "./general-info";

export interface PortfolioData {
    general: GeneralInfo,
    education: EducationInfo[]
}
