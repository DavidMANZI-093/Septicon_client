"use client";

import { X } from 'lucide-react';
import React from 'react';
import { useNotification } from '@/app/context/notificationContext';

// type Props = {}

const NoteBox = (/* props: Props */) => {

    const { notifications, removeNotification } = useNotification();

    return (
        <div className="absolute flex flex-col z-50 gap-2 top-4 right-4">
            {notifications.map((notif) => (
                <div key={notif.id} className="relative flex flex-col bg-zinc-900 rounded border border-zinc-800 shadow-lg shadow-zinc-950 overflow-hidden">
                    <div className='flex relative py-2 px-2 gap-2 w-72 h-fit justify-between'>
                        <div className='flex relative'>
                            <notif.icon width={48} className={`flex ${notif.iconColor} my-auto relative`} />
                            <div className="flex flex-col relative justify-center">
                                <h1 className="text-sm font-medium">{notif.title}</h1>
                                <p className="text-xs overflow-clip w-48">{notif.message}</p>
                            </div>
                        </div>
                        <X onClick={() => removeNotification(notif.id!)} width={16} className="flex my-auto mr-1 cursor-pointer" />
                    </div>
                    <span className={`flex h-0.5 poor-out ${notif.barColor} bg-opacity-70`}></span>
                </div>
            ))}
        </div>
    )
}

export default NoteBox;