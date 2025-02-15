import Container from "@/app/stores/UI Components/container";
import PlatformList from "@/app/stores/UI Components/platform-list";
import { Layout } from "./layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septicon - Stores",
  description: "Built with Integrity!",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    url: "septicon.com",
    title: "Septicon - Stores",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack/Septicon - Logo.png" }]
  }
};

const SLayout = ({/* props: Props, */ children}: { children: React.ReactNode }) => {

    return (
      <Layout>
        <div className='relative flex flex-col w-[80%] h-full bg-transparent gap-2'>
          <Container>
            {children}
          </Container>
        </div>
        <div className='relative flex flex-col  w-[20%] h-full bg-transparent'>
          {/* <h2 className='relative flex text-zinc-500 h-11 px-4 items-center font-medium rounded-t-md'>Platform Stores</h2> */}
          <div className='relative flex mt-8 pl-1 flex-col w-full h-full overflow-hidden overflow-y-auto'>
            <PlatformList />
          </div>
        </div>
      </Layout>
    )
  }
  
  export default SLayout;