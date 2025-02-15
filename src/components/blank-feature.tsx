import { Code2 } from 'lucide-react';
import React from 'react'

// type Props = {}

const BlankFeature = (/* props: Props */) => {
    return (
        <div className='relative flex flex-col items-center justify-center w-full h-full gap-2'>
            <Code2 className='relative flex text-indigo-700 opacity-65' size={48} />
            <p className='relative flex text-zinc-600 font-medium text-base'>This feature is still under development...</p>
        </div>
    )
}

export default BlankFeature;