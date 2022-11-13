import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import classNames from 'classnames';

type Props = {
    label?: string;
    name: string;
    type?: string;
    labelClassName?: string;
    bordered?: boolean;
    secondary?: boolean;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: string;
    wrapperClassName?: string;
    className?: string;
    autoComplete?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = (props) => {
    const {
        label,
        type = 'text',
        labelClassName,
        wrapperClassName,
        className,
        bordered,
        secondary,
        name,
        required,
        ...other
    } = props;

    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const inputStyles = classNames(
        'input',
        {
            '-primary': !secondary,
            '-error': error,
        },
        className
    );

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: (ref) => {
                return ref.current.value;
            },
            setValue: (ref, value) => {
                ref.current.value = value;
            },
            clearValue: (ref) => {
                ref.current.value = '';
            },
        });
    }, [fieldName, registerField]);

    return (
        <div className={classNames('form-control', wrapperClassName)}>
            <label>
                {label && (
                    <div
                        className={classNames(
                            'label-text',
                            {
                                'required': required,
                            },
                            labelClassName
                        )}
                    >
                        {label}
                    </div>
                )}
                <input
                    type={type}
                    ref={inputRef}
                    className={inputStyles}
                    defaultValue={defaultValue}
                    {...other}
                />
                {error && <p className='error'>{error}</p>}
            </label>
        </div>
    );
};

export default Input;