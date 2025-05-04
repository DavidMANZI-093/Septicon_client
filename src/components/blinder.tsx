"use client";

import { useSessionContext } from '@/app/context/sessionContext';
import React from 'react';
import Image from 'next/image';
import { useSessionWatcher } from '@/hooks/watchDog';

const Blinder = ({ children }: { children: React.ReactNode }) => {

    const session = useSessionContext();
    const { isValid } = useSessionWatcher(session?.user);

    return (
        <>
            {session?.loading ? (
                <Image className='m-auto animate-pulse' fetchPriority='high' priority width={72} height={72} alt="Septicon's Logo" src={'/favicon pack/Septicon - Logo.webp'} />
            ) : isValid && session?.user ? (
                children
            ) : (
                <Image className='m-auto animate-pulse' fetchPriority='high' priority width={72} height={72} alt="Septicon's Logo" src={'/favicon pack/Septicon - Logo.webp'} />
            )}
        </>
    )
}

export default Blinder;