"use client";

import { ChevronDown, LockKeyhole, LockKeyholeOpen, Moon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import useCurrentRoute from '@/hooks/currentroute';
import useSidebar from '@/hooks/sidebarstate';

type ButtonProps = {
    spinner: boolean,
    value: string,
    disabeled?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

export const Button = (props: ButtonProps) => {
    return (
        <button disabled={props.disabeled} className={`h-9 w-28 ${props.disabeled ? 'text-zinc-400 bg-indigo-900' : 'text-zinc-300 bg-indigo-800'} cursor-pointer rounded-sm font-medium transition-all shadow-md shadow-zinc-950 ${props.spinner || props.disabeled ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-zinc-950'}`} onClick={props.onClick}>
            {props.spinner ? <span className='flex m-auto w-4 h-4 border-2 border-indigo-600 border-l-indigo-400 rounded-full animate-spin'></span> :
                props.value
            }
        </button>
    )
}

export const Button2 = (props: ButtonProps) => {
    return (
        <button disabled={props.disabeled} className={`h-8 w-24 ${props.disabeled ? 'text-zinc-400 bg-indigo-900' : 'text-zinc-400 bg-indigo-800'} rounded-sm text-sm font-medium transition-all shadow-md shadow-zinc-950 ${props.spinner || props.disabeled ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-zinc-950 cursor-pointer'}`} onClick={props.onClick}>
            {props.spinner ? <span className='flex m-auto w-4 h-4 border-2 border-indigo-600 border-l-indigo-400 rounded-full animate-spin'></span> :
                props.value
            }
        </button>
    )
}

// type SideBtnProps = {}

export const SideBtn = (/* props: SideBtnProps */) => {

    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <>
            <div className={`${isOpen ? 'opacity-100 pointer-events-auto flex' : 'opacity-0 pointer-events-none hidden'} relative flex w-full items-center justify-between`}>
                <span className='items-center flex gap-1.5'>
                    <Image priority={true} width={36} height={36} alt="Septicon's Logo" src={'/favicon pack/Septicon - Logo.png'} />
                    <h2 className='text-zinc-500 font-medium text-sm'>Septicon</h2>
                </span>
                <button onClick={() => toggleSidebar()} className={`relative flex h-6 w-6 mr-2 justify-center items-center transition-all cursor-pointer rounded-md text-zinc-500 hover:text-zinc-400 bg-transparent`}>
                    <ChevronDown className='' width={18} height={18} />
                </button>
            </div>
            <button onClick={() => toggleSidebar()} className={`${!isOpen ? 'opacity-100 pointer-events-auto flex cursor-pointer' : 'opacity-0 pointer-events-none hidden'} relative flex flex-col items-center py-0.5 transition-all gap-0.5 rounded-md text-zinc-500 hover:text-zinc-400 bg-transparent hover:bg-zinc-800 active:scale-95`}>
                <Image priority={true} width={36} height={36} alt="Septicon's Logo" src={'/favicon pack/Septicon - Logo.png'} />
                <ChevronDown className='' width={18} height={18} />
            </button>
        </>
    )
}

type LinkBtnProps = {
    icon: React.ReactNode,
    href: string,
    label: string,
}

export const LinkBtn = (props: LinkBtnProps) => {

    const { currentRoute } = useCurrentRoute();
    const [showLabel, setShowLabel] = useState(false);
    const { isOpen } = useSidebar();

    return (
        <button className={`${isOpen ? 'rounded-md active:scale-95' : 'justify-center py-[0.425rem] rounded-md active:scale-90'} justify-center items-center transition-all relative ${currentRoute === props.label ? 'text-zinc-400 btn-gradient3' : 'text-zinc-500 hover:text-zinc-400'} flex items-center transition-all btn-gradient4`} onMouseEnter={() => { setShowLabel(true) }} onMouseLeave={() => { setShowLabel(false) }} onClick={() => { setShowLabel(false) }}>
            <Link className={`${isOpen ? 'px-2 py-1 gap-2' : 'flex-col'} transition-none w-full h-full relative flex gap-1 items-center`} href={props.href}>
                {props.icon}
                <span className={`absolute ${isOpen ? '-left-0.5 h-3 w-1' : 'justify-center items-center bottom-[-0.54rem] h-1 w-3'} transition-all ${currentRoute === props.label ? 'flex' : 'hidden'} rounded-lg btn-gradient2`}></span>
                <span className={`${isOpen ? '' : 'hidden'} overflow-hidden font-medium text-sm`}>{props.label}</span>
            </Link>
            <span className={`${isOpen ? 'hidden' : 'flex'} z-100 transition-all absolute ${showLabel ? 'opacity-100 pointer-events-auto transition-all delay-1000' : 'opacity-0 pointer-events-none duration-100'} left-11 px-1 py-0.5 rounded-sm text-xs bg-zinc-900 border border-zinc-800 text-zinc-500 shadow-md shadow-zinc-950`}>{props.label}</span>
        </button>
    )
}

// type ThemeToggleProps = {}

export const ThemeToggle = (/* props: ThemeToggleProps */) => {

    return (
        <button className='relative flex transition-all bg-zinc-100 text-zinc-500 justify-center items-center rounded-md active:scale-90 h-8 w-8 shadow-sm shadow-zinc-400 hover:text-zinc-600 hover:shadow-md hover:shadow-zinc-400'>
            <Moon className='transition-all' width={22} height={22} />
        </button>
    )

}

import { useSessionContext } from '@/app/context/sessionContext';
import { useSessionWatcher } from '@/hooks/watchDog';
import { killSession } from '@/services/killSwitch';

export const Signout = () => {

    const session = useSessionContext();
    const { isOpen } = useSidebar();
    const [showLabel, setShowLabel] = useState(false);
    const { /*countDown, */ timeLeftPrcnt } = useSessionWatcher(session?.user);

    return (
        <div className='transition-all absolute gap-4 bottom-0 flex w-full'>
            <button onClick={() => { killSession(session?.user) }} className={`${isOpen ? 'gap-2' : 'gap-0'} bg-transparent p-1 active:scale-95 relative justify-center flex w-fit`} onMouseEnter={() => { setShowLabel(true) }} onMouseLeave={() => { setShowLabel(false) }}>
                <div className={`flex justify-center rounded-full bg-transparent w-6 relative transition-all text-indigo-500 items-center h-6`}>
                    <div className='flex justify-center rounded-full w-6 relative transition-all bg-transparent items-center h-6'

                        style={{
                            background: `conic-gradient(
                                #4f46e5 ${timeLeftPrcnt}%,
                                #27272a ${timeLeftPrcnt}%
                            )`,
                            transition: "background 0.5s ease-in-out",
                        }}

                    >
                        <div className='flex justify-center rounded-full w-5 relative transition-all bg-zinc-900 items-center h-5'>
                            {(session?.user?.exp ?
                                <LockKeyhole className='transition-all m-auto' width={12} height={12} /> :
                                <LockKeyholeOpen className='transition-all m-auto' width={12} height={12} />
                            )}
                        </div>
                    </div>
                </div>
                <p className={`${isOpen ? 'w-fit' : 'max-w-0'} flex text-nowrap overflow-hidden my-auto text-xs text-zinc-500 hover:text-indigo-500 transition-all`}>{`Session life - ${timeLeftPrcnt}%`}</p>
                <span className={`${isOpen ? 'hidden' : 'flex'} z-100 transition-all absolute ${showLabel ? 'opacity-100 pointer-events-auto transition-all delay-1000' : 'opacity-0 pointer-events-none duration-100'} text-nowrap -top-6 left-4 px-1 py-0.5 rounded-sm text-xs bg-zinc-900 border border-zinc-800 text-zinc-500 shadow-md shadow-zinc-950`}>{`Session life - ${timeLeftPrcnt}%`}</span>
            </button>
        </div>
    );
}