import { FieldTree } from '@angular/forms/signals';

const sanitizeUsername = (value: string) => value
    .toLowerCase()
    .replace(/[^0-9a-z\-_]/g, '');

export function onUsernameInput(event: Event, form: FieldTree<{ username: string; }>) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const sanitized = sanitizeUsername(value);
    if (sanitized === value) return;

    // Keep the caret where the user was typing, minus the removed chars.
    const caret = sanitizeUsername(value.slice(0, input.selectionStart ?? value.length)).length;
    input.value = sanitized;
    input.setSelectionRange(caret, caret);

    form
        .username()
        .value.set(sanitized);
}