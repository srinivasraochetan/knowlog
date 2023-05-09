export type Category =
    | 'angular'
    | 'typescript'
    | 'vue'
    | 'react'
    | 'blazer'
    | string;

export type CategoryLabel =
    | 'Angular'
    | 'TypeScript'
    | 'Vue'
    | 'Blazer'
    | 'React'
    | string;

export interface LogCategory {
    id: string;
    value: Category;
    label: CategoryLabel;
    selected: boolean;
}

export interface LogCategoryAPIResponse {
    id: number;
    name: string;
}
