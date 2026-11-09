import { Command } from '@bleed-believer/commander';
import { styleText } from 'node:util';

export const helpCommand = new Command({
    positionals: 'help',
    callback: () => new class {
        #normalizeDescription(description?: string): string {
            return (description ?? 'Description not provided').replace(/(?:\.\s*)?$/, '.');
        }

        async onInit(): Promise<void> {
            const { commander } = await import('../commander.ts');
            for (const { path, flags, description } of commander.docs()) {
                console.log(
                    styleText(
                        'underline',
                        [
                            styleText('bold', `Command`),
                            styleText('blueBright', path.join(' '))
                        ].join(' ')
                    )
                );

                console.log(this.#normalizeDescription(description));
                console.log('');

                if (flags.length > 0) {
                    console.log('flags:');
                }

                for (const { name, type, required, description } of flags) {
                    const text = [
                        styleText('blueBright', `--${name}`),
                        'as ' + styleText('yellow', `${type}`),
                    ];

                    if (required) {
                        text.push(styleText('red', `(required)`) + ':');
                    } else {
                        text.push(styleText('cyan', `(optional)`) + ':');
                    }

                    console.log(text.join(' '), this.#normalizeDescription(description));
                    console.log('');
                }

                console.log(styleText('gray', '---\n'));
            }
        }
    }
});