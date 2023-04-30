import { NavTab } from '../interfaces/generic.interface';

// app level nav tabs
export const appNavTabs: NavTab[] = [
    {
        id: 'logs',
        label: 'Logs',
        navUrl: '/logs',
        active: false,
        hidden: false,
        disabled: false,
        fontAwesomeIconClass: 'fa fa-layer-group',
    },
];

// page nav tabs can be added here
