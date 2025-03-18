"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { randomBytes } from "crypto";
import React, { useState } from "react";
import { Box, Container, Edit, Eye, EyeOff, KeyRound, Trash2, ShieldX, X } from "lucide-react";
import { Button2 } from "@/components/ui/nui-button";
import useShowPass from "@/hooks/passhider";
import useRunSpinner from "@/hooks/spinrunner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deleteItem } from "@/app/api/services/itemDeletion";
import { useSessionContext } from "@/app/context/sessionContext";
import { notify } from "@/services/notificationService";
import { Items } from "@/types";
import { editItem } from "@/app/api/services/itemEdition";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const session = useSessionContext();
  const { isVisible, toggleVisibility } = useShowPass();
  const { isSpinning, toggleSpinner } = useRunSpinner();
  const [password, setPassword] = useState<string | null>(null);
  const [delState, setDelState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [xAccess, setXAccess] = useState(false);
  const [{ itemIdD, itemName }, setItemData] = useState<{ itemIdD: string | null, itemName: string | null }>({ itemIdD: null, itemName: null });
  const [{ itemIdN, newItemName, newRorderPoint, newUnitOfMeasure, newItemDescription }, setNewItemData] = useState<{ itemIdN: string | null, newItemName: string | null, newRorderPoint: number | null, newUnitOfMeasure: string | null, newItemDescription: string | null }>({ itemIdN: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });

  const sendEdit = async () => {

    itemIdN?.trim();
    newItemName?.trim();
    newUnitOfMeasure?.trim();
    newItemDescription?.trim();
    password?.trim();

    if (itemIdN && newItemName && newItemDescription && newRorderPoint && newUnitOfMeasure && password) {

      const itemDetails: Items = {
        id: itemIdN,
        name: newItemName,
        reorderPoint: newRorderPoint,
        unitOfMeasure: newUnitOfMeasure,
        description: newItemDescription
      };

      toggleSpinner(true);
      setXAccess(true);
      const res = await editItem({
        username: session!.user!.username,
        password: password
      }, itemDetails);

      if (res?.status === 200) {
        setXAccess(false);
        setEditState(false);
        setNewItemData({ itemIdN: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });
        toggleSpinner(false);
        notify({ title: "Edition Success", message: res.statusText, icon: Edit, iconColor: "text-green-600", barColor: "bg-green-600" });
      } else if (res?.status === 400) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Edition Failure", message: res.statusText, icon: Edit, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      } else if (res?.status === 500) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Edition Failure", message: res.statusText, icon: Edit, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      } else if (res?.status === 401) {
        setXAccess(false);
        setEditState(false);
        setNewItemData({ itemIdN: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });
        toggleSpinner(false);
        notify({ title: "Edition Failure", message: res.statusText, icon: ShieldX, iconColor: "text-red-600", barColor: "bg-red-600" });
      }
    }

  };

  const sendDelete = async () => {

    itemIdD?.trim();
    password?.trim();

    if (itemIdD && password) {

      toggleSpinner(true);
      setXAccess(true);
      const res = await deleteItem({
        username: session!.user!.username,
        password: password
      }, itemIdD);

      if (res?.status === 200) {
        setXAccess(false);
        setDelState(false);
        toggleSpinner(false);
        notify({ title: "Deletion Success", message: res.statusText, icon: Trash2, iconColor: "text-green-600", barColor: "bg-green-600" });
      } else if (res?.status === 500) {
        setXAccess(false);
        setDelState(false);
        toggleSpinner(false);
        notify({ title: "Deletion Failure", message: res.statusText, icon: Trash2, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      } else if (res?.status === 401) {
        setXAccess(false);
        setDelState(false);
        toggleSpinner(false);
        notify({ title: "Deletion Failure", message: res.statusText, icon: ShieldX, iconColor: "text-red-600", barColor: "bg-red-600" });
      }

    }

  };

  return (
    <React.Fragment>
      {/* Item Deletion */}
      <div className={`${delState ? 'absolute opacity-100' : 'hidden opacity-0'} transition-opacity flex-col gap-4 top-[50%] left-[50%] shadow-xl shadow-zinc-950 transform -translate-x-1/2 -translate-y-1/2 flex w-fit h-fit  rounded-sm bg-zinc-900 border border-zinc-800 z-20`}>
        <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
          <Trash2 className="text-red-900" width={17} height={17} />
          <span className="relative flex text-zinc-500 font-medium text-sm">Confirm Deletion</span>
          <button disabled={xAccess} onClick={() => { setDelState(false); setItemData({ itemIdD: null, itemName: null }) }} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer"><X width={17} height={17} /></button>
        </h2>
        <div className="relative flex items-center `w-full h-fit gap-4 px-6">
          <Trash2 className="text-red-800 -rotate-12" width={40} height={40} />
          <p className="text-sm">Are you sure you want to delete this item? Confirm with your password.</p>
        </div>
        <div className="relative flex w-fit ml-20 border border-zinc-800 p-2 rounded-sm bg-zinc-950 gap-1 text-xs font-medium">
          <Box width={16} height={16} />
          <p className="relative flex">- {itemName}</p>
        </div>
        <div className="relative flex p-4 gap-2 justify-between">
          <fieldset className='relative flex ml-4 gap-2 items-center'>
            <label htmlFor="password"><KeyRound className='text-zinc-500' height={18} width={19} /></label>
            <input onChange={(e) => { setPassword(e.target.value) }} id="password" className='bg-transparent input-field' type={isVisible ? 'text' : 'password'} placeholder='Password' />
            <span onClick={() => { toggleVisibility() }} className='cursor-pointer absolute right-2'>{isVisible ? <Eye className='text-zinc-500' width={16} height={16} /> : <EyeOff className='text-zinc-500' width={16} height={16} />}</span>
          </fieldset>
          <Button2 disabeled={(password) ? false : true} spinner={isSpinning} value={"Confirm"} onClick={() => sendDelete()} />
        </div>
      </div>
      {/* Item Edition */}
      <div className={`${editState ? 'absolute opacity-100' : 'hidden opacity-0'} transition-opacity flex-col gap-8 top-[50%] left-[50%] shadow-xl shadow-zinc-950 transform -translate-x-1/2 -translate-y-1/2 flex w-fit h-fit  rounded-sm bg-zinc-900 border border-zinc-800 z-20`}>
        <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
          <Edit className="text-green-900" width={17} height={17} />
          <span className="relative flex text-zinc-500 font-medium text-sm">Editing Item Details</span>
          <button disabled={xAccess} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer" onClick={() => { setEditState(false); setNewItemData({ itemIdN: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null }) }}><X width={17} height={17} /></button>
        </h2>
        <div className="relative flex items-center w-full h-fit gap-4 px-6">
          <Edit className="text-green-800 -rotate-12" width={40} height={40} />
          <p className="text-sm">You can provide new details to fields below.</p>
        </div>
        <div className="relative flex flex-col w-fit ml-12 border border-zinc-800 p-2 rounded-sm gap-4 text-sm">
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Item Name: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ itemIdN: itemIdN, newItemName: e.target.value, newRorderPoint: newRorderPoint, newUnitOfMeasure: newUnitOfMeasure, newItemDescription: newItemDescription })} id="item_name" value={(newItemName ? newItemName : "")} className='bg-transparent font-medium py-1! focus:outline-zinc-800! input-field' type="text" aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='New name' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="reorder_point">Reorder Point: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ itemIdN: itemIdN, newItemName: newItemName, newRorderPoint: parseFloat(isNaN(parseFloat(e.target.value)) ? '0' : e.target.value), newUnitOfMeasure: newUnitOfMeasure, newItemDescription: newItemDescription })} id="reorder_point" value={(newRorderPoint ? newRorderPoint : "")} className='bg-transparent font-medium py-1! focus:outline-zinc-800! input-field' min={1} type="number" aria-autocomplete="none" autoComplete="off" inputMode="decimal" placeholder='0 or 0.0' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="unit_of_measure">Unit of Measurement: </label>
            <Select value={newUnitOfMeasure!} onValueChange={(value) => setNewItemData({ itemIdN: itemIdN, newItemName: newItemName, newRorderPoint: newRorderPoint, newUnitOfMeasure: value, newItemDescription: newItemDescription })}>
              <SelectTrigger className="relative p-1 h-fit focus:ring-zinc-800 flex w-36 border-zinc-800 focus:border-zinc-800">
                <SelectValue placeholder="Unit of measure" />
              </SelectTrigger>
              <SelectContent className="relative flex flex-col h-36 overflow-y-auto bg-zinc-900 shadow-lg shadow-zinc-950 border-zinc-800">
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="PCS">PCS</SelectItem>
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="PRS">PRS</SelectItem>
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="PKG">PKG</SelectItem>
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="MTR">MTR</SelectItem>
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="LTR">LTR</SelectItem>
                <SelectItem className="text-xs! font-medium rounded-sm hover:bg-zinc-800" value="KGS">KGS</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset className='relative flex gap-2 justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="description">Description: </label>
            <Textarea value={(newItemDescription ? newItemDescription : "")} maxLength={60} style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ itemIdN: itemIdN, newItemName: newItemName, newRorderPoint: newRorderPoint, newUnitOfMeasure: newUnitOfMeasure, newItemDescription: e.target.value })} id="description" className='bg-transparent font-medium placeholder:font-normal -mt-1 py-1! max-h-24 focus:ring-zinc-800 input-field' aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='Description' />
          </fieldset>
        </div>
        <div className="relative flex p-4 gap-2 justify-between">
          <fieldset className='relative flex ml-4 gap-2 items-center'>
            <label htmlFor="password"><KeyRound className='text-zinc-500' height={18} width={19} /></label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => { setPassword(e.target.value) }} id="password" className='bg-transparent input-field' type={isVisible ? 'text' : 'password'} placeholder='Password' />
            <span onClick={() => { toggleVisibility() }} className='cursor-pointer absolute right-2'>{isVisible ? <Eye className='text-zinc-500' width={16} height={16} /> : <EyeOff className='text-zinc-500' width={16} height={16} />}</span>
          </fieldset>
          <Button2 disabeled={(password) ? false : true} spinner={isSpinning} value={"Update"} onClick={() => sendEdit()} />
        </div>
      </div>
      <Table className={`relative ${delState || editState ? 'pointer-events-none blur-[1px]' : ''} flex rounded-sm overflow-hidden border border-zinc-700 text-zinc-500 flex-col w-full h-full`}>
        <TableHeader className="relative flex w-full h-fit">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="relative flex w-full h-8 items-center justify-evenly bg-zinc-800 border-zinc-700" key={headerGroup.id}>
              {headerGroup.headers.filter((header) => header.column.id !== "id").map((header) => {
                return (
                  <TableHead className="relative flex w-full items-center" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="relative flex flex-col h-full w-full overflow-y-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="relative flex w-full h-8 items-center border-t-0! border-b! justify-evenly transition-all hover:bg-zinc-800 border-zinc-800 group"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().filter((cell) => cell.column.id !== "id").map((cell) => {

                  return <React.Fragment key={randomBytes(6).toString('hex')}>
                    <TableCell className="relative block w-full items-center font-medium text-xs overflow-hidden text-ellipsis whitespace-nowrap" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    <TableCell
                      className="absolute flex right-0 px-12 gap-6 w-fit h-full bg-zinc-900 opacity-0 group-hover:opacity-100 transition-all"
                      style={{
                        background: "linear-gradient(90deg, #00000000, #18181b 20%)",
                      }}
                    >
                      {/* <Copy className="cursor-pointer text-green-900 active:scale-95 transition-all hover:text-green-700" width={16} height={16} /> */}
                      <Edit onClick={() => { setEditState(true); setNewItemData({ itemIdN: row.getValue('id'), newItemName: row.getValue('name'), newRorderPoint: row.getValue('reorderPoint'), newUnitOfMeasure: row.getValue('unitOfMeasure'), newItemDescription: row.getValue('description') }) }} className="cursor-pointer text-green-900 active:scale-95 transition-all hover:text-green-700" width={16} height={16} />
                      <Trash2 onClick={() => { setDelState(true); setItemData({ itemIdD: row.getValue('id'), itemName: row.getValue('name') }) }} className="cursor-pointer text-red-900 active:scale-95 transition-all hover:text-red-700" width={16} height={16} />
                    </TableCell>
                  </React.Fragment>
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="relative flex items-center justify-center w-full h-full">
              <TableCell className="relative flex items-center justify-center w-fit h-fit gap-4">
                <Container width={36} height={36} className="-rotate-12 opacity-30 text-indigo-400" />
                <p className="relative flex w-fit h-fit font-medium text-lg text-zinc-700">Nothing to show here...</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption className="relative flex w-full h-fit mt-0 justify-center py-0.5 text-xs border-t border-zinc-800 text-zinc-600 font-medium bg-zinc-800">Details on Store Items</TableCaption>
      </Table>
    </React.Fragment>
  )
}

export default DataTable;