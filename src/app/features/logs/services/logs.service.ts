import { Injectable } from '@angular/core';
import { Category, LogCategory } from '@logs/interfaces/logs.interface';

@Injectable()
export class LogsService {
    toggleSelectedCategory(
        selectedCategory: Category,
        logCategories: LogCategory[] = []
    ): LogCategory[] {
        return logCategories.reduce(
            (categoryAccum: LogCategory[], category: LogCategory) => {
                category.selected = category.value === selectedCategory;
                categoryAccum.push(category);
                return categoryAccum;
            },
            []
        );
    }

    getCategoryPathNameFromUrl(url: string): string {
        return url.split('/').filter(value => value.includes('Category'))[0];
    }

    getCategoryFromPathName(path: string): Category {
        return path.replace('Category', '') as Category;
    }
}
