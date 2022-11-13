import React, { useContext } from 'react';

import Link from 'next/link';

import { AuthenticationContext } from '../../contexts/Authentication';
import Button from '../Button';
import Popover from '../Popover';
import styles from './styles.module.scss';

type Props = {
    children: React.ReactNode;
}

const ProfilePopoverContent = () => {
    const {
        logOut,
    } = useContext(AuthenticationContext);

    return (
        <div>
            <Button>
                {'User Profile'}
            </Button>
            <Button onClick={logOut}>
                {'Sign Out'}
            </Button>
        </div>
    );
};

const AuthenticatePopoverContent = () => {
    return (
        <div>
            <Link href={'/login'} passHref legacyBehavior>
                <Button>
                    {'Login'}
                </Button>
            </Link>
            <Link href={'/register'} passHref legacyBehavior>
                <Button>
                    {'Register'}
                </Button>
            </Link>
        </div>
    );
};

const ProfileButton = () => {
    const {
        user,
    } = useContext(AuthenticationContext);

    return (
        <Popover
            contentProps={{
                align: 'end',
            }}
            content={user
                ? <ProfilePopoverContent />
                : <AuthenticatePopoverContent />}
        >
            <button>
                {user
                    ? user?.profile?.nickname || user?.user?.email
                    : 'Login'}
            </button>
        </Popover>
    );
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>{'ProPet'}</h1>
                </div>
                <div className={styles.login}>
                    <ProfileButton />
                </div>
            </header>
            <main className={styles.content}>
                {children}
            </main>
            <footer className={styles.footer}>
                <span>{'ProPet © 2020'}</span>
                <span>{'Made with <3 by Lucas Pamplona'}</span>
            </footer>
        </div>
    );
};

export default Layout;
