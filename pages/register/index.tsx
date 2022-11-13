import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useContext, useRef, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthenticationContext } from '../../contexts/Authentication';
import { SignUp } from '../../types';

const Login = () => {
    const {
        createUser,
    } = useContext(AuthenticationContext);
    const formRef = useRef<FormHandles>(null);

    const onFormSubmit = async ({ email, password, name }: SignUp) => {
        try {
            await createUser({
                email: email.toLowerCase(),
                password,
                name
            });
        } catch (error) {
            console.log(error);
        }
    };

    const t = (key: string) => key;

    return (
        <main>
            <Form
                ref={formRef}
                onSubmit={onFormSubmit}
                className="w-80 py-4 mx-auto"
            >
                <Input
                    label={t('email')}
                    name='email'
                    type='email'
                    autoComplete="email"
                />
                <Input
                    label={t('password')}
                    name='password'
                    type='password'
                    autoComplete="password"
                />
                <Input
                    label={t('name')}
                    name='name'
                    autoComplete="name"
                />

                <Button
                    type="submit"
                    className="w-80 my-4"
                >
                    {t('login.connect')}
                </Button>
            </Form>
        </main>
    );
}

export default Login;