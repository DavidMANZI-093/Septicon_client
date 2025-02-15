import React from 'react';
import { ArrowDownUp, Boxes, ClipboardList, LayoutGrid, LucideIcon, SlidersHorizontal, Users2 } from "lucide-react";
import { randomBytes } from 'crypto';
import { LinkBtn } from './ui/nui-button';

// type Props = {}

type NavLinks = {
    label: string,
    href: string,
    icon: LucideIcon,
}

const links: NavLinks[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        label: 'Stores',
        href: '/stores',
        icon: Boxes,
    },
    {
        label: 'Transactions',
        href: '/transactions',
        icon: ArrowDownUp
    },
    {
        label: 'Logs',
        href: '/logs',
        icon: ClipboardList
    },
    {
        label: 'Users',
        href: '/users',
        icon: Users2,
    },
    {
        label: 'Preferences',
        href: '/preferences',
        icon: SlidersHorizontal
    }
];

export const NavBox = (/* props: Props */) => {
  return (
    <div className='relative w-full flex flex-col gap-2'>
        {links.map((link) => {
            return <LinkBtn label={link.label} href={link.href} icon={<link.icon className='!p-0' width={18} height={18} />} key={randomBytes(6).toString('hex')} />
        })}
    </div>
  )
}