import { useContext, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthenticationContext } from '../../contexts/Authentication';
import { LogIn } from '../../types';

const Login = () => {
    const {
        logIn,
    } = useContext(AuthenticationContext);
    const formRef = useRef<FormHandles>(null);

    const onFormSubmit = ({ email, password }: LogIn) => {
        logIn({
            email: email.toLowerCase(),
            password: password,
        });
    };

    const t = (key: string) => key;

    return (
        <main>
            <Form
                ref={formRef}
                onSubmit={onFormSubmit}
                className={'w-80 py-4 mx-auto'}
            >
                <Input
                    label={t('email')}
                    name={'email'}
                    type={'email'}
                    autoComplete={'email'}
                />
                <Input
                    label={t('password')}
                    name={'password'}
                    type={'password'}
                    autoComplete={'password'}
                />

                <Button
                    type={'submit'}
                    className={'w-80 my-4'}
                >
                    {t('login.connect')}
                </Button>
            </Form>
        </main>
    );
};

export default Login;
