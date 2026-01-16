import { EducationScoreType } from "../enums/education-score-type";

export interface EducationInfo {
    institutionName: string,
    subject?: string,
    ignoreScoring: boolean,
    scoreType: EducationScoreType | string,
    score: number,
    totalScore: number,
    institutionPlaceholder?: string,
    subjectPlaceholder?: string,
    startDate: Date | null,
    endDate?: Date | null,
    isCurrentlyIn: boolean;
    ignoreDate?: boolean;
    ignoreMonth?: boolean;
}
