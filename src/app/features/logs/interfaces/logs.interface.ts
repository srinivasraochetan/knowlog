export type Category = 'angular' | 'typescript';

export type CategoryLabel = 'Angular' | 'TypeScript';

export interface LogCategory {
    id: string;
    value: Category;
    label: CategoryLabel;
    selected: boolean;
}
