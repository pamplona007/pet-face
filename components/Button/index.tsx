import classNames from 'classnames';

type Props = {
    secondary?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({
    secondary,
    children,
    className,
    ...other
}) => {
    const buttonStyle = classNames(
        'button',
        {
            '-secondary': secondary,
        },
        className
    );

    return (
        <button
            className={buttonStyle}
            {...other}
        >
            {children}
        </button>
    );
};

export default Button;