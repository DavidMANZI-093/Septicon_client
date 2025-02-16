"use client";

import { ClipboardList, Container, FileBox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { Inventory, Items, Stations } from '@/types';
import InventoryTable from '../../UI Components/inventory-table';
import { DataTable } from '../../UI Components/Items/data-table';
import { columns } from '../../UI Components/Items/columns';
import { fetchItems } from '../../fetchers/items';
import { fetchInventory } from '../../fetchers/inventory';
import Loader from '@/components/ui/loaders/loader-1';
import Actions from '../../UI Components/actions';
import { fetchStations } from '../../fetchers/stations';

type Props = {
    server_url: string;
};

const PageDisplay = (props: Props) => {

    const storeId = '0e448cee-cbd0-4a1f-86ae-2bb64d8ce2a0';

    const [items, setItems] = useState<Items[]>([]);
    const [inventory, setInvetory] = useState<Inventory[]>([]);
    const [stations, setStations] = useState<Stations[]>([]);

    const refetchItems = async () => {
        const updatedItems = await fetchItems(storeId);

        updatedItems.sort((a, b) => a.name.localeCompare(b.name));

        setItems(updatedItems);
    };

    const refetchInventory = async () => {
        const updatedInventory = await fetchInventory(storeId);

        updatedInventory.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

        setInvetory(updatedInventory);
    };

    useEffect(() => {
        const loadData = async () => {
            setItems((await fetchItems(storeId)).sort((a, b) => a.name.localeCompare(b.name)));
            setInvetory((await fetchInventory(storeId)).sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()));
            setStations(await fetchStations());
        };

        loadData();

        const socket = io(props.server_url, {reconnection: true, reconnectionAttempts: 5, reconnectionDelay: 3000});

        socket.on("itemDeleted", () => {
            refetchItems();
            refetchInventory();
        });

        socket.on("itemAdded", () => {
            refetchItems();
            refetchInventory();
        });

        socket.on("itemSupplied", () => {
            refetchItems();
            refetchInventory();
        });

        socket.on("itemReplenished", () => {
            refetchItems();
            refetchInventory();
        });

        socket.on("itemEdited", () => {
            refetchItems();
            refetchInventory();
        });

        return () => {
            socket.off("itemReplenished");
            socket.off("itemSupplied");
            socket.off("itemAdded");
            socket.off("itemDeleted");
            socket.off("itemEdited");
            socket.disconnect();
        }

    }, [props.server_url]);

    const [location, setLocation] = useState('inventory');

    return (
        <>
            <div className='relative flex w-full h-fit gap-6 px-4 py-1'>
                <button onClick={() => setLocation('inventory')} className='relative flex items-center gap-1 active:scale-95'>
                    <ClipboardList className='relative flex text-zinc-500' width={16} height={16} />
                    <p className='relative flex w-fit h-fit text-sm text-zinc-500 font-medium'>Inventory</p>
                    <span className={`${location === 'inventory' ? 'scale-x-100' : 'scale-x-0'} transition-all duration-300  origin-center absolute flex w-full -bottom-1 h-[0.1rem] bg-indigo-500 opacity-70`}></span>
                </button>
                <button onClick={() => setLocation('actions')} className='relative flex items-center gap-1 active:scale-95'>
                    <FileBox className='relative flex text-zinc-500' width={16} height={16} />
                    <p className='relative flex w-fit h-fit text-sm text-zinc-500 font-medium'>Actions</p>
                    <span className={`${location === 'actions' ? 'scale-x-100' : 'scale-x-0'} transition-all duration-300  origin-center absolute flex w-full -bottom-1 h-[0.1rem] bg-indigo-500 opacity-70`}></span>
                </button>
                <button onClick={() => setLocation('items')} className='relative flex items-center gap-1 active:scale-95'>
                    <Container className='relative flex text-zinc-500' width={16} height={16} />
                    <p className='relative flex w-fit h-fit text-sm text-zinc-500 font-medium'>Items</p>
                    <span className={`${location === 'items' ? 'scale-x-100' : 'scale-x-0'} transition-all duration-300  origin-center absolute flex w-full -bottom-1 h-[0.1rem] bg-indigo-500 opacity-70`}></span>
                </button>
            </div>
            <div className='relative flex w-full h-full overflow-hidden'>
                <div className={`${location === 'inventory' ? 'left-0 opacity-100' : location === 'actions' ? '-left-full opacity-0' : '-left-[200%] opacity-0'} absolute pl-3 pt-2 flex transition-all duration-500 min-w-full w-full h-full`}>
                    {inventory? <InventoryTable inventoryRecords={inventory} storeName='Ratel MK3' /> : <Loader />}
                </div>
                <div className={`${location === 'actions' ? 'left-0 opacity-100' : location === 'items' ? '-left-full opacity-0' : 'left-full opacity-0'} absolute pl-3 pt-2 flex transition-all duration-500 min-w-full w-full h-full`}>
                    <Actions storeId={storeId} stations={stations} items={items} />
                </div>
                <div className={`${location === 'items' ? 'left-0 opacity-100' : location === 'actions' ? 'left-full opacity-0' : 'left-[200%] opacity-0'} absolute pl-3 pt-2 flex transition-all duration-500 min-w-full w-full h-full`}>
                    {items? <DataTable columns={columns} data={items} /> : <Loader />}
                </div>
            </div>
        </>
    )
}

export default PageDisplay;