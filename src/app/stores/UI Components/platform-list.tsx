import React from 'react';
import { fetchPlatforms } from '../fetchers/platforms';
import { Platform } from '@/types';
import ListItem from './list-item';
import { randomBytes } from 'crypto';

// type Props = {}

const PlatformList = async (/* props: Props */) => {

    const platforms = await fetchPlatforms() as Platform[];

    return (
        <ul className='relative border-l border-zinc-700 flex flex-col w-full h-fit gap-2 p-1'>
            {(platforms.map((platform) => {
                return (
                    <ListItem key={randomBytes(6).toString('hex')} platform={platform} />
                );
            }))}
        </ul>
    )
}

export default PlatformList;