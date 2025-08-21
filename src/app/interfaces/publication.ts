export interface Publication {
    title: string,
    date?: Date
    authors: string[],
    doi: string,
    ignoreDate?: boolean,
    ignoreMonth?: boolean
}
