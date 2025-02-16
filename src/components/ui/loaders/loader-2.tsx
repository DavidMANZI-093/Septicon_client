import React from 'react';
import type {} from 'ldrs';
import { useEffect } from 'react'

export default function Loader2() {

  useEffect(() => {

    async function getLoader() {
      const { jellyTriangle } = await import('ldrs');
      jellyTriangle.register();
    }

    getLoader();

  });

  return <l-jelly-triangle className="scale-50 bg-indi" color="#1d4ed8" style={{
    background: '#fff',
  }}></l-jelly-triangle>
}