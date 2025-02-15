import React from 'react';
import SLayout from '@/components/store-layout';
import PageDisplay from './UI Components/page-display';
import Headsetter from '../UI Components/headsetter';

// type Props = {}

const Rg31Nyala = async (/* props: Props */) => {

    return (
        <SLayout>
            <Headsetter headstring='RG - 31 Nyala' />
            <div className='relative flex flex-col w-full h-full'>
                <PageDisplay server_url={process!.env!.SERVER_URL!}/>
            </div>
        </SLayout>
    )
}

export default Rg31Nyala