import React from 'react';
import SLayout from '@/components/store-layout';
import PageDisplay from './UI Components/page-display';
import Headsetter from '../UI Components/headsetter';

// type Props = {}

const Arma8x8 = async (/* props: Props */) => {

    return (
        <SLayout>
            <Headsetter headstring='Arma 8x8' />
            <div className='relative flex flex-col w-full h-full'>
                <PageDisplay server_url={process!.env!.SERVER_URL!} />
            </div>
        </SLayout>
    )
}

export default Arma8x8;