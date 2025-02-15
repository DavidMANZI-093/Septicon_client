"use client";

import React from 'react';
// import { ThemeToggle } from './button';
import useCurrentRoute from '@/hooks/currentroute';
import { useSessionContext } from '@/app/context/sessionContext';
import { Box, ChevronRight } from 'lucide-react';
import useHeader from '@/hooks/headerstate';

// type Props = {}

const Head = (/* props: Props */) => {

    const currentRoute = useCurrentRoute();
    const session = useSessionContext();
    const { nextCrumb } = useHeader();

    return (
        <>
            {!nextCrumb ? <h1 className='text-zinc-500 text-lg font-semibold'>{`${currentRoute.currentRoute}`}</h1> :
                <div className='relative flex w-full h-full gap-1'>
                    <h1 className='text-zinc-500 text-lg font-semibold'>{`${currentRoute.currentRoute}`}</h1>
                    <ChevronRight className='relative flex text-zinc-500 my-auto' width={16} height={16} />
                    <div className='relative flex w-fit h-fit gap-2 text-zinc-500 my-auto items-center'>
                        <Box className='' height={16} width={16} />
                        <h1 className='text-sm font-medium'>{nextCrumb}</h1>
                    </div>
                </div>
            }
            {/* <ThemeToggle /> */}
            <h3 className='text-zinc-500 text-sm font-medium text-nowrap'>{`${session!.user!.rank}. ${(session!.user!.fullName!.split(' '))[1]} - ${session?.user?.stationName}`}</h3>
        </>
    )
}

export default Head;