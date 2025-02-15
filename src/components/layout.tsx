import React from 'react';
import Sidebar from './sidebar';
import { SidebarProvider } from '@/app/context/sidebarContext';
import CookieWrapper from './cookie-wrapper';
import Blinder from './blinder';
import Head from './ui/head';
import { HeaderProvider } from '@/app/context/headerContext';

export const Layout = ({ children }: {
  children: React.ReactNode
}) => {

  return (
    <main className="relative flex h-full w-full">
      <CookieWrapper>
        <Blinder>
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
          <div className='relative flex flex-col bg-transparent !w-full !h-full pl-2'>
            <HeaderProvider>
              <header className='relative flex w-full justify-between items-center py-2 px-4 min-h-12 h-12 bg-transparent'>
                <Head />
              </header>
              <div className='relative flex counter-header !max-w-[99.99%] !w-full !gap-2'>
                {children}
              </div>
            </HeaderProvider>
          </div>
        </Blinder>
      </CookieWrapper>
    </main>
  )
}