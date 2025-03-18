"use client";

import useCurrentRoute from '@/hooks/currentroute';
import { Platform } from '@/types';
import { Box, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
    platform: Platform;
}

const ListItem = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const { router } = useCurrentRoute();

    return (
        <li className={`relative ${router == props.platform.href ? 'bg-zinc-800' : 'bg-transparent '} flex flex-col justify-center transition-all w-full h-fit rounded-sm cursor-pointer hover:bg-zinc-800 active:scale-95`}>
            <span className={`absolute -left-0.5 top-2.5 h-3 w-1 transition-all ${router == props.platform.href ? 'flex' : 'hidden'} rounded-lg btn-gradient2`}></span>
            <div className='relative flex w-full h-full transition-all text-zinc-500 overflow-hidden items-center justify-between'>
                <Link href={props.platform.href} className='relative h-full w-full flex p-2 transition-all items-center gap-2'>
                    <Box className='relative flex transition-all' width={16} height={16} />
                    <h3 className='relative flex transition-all text-xs font-medium'>{props.platform.name} Store</h3>
                </Link>
                <ChevronDown onClick={() => { setIsOpen(!isOpen) }} className={`${isOpen ? 'rotate-0' : '-rotate-90'} relative m-2 flex transition-all`} width={16} height={16} />
            </div>
            <p className={`${isOpen ? 'p-2 pl-3 pt-0.5' : 'p-0 h-0 max-h-0 overflow-hidden'} relative flex w-full transition-all text-xs bg-zinc-900 text-zinc-500`}>
                {props.platform.description}
            </p>
        </li>
    );
}

export default ListItem