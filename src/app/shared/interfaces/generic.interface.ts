export interface NavTab {
    id: string;
    label: string;
    navUrl: string;
    active: boolean;
    disabled: boolean;
    hidden: boolean;
    fontAwesomeIconClass?: string;
}

export type AlertType =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

export interface BaseConfigType {
    [key: string]: string;
}
