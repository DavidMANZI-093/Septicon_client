"use client";

import React from 'react';
import Loader2 from './ui/loaders/loader-2';

// type Props = {}

const BlankFeature = (/* props: Props */) => {
    return (
        <div className='relative flex flex-col items-center justify-center w-full h-full gap-4'>
            <div className='relative flex w-fit h-fit items-center justify-center border-zinc-800'>
                <Loader2 />
                <p className='relative flex text-zinc-600 font-medium text-sm'>Feature is under development...</p>
            </div>
        </div>
    )
}

export default BlankFeature;