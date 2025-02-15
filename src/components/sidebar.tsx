"use client";

import React from 'react'
import { SideBtn, Signout } from './ui/nui-button'
import { NavBox } from './navbox'
import useSidebar from '@/hooks/sidebarstate'

// type Props = {}

const Sidebar = (/* props: Props */) => {

  const { isOpen } = useSidebar();

  return (
    <div className={`${isOpen ? 'w-40' : 'gap-6 w-10'} pl-1 transition-all relative flex flex-col items-center  h-full bg-transparent bg-gradent`}>
      <SideBtn />
      <hr className={`${isOpen ? 'w-[90%] mt-2 mb-4 border-zinc-700' : 'w-[50%] border-zinc-700'} transition-all relative flex`} />
      <NavBox />
      <Signout />
    </div>
  )
}

export default Sidebar;