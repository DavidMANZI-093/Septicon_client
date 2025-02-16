import React from 'react';
import type {} from 'ldrs';
import { useEffect } from 'react'

export default function Loader1() {

  useEffect(() => {

    async function getLoader() {
      const { bouncy } = await import('ldrs');
      bouncy.register();
    }

    getLoader();

  }, [])

  return <l-bouncy className="scale-75 m-auto" color="#4338ca"></l-bouncy>
}