import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Inventory } from "@/types";

import React, { useState } from 'react';
import { randomBytes } from "crypto";
import { Container, MapPin, MapPinHouse, X } from "lucide-react";
import { getLetterMapping } from "@/utils/functions/getLetterMap";

type Props = {
    inventoryRecords: Inventory[];
    storeName: string;
}


const InventoryTable = (props: Props) => {

    const [locState, setLocState] = useState(false);
    const [{ strRow, strCol, shlRow, shlCol }, setItemLocation] = useState<{ strRow: number | undefined, strCol: number | undefined, shlRow: number | undefined, shlCol: number | undefined }>({ strRow: undefined, strCol: undefined, shlRow: undefined, shlCol: undefined });


    return (
        <React.Fragment>
            <div className={`${locState ? 'absolute opacity-100' : 'hidden opacity-0'} transition-opacity flex-col gap-4 top-[50%] left-[50%] shadow-xl shadow-zinc-950 transform -translate-x-1/2 -translate-y-1/2 flex w-fit h-fit  rounded bg-zinc-900 border border-zinc-800 z-20`}>
                <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
                    <MapPinHouse className="text-green-800" width={17} height={17} />
                    <span className="relative flex text-zinc-500 font-medium text-sm">Item location</span>
                    <button onClick={() => { setLocState(false); setItemLocation({ strRow: undefined, strCol: undefined, shlRow: undefined, shlCol: undefined }) }} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer"><X width={17} height={17} /></button>
                </h2>
                <div className="relative flex w-full h-fit items-center gap-4 px-6">
                    <MapPinHouse className="text-green-800 -rotate-12" width={40} height={40} />
                    <p className="text-sm">The item&apos;s location in the store.</p>
                </div>
                <div className="relative flex w-fit h-fit justify-center gap-2 pb-8 ml-20 mr-12">
                    <p className="relative flex text-sm font-medium rounded p-2 bg-zinc-950">{`Store Shelf: ${getLetterMapping(strRow!)} - ${strCol}`}</p>
                    <p className="relative flex text-sm font-medium rounded p-2">&</p>
                    <p className="relative flex text-sm font-medium rounded p-2 bg-zinc-950">{`Shelf Bin: ${shlRow} - ${shlCol}`}</p>
                </div>
            </div>
            <Table className={`relative ${locState ? 'pointer-events-none blur-[1px]' : ''} flex rounded overflow-hidden max-w-[100%] border border-zinc-700 text-zinc-500 flex-col w-full h-full`}>
                <TableHeader className="relative flex w-full h-fit">
                    <TableRow className="relative flex w-full h-8 items-center justify-evenly bg-zinc-800 border-zinc-700">
                        <TableHead className="relative flex w-full items-center">Name</TableHead>
                        <TableHead className="relative flex w-full items-center">Unit of measure</TableHead>
                        <TableHead className="relative flex w-full items-center">Quantity</TableHead>
                        <TableHead className="relative flex w-full items-center">Reorder point</TableHead>
                        <TableHead className="relative flex w-full items-center">Last updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="relative flex flex-col w-full max-h-full h-full overflow-y-auto">
                    {props.inventoryRecords.length > 0 ?
                        props.inventoryRecords.map((record) => {
                            return <React.Fragment key={randomBytes(6).toString('hex')}>
                                <TableRow className="relative flex w-full h-8 items-center !border-t-0 !border-b justify-evenly hover:bg-zinc-800 border-zinc-800 group" key={randomBytes(6).toString('hex')}>
                                    <TableCell className="relative block text-ellipsis overflow-hidden text-nowrap w-full items-center font-medium text-xs">{record.name}</TableCell>
                                    <TableCell className="relative flex w-full items-center pl-4 font-medium text-xs">{record.unitOfMeasure}</TableCell>
                                    <TableCell className="relative flex w-full items-center pl-4 font-medium text-xs"><span className={`relative flex rounded-full h-1 w-1 mr-1 ${(record.quantity >= record.reorderPoint * 2 ? 'bg-green-700' : record.quantity > record.reorderPoint ? 'bg-yellow-700' : 'bg-red-800' )}`} />{record.quantity}</TableCell>
                                    <TableCell className="relative flex w-full items-center pl-4 font-medium text-xs">{record.reorderPoint}</TableCell>
                                    <TableCell className="relative flex w-full items-center font-medium text-xs">{new Date(record.lastUpdated).toLocaleString()}</TableCell>
                                    <TableCell
                                        className="absolute flex right-0 pl-12 pr-20 gap-1 w-fit h-full items-center bg-zinc-900 opacity-0 group-hover:opacity-100 cursor-pointer text-green-900 hover:text-green-800 active:scale-95 transition-all"
                                        style={{
                                            background: "linear-gradient(90deg, #00000000, #18181b 20%)",
                                        }}
                                        onClick={() => { setLocState(true); setItemLocation({ strRow: record.storeRow, strCol: record.storeCol, shlRow: record.shelfRow, shlCol: record.shelfCol }) }}
                                    >
                                        {/* <Copy className="cursor-pointer text-green-900 active:scale-95 transition-all hover:text-green-700" width={16} height={16} /> */}
                                        <MapPin className="relative flex transition-all" width={14} height={14} />
                                        <p className="relative flex text-xs font-medium my-auto transition-all">Check Location</p>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        }) :
                        <TableRow className="relative flex items-center justify-center w-full h-full">
                            <TableCell className="relative flex items-center justify-center w-fit h-fit gap-4">
                                <Container width={36} height={36} className="-rotate-12 opacity-30 text-indigo-400" />
                                <p className="relative flex w-fit h-fit font-medium text-base text-zinc-700">Nothing to show here...</p>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
                <TableCaption className="relative flex w-full h-fit mt-0 justify-center py-0.5 text-xs border-t border-zinc-800 text-zinc-600 font-medium bg-zinc-800">{`Inventory details on ${props.storeName} Store`}</TableCaption>
            </Table>
        </React.Fragment>
    )
}

export default InventoryTable;

