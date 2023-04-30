import { Injectable } from '@angular/core';
import { NavTab } from '@shared/interfaces/generic.interface';

@Injectable()
export class NavTabService {
    toggleActive(activeTab: NavTab, tabs: NavTab[] = []): NavTab[] {
        return tabs.reduce((tabAccum: NavTab[], tab: NavTab) => {
            tab.active = activeTab.id === tab.id;
            tabAccum.push(tab);
            return tabAccum;
        }, []);
    }

    inactivateAllTabs(tabs: NavTab[] = []): NavTab[] {
        return tabs.reduce((tabAccum: NavTab[], tab: NavTab) => {
            tab.active = false;
            tabAccum.push(tab);
            return tabAccum;
        }, []);
    }
}
