import React from 'react';
import SLayout from '@/components/store-layout';
import Headsetter from '../UI Components/headsetter';
import PageDisplay from './UI Components/page-display';

// type Props = {}

const Tank5455 = async (/* props: Props */) => {

    return (
        <SLayout>
            <Headsetter headstring='Tank - 54/55' />
            <div className='relative flex flex-col w-full h-full'>
                <PageDisplay server_url={process!.env!.SERVER_URL!} />
            </div>
        </SLayout>
    )
}

export default Tank5455