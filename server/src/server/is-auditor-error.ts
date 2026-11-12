import {
    InvalidJSONDateError,
    ValueNotInEnumError,
    NotOptionalError,
    InvalidTypeError,
    WrongLengthError,
} from 'audit-var';

// `audit-var` doesn't export its base `AuditorError` class, so
// every concrete validation error is listed here instead.
const auditorErrors = [
    InvalidJSONDateError,
    ValueNotInEnumError,
    NotOptionalError,
    InvalidTypeError,
    WrongLengthError,
];

/**
 * Checks if the given value is a validation error thrown by `audit-var`.
 */
export function isAuditorError(err: unknown): boolean {
    return auditorErrors.some(x => err instanceof x);
}
