"use client";

import { UserRound, LucideLockKeyhole, KeyRound, Eye, EyeOff, ShieldAlert, ServerCog } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/nui-button'
import useShowPass from '@/hooks/passhider';
import useRunSpinner from '@/hooks/spinrunner';
import { signIn } from '@/app/api/auth/customauth/authController';
import { redirect } from 'next/navigation';
import { notify } from '@/services/notificationService';

// type Props = {}

const Auth = (/* props: Props */) => {

    const { isVisible, toggleVisibility } = useShowPass();
    const { isSpinning, toggleSpinner } = useRunSpinner();

    const [{ username, password }, setCredentials] = useState({ username: '', password: '' });
    if (typeof window !== 'undefined') sessionStorage?.removeItem('welcomeMsgShown');

    const onSubmit = async () => {
        username.trim();
        password.trim();
        const result = await signIn({ username, password });

        if (result?.status === 200) {
            setCredentials({ username: '', password: '' });
            redirect(`/dashboard`);
        } else {
            toggleSpinner(false);
            setCredentials({ username: '', password: '' });
            (document.getElementById('username') as HTMLInputElement)!.value = '';
            (document.getElementById('password') as HTMLInputElement)!.value = '';
            if (result?.status === 401) {
                notify({ title: "Authentication Error", message: "Unauthorized credentials.", icon: ShieldAlert, iconColor: "text-red-600", barColor: "bg-red-600" });
            } else if (result?.status === 500) {
                notify({ title: "Server Error", message: "Internal server error. Please try again!", icon: ServerCog, iconColor: "text-blue-600", barColor: "bg-blue-600" });

            }
        }
    };

    return (
        <>
            <div className='relative flex w-full gap-2 items-center'>
                <hr className='relative w-full border-zinc-600' />
                <span><LucideLockKeyhole width={20} height={20} className='text-zinc-500' /></span>
                <hr className='relative w-full border-zinc-600' />
            </div>
            <h3 className='mb-2 text-sm text-zinc-400'>Provide your credentials.</h3>
            <form className='flex flex-col gap-8 items-center' action="" method="post">
                <fieldset className='flex gap-2 items-center'>
                    <label htmlFor="username"><UserRound className='text-zinc-500' height={20} width={20} /></label>
                    <input onChange={(e) => setCredentials({ username: e.target.value, password: password })} id='username' className='bg-transparent input-field' aria-autocomplete='none' type="text" placeholder='Username' />
                </fieldset>
                <fieldset className='relative flex gap-2 items-center'>
                    <label htmlFor="password"><KeyRound className='text-zinc-500' height={20} width={20} /></label>
                    <input onChange={(e) => setCredentials({ username: username, password: e.target.value })} id="password" className='bg-transparent input-field' type={isVisible ? 'text' : 'password'} placeholder='Password' />
                    <span onClick={() => toggleVisibility()} className='cursor-pointer absolute right-2'>{isVisible ? <Eye className='text-zinc-500' width={16} height={16} /> : <EyeOff className='text-zinc-500' width={16} height={16} />}</span>
                </fieldset>
                <Button disabeled={!username || !password ? true : false} spinner={isSpinning} onClick={(e) => {
                    e.preventDefault();
                    try {
                        onSubmit();
                    } catch (error) {
                        console.log(error);
                    } finally {
                        toggleSpinner(true);
                    }
                }} value="Sign in" />
            </form>
            <span className='text-zinc-500 text-xs mt-4'>Septicon &copy; {new Date().getFullYear()} | All rights reserved.</span>
        </>
    )
}

export default Auth