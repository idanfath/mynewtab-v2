
export type BookMark = {
    title: string;
    url: string;
    description?: string;
    customIconUrl?: string; // Optional custom icon URL
};

export interface BookMarks {
    [key: string]: BookMark[];
}
