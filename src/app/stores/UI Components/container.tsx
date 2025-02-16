"use client";

import Loader from '@/components/ui/loaders/loader-1';
import React from 'react';

// type Props = {}

const Container = ({/* props: Props, */ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        {children ? children :
            <Loader />
        }
    </>
  )
}

export default Container