"use client";

import React from 'react';
import Loader2 from './ui/loaders/loader-2';

// type Props = {}

const BlankFeature = (/* props: Props */) => {
    return (
        <div className='relative flex flex-col items-center justify-center w-full h-full'>
            <div className='relative flex w-fit h-fit py-4 px-6 items-center justify-center gap-2 rounded border border-zinc-800 shadow shadow-zinc-950'>
                <Loader2 />
                <p className='relative flex text-zinc-600 font-medium text-sm'>Feature is under development...</p>
            </div>
        </div>
    )
}

export default BlankFeature;