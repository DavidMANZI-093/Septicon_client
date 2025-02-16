"use client";

import PieChartEx from '@/components/re-charts/active-piechart';
import LineChartEx from '@/components/re-charts/bi-linechart';
import BarChartEx from '@/components/re-charts/brush-barchart';
import RadarChartEx from '@/components/re-charts/domain-radarchart';
import RadialBarChartEx from '@/components/re-charts/radial-barchart';
import AreaChartEx from '@/components/re-charts/stacked-areachart';
import React, { useEffect, useRef } from 'react';
import { createSwapy, Swapy } from 'swapy';
import useLoadKiller from '@/hooks/loaddestroyer';
import Gripper from '@/components/ui/gripper';
import Loader1 from '@/components/ui/loaders/loader-1';

const SwapyBox = () => {

    const container = useRef(null);
    let swapy: Swapy | undefined;

    useEffect(() => {
        if (container.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            swapy = createSwapy(container.current);

            // swapy.onSwap((event) => {
            //     console.log('swap', event);
            // });
        }

        return () => {
            swapy?.destroy();
        }

    }, []);

    const { isLoading, killLoader } = useLoadKiller();

    setTimeout(() => killLoader(false), 0);

    return (
        <div ref={container} className="relative grid gap-2 pr-0.5 min-h-full w-full h-full bg-transparent overflow-hidden overflow-y-scroll rounded-md grid-cols-auto-fit">
            {/* {children} */}
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='a'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='a'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <AreaChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='b'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='b'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <LineChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='c'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='c'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <PieChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='d'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='d'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <RadarChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='e'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='e'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <RadialBarChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='relative grid btn-gradient4 rounded-md transition-all' data-swapy-slot='f'>
                <div className='relative flex bg-zinc-950 min-h-64 flex-col gap-2 p-2 rounded-md' data-swapy-item='f'>
                    {(isLoading ?
                        <Loader1 />
                        :
                        <>
                            <BarChartEx />
                            <div className='absolute bottom-2 left-0 flex w-fit h-fit' data-swapy-handle>
                                <Gripper />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SwapyBox