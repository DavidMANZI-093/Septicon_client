import BlankFeature from '@/components/blank-feature';
import { Layout } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Septicon - Preferences",
  description: "Built with Integrity!",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    url: "septicon.com", // To be set later!
    title: "Septicon",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack/Septicon - Logo.png" }]
  }
};

import React from 'react'

// type Props = {}

const Preferences = (/* props: Props */) => {
  return (
    <Layout>
      <div className='relative flex flex-col w-full h-full gap-2'>
        {/* {children} */}
        {/* <Loader /> */}
        <BlankFeature />
      </div>
    </Layout>
  )
}

export default Preferences