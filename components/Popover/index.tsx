import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
    children: React.ReactNode;
    content: React.ReactNode;
    contentProps?: React.ComponentProps<typeof RadixPopover.Content>;
}

const Popover: React.FC<Props> = ({ children, content, contentProps, ...props }) => {
    const {
        className: contentClassNameProp,
        ...contentPropsRest
    } = contentProps || {};

    const contentClassNames = classNames(
        styles.PopoverContent,
        contentClassNameProp,
    );

    return (

        <RadixPopover.Root
            {...props}
        >
            <RadixPopover.Trigger asChild>
                {children}
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    className={contentClassNames}
                    sideOffset={5}
                    {...contentPropsRest}
                >
                    {content}
                    <RadixPopover.Close
                        className={styles.PopoverClose}
                        aria-label={'Close'}
                    >
                        <Cross2Icon />
                    </RadixPopover.Close>
                    <RadixPopover.Arrow
                        className={styles.PopoverArrow}
                    />
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
};

export default Popover;
