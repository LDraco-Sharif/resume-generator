export interface Experience {
    company: string,
    location?: string,
    role: string,
    responsibilities: string[],
    startDate: Date | null,
    endDate?: Date | null,
    isCurrentlyIn: boolean;
    ignoreDate?: boolean;
    ignoreMonth?: boolean;
}
