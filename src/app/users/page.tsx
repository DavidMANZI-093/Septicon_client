import BlankFeature from '@/components/blank-feature';
import { Layout } from '@/components/layout';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Septicon - Users",
  description: "Built with Integrity!",
  openGraph: {
    type: "website",
    url: "septicon.com", // To be set later!
    title: "Septicon",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack/Septicon - Logo.png" }]
  }
};

// type Props = {}

const Users = (/* props: Props */) => {
  return (
    <Layout>
      <div className='relative flex flex-col w-full h-full gap-2'>
        {/* {children} */}
        <BlankFeature />
      </div>
    </Layout>
  )
}

export default Users