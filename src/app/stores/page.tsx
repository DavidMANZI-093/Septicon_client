import { Metadata } from 'next';

import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Septicon - Stores",
  description: "Built with Integrity!",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    url: "septicon.com",
    title: "Septicon",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack/Septicon - Logo.png" }]
  }
};

// type Props = {}

const Stores = ({/* props: Props, */}) => {

  redirect('stores/arma-8x8');
}

export default Stores;