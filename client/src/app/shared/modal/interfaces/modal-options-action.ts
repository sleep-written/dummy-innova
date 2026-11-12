import { ModalOptionsColor } from './modal-options-color';

export interface ModalOptionsAction<T> {
    text: string;
    icon?: string;
    color?: ModalOptionsColor;
    callback?: () => T;
}