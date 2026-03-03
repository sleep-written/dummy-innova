import { ComponentColor } from './component-color';
import { ModalButton } from './modal-button';
import { ModalIcon } from './modal-icon';

export interface ModalOptions<T> {
    icon?: ModalIcon;
    title?: string;
    color?: ComponentColor;
    disableClose?: boolean;
    content: string;
    buttons: ModalButton<T>[];
}