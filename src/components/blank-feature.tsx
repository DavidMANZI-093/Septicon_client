"use client";

import React from 'react';
import Loader2 from './ui/loaders/loader-2';

// type Props = {}

const BlankFeature = (/* props: Props */) => {
    return (
        <div className='relative flex items-center justify-center w-full h-full gap-2'>
            <Loader2 />
            <p className='relative flex text-zinc-600 font-medium text-base'>Feature under development...</p>
        </div>
    )
}

export default BlankFeature;