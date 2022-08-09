import { ValidationError } from 'class-validator';

export const computeValidationErrors = (
    errors: ValidationError[],
    parentProperty = '',
) => {
    let messages = [];

    for (const error of errors) {
        if (error.constraints) {
            messages.push(
                ...Object.values(error.constraints).map(
                    (msg) => `${parentProperty}.${msg}`,
                ),
            );
        }

        if (error.children) {
            messages.push(
                ...computeValidationErrors(
                    error.children,
                    `${parentProperty ? `${parentProperty}.` : ''}${
                        error.property
                    }`,
                ),
            );
        }
    }

    return messages;
};
