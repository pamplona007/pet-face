import { forwardRef } from 'react';

import classNames from 'classnames';

type Props = {
    secondary?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    role?: string;
};

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const {
        secondary,
        children,
        className,
        ...other
    } = props;

    const buttonStyle = classNames(
        'button',
        {
            '-secondary': secondary,
        },
        className,
    );

    return (
        <button
            className={buttonStyle}
            ref={ref}
            {...other}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
