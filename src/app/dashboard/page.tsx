import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Septicon - Dashboard",
  description: "Built with Integrity!",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    url: "septicon.com", // To be set later!
    title: "Septicon",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack Septicon Logo.png" }]
  }
};

import React from 'react';
import SwapyBox from './components/swapy-container';
import { Layout } from '@/components/layout';
import BlankFeature from '@/components/blank-feature';

// type Props = {}

const Dashboard = (/* props: Props, children: React.ReactNode */) => {

  return (
    <Layout>
      <div className='relative flex flex-col w-full h-full gap-2 px-0.5 overflow-y-auto'>
        {/* {children} */}
        <SwapyBox />
        <div className='absolute w-full h-full bg-transparent z-10 rounded-sm backdrop-brightness-75 backdrop-blur-[1px] transition-all duration-1000'>
          <BlankFeature />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard;