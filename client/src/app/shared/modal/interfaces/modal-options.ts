import { ModalOptionsType } from './modal-options-type';
import { ModalOptionsAction } from './modal-options-action';

export interface ModalOptions<T> {
    type: ModalOptionsType;
    message: string;
    actions: ModalOptionsAction<T>[];
}