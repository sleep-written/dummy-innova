import { ComponentColor } from './component-color';
import { ModalIcon } from './modal-icon';

export interface ModalButton<T> {
    icon?: ModalIcon;
    text?: string;
    color?: ComponentColor;
    value: T;
}