import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { Auditor } from 'audit-var';

import { EndpointError } from './endpoint.error.ts';
import { isAuditorError } from './is-auditor-error.ts';

describe('isAuditorError function', () => {
    const auditor = new Auditor({
        type: 'object',
        keys: {
            text: { type: 'string', min: 3, max: 8 },
            kind: { type: 'enum', values: [ 'a', 'b' ] },
        }
    });

    const catchError = (input: unknown): unknown => {
        try {
            auditor.audit(input);
        } catch (err) {
            return err;
        }
    };

    it('should detect a wrong length error', () => {
        const err = catchError({ text: 'ab', kind: 'a' });
        strictEqual(isAuditorError(err), true);
    });

    it('should detect an invalid type error', () => {
        const err = catchError({ text: 1234, kind: 'a' });
        strictEqual(isAuditorError(err), true);
    });

    it('should detect a not optional error', () => {
        const err = catchError(undefined);
        strictEqual(isAuditorError(err), true);
    });

    it('should detect a value not in enum error', () => {
        const err = catchError({ text: 'abcd', kind: 'z' });
        strictEqual(isAuditorError(err), true);
    });

    it('should reject other errors', () => {
        strictEqual(isAuditorError(new Error('generic')), false);
        strictEqual(isAuditorError(new EndpointError(409, 'conflict')), false);
    });

    it('should reject non error values', () => {
        strictEqual(isAuditorError('error'), false);
        strictEqual(isAuditorError(undefined), false);
    });
});
