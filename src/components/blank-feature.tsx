"use client";

import React from 'react';
import Loader2 from './ui/loaders/loader-2';

// type Props = {}

const BlankFeature = (/* props: Props */) => {
    return (
        <div className='relative flex items-center justify-center w-full h-full gap-4'>
            <Loader2 />
            <p className='relative flex text-zinc-600 font-medium text-sm'>Feature is<br />under development...</p>
        </div>
    )
}

export default BlankFeature;