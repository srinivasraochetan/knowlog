/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseConfigType } from '@shared/interfaces/generic.interface';
import { Observable } from 'rxjs';

declare const window: any;

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    http: HttpClient = inject(HttpClient);
    baseConfig!: BaseConfigType;

    Get(
        key: string,
        params?: any,
        options = {},
        smartSubstitution?: any
    ): Observable<any> {
        let url = this.resolveUrl(key);
        options = { ...options, params: params || {} };
        if (smartSubstitution) {
            url = this.updateSmartURL(url, smartSubstitution);
        }
        return this.http.get(url, options);
    }

    Put(key: string, params: any, options = {}): Observable<any> {
        const url = this.resolveUrl(key);
        return this.http.put(url, params || {}, options);
    }

    Post(
        key: string,
        params: any,
        options = {},
        smartSubstitution?: any
    ): Observable<any> {
        let url = this.resolveUrl(key);
        if (smartSubstitution) {
            url = this.updateSmartURL(url, smartSubstitution);
        }
        return this.http.post(url, params || {}, options);
    }

    Delete(
        key: string,
        params: any,
        options = {},
        smartSubstitution?: any,
        hasBody = false
    ): Observable<any> {
        debugger;
        let url = this.resolveUrl(key);
        if (smartSubstitution) {
            url = this.updateSmartURL(url, smartSubstitution);
        }
        return hasBody
            ? this.http.delete(url, { body: params })
            : this.http.delete(url, { params });
    }

    readBaseConfig() {
        return new Promise((resolve, reject) => {
            this.baseConfig = { ...window.__env };
            resolve(this.baseConfig);
        });
    }

    resolveUrl(key: string) {
        const pathObj = urlPath[key];
        let url = '';
        pathObj.resolve.forEach(item => {
            url += this.baseConfig[item];
        });
        url += pathObj.suffix;
        return url;
    }

    updateSmartURL(url: string, smartSubstitution: any) {
        return url.replace(
            /\{([a-zA-Z0-9]*)\}/g,
            (match, val) => smartSubstitution[val]
        );
    }
}

const urlPath: {
    [key: string]: { resolve: string[]; suffix: string };
} = {
    getCategories: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceGetCategories'],
        suffix: '',
    },
    addCategory: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceAddCategory'],
        suffix: '',
    },
    updateCategory: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceUpdateCategory'],
        suffix: '',
    },
    deleteCategory: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceDeleteCategory'],
        suffix: '',
    },
    getCategory: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceGetCategory'],
        suffix: '',
    },
    searchCategories: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceSearchCategories'],
        suffix: '',
    },

    getKnowledgeLogs: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceGetKnowledgeLogs'],
        suffix: '',
    },
    addKnowledgeLog: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceAddKnowledgeLog'],
        suffix: '',
    },
    updateKnowledgeLog: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceUpdateKnowledgeLog'],
        suffix: '',
    },
    deleteKnowledgeLog: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceGetKnowledgeLog'],
        suffix: '',
    },
    getKnowledgeLogsByCategory: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceGetLogsByCategory'],
        suffix: '',
    },
    searchKnowledgeLogs: {
        resolve: ['knowLogBaseAppAddress', 'webApiServiceSearchLogs'],
        suffix: '',
    },
    searchKnowledgeLogsWithCategory: {
        resolve: [
            'knowLogBaseAppAddress',
            'webApiServiceSearchLogsWithCategory',
        ],
        suffix: '',
    },
};
