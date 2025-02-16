"use client";

import { Button2 } from '@/components/ui/nui-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useShowPass from '@/hooks/passhider';
import useRunSpinner from '@/hooks/spinrunner';
import { Container, Eye, EyeOff, FileMinus2, FilePlus2, KeyRound, Package, PackageMinus, PackagePlus, ShieldClose, X } from 'lucide-react';
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Items, ItemsA, ItemsR, ItemsS, Stations } from '@/types';
import { useSessionContext } from '@/app/context/sessionContext';
import { notify } from '@/services/notificationService';
import { addItem } from '@/app/api/services/itemCreation';
import { supplyItem } from '@/app/api/services/itemSupply';
import { replenishItem } from '@/app/api/services/itemReplenish';

type Props = {
  storeId: string;
  items: Items[];
  stations: Stations[];
}

const Actions = (props: Props) => {

  const session = useSessionContext();
  const { isSpinning, toggleSpinner } = useRunSpinner();
  const [itemRepState, setItemRepState] = useState(false);
  const [itemSupState, setItemSupState] = useState(false);
  const [itemAddState, setItemAddState] = useState(false);
  const [xAccess, setXAccess] = useState(false);
  const [{ newInitQty, newItemName, newRorderPoint, newUnitOfMeasure, newItemDescription }, setNewItemData] = useState<{ newInitQty?: number | null, newItemName: string | null, newRorderPoint: number | null, newUnitOfMeasure: string | null, newItemDescription: string | null }>({ newInitQty: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });
  const { isVisible, toggleVisibility } = useShowPass();
  const [password, setPassword] = useState<string | null>(null);

  const [{ repItemID, repItemQty, repReason, repSourceStationID }, setRepItemData] = useState<{ repItemID: string | null, repItemQty: number | null, repReason: string | null, repSourceStationID?: string | null }>({ repItemID: null, repItemQty: null, repReason: null, repSourceStationID: null });
  const [{ supItemID, supItemQty, supReason, supTargetStationID }, setSupItemData] = useState<{ supItemID: string | null, supItemQty: number | null, supReason: string | null, supTargetStationID?: string | null }>({ supItemID: null, supItemQty: null, supReason: null, supTargetStationID: null });
  const [openRep1, setOpenRep1] = useState(false);
  const [openRep2, setOpenRep2] = useState(false);
  const [openSup1, setOpenSup1] = useState(false);
  const [openSup2, setOpenSup2] = useState(false);

  const sendNewItem = async () => {

    newItemDescription?.trim();
    newItemName?.trim();
    newUnitOfMeasure?.trim();
    password?.trim();

    if (newItemDescription && newItemName && newRorderPoint && newUnitOfMeasure && password) {

      const itemDetails: ItemsA = {
        name: newItemName,
        storeId: props.storeId,
        reorderPoint: newRorderPoint,
        unitOfMeasure: newUnitOfMeasure,
        description: newItemDescription,
        quantity: newInitQty
      };

      toggleSpinner(true);
      setXAccess(true);
      const res = await addItem({
        username: session!.user!.username,
        password: password
      }, itemDetails);

      if (res?.status === 200) {
        setXAccess(false);
        setNewItemData({ newInitQty: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });
        toggleSpinner(false);
        notify({ title: "Creation Success", message: res.statusText, icon: Package, iconColor: "text-green-600", barColor: "bg-green-600" });
      } else if (res?.status === 400) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Creation Failure", message: res.statusText, icon: Package, iconColor: "text-yellow-600", barColor: "bg-yellow-600" });
      } else if (res?.status === 401) {
        setXAccess(false);
        setNewItemData({ newInitQty: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null });
        setItemAddState(false);
        toggleSpinner(false);
        notify({ title: "Creation Failure", message: res.statusText, icon: ShieldClose, iconColor: "text-red-600", barColor: "bg-red-600" });
      } else if (res?.status === 500) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Creation Failure", message: res.statusText, icon: Package, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      }

    }

  };

  const sendSupply = async () => {

    supItemID?.trim();
    supReason?.trim();
    supTargetStationID?.trim();
    password?.trim();

    if (supItemID && supItemQty && supReason && password) {

      const itemDetails: ItemsS = {
        id: supItemID,
        reason: supReason,
        targetStationId: supTargetStationID,
        quantity: supItemQty
      };

      toggleSpinner(true);
      setXAccess(true);
      const res = await supplyItem({
        username: session!.user!.username,
        password: password
      }, itemDetails);

      if (res?.status === 200) {
        setXAccess(false);
        setSupItemData({ supItemID: null, supItemQty: null, supReason: null, supTargetStationID: null });
        toggleSpinner(false);
        notify({ title: "Supply Success", message: res.statusText, icon: PackageMinus, iconColor: "text-green-600", barColor: "bg-green-600" });
      } else if (res?.status === 400) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Supply Failure", message: res.statusText, icon: PackageMinus, iconColor: "text-yellow-600", barColor: "bg-yellow-600" });
      } else if (res?.status === 401) {
        setXAccess(false);
        setSupItemData({ supItemID: null, supItemQty: null, supReason: null, supTargetStationID: null });
        setItemAddState(false);
        toggleSpinner(false);
        notify({ title: "Supply Failure", message: res.statusText, icon: ShieldClose, iconColor: "text-red-600", barColor: "bg-red-600" });
      } else if (res?.status === 500) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Supply Failure", message: res.statusText, icon: PackageMinus, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      }

    }

  };

  const sendReplenish = async () => {

    repItemID?.trim();
    repReason?.trim();
    repSourceStationID?.trim();
    password?.trim();

    if (repItemID && repItemQty && repReason && password) {

      const itemDetails: ItemsR = {
        id: repItemID,
        reason: repReason,
        sourceStationId: repSourceStationID,
        quantity: repItemQty
      };

      toggleSpinner(true);
      setXAccess(true);
      const res = await replenishItem({
        username: session!.user!.username,
        password: password
      }, itemDetails);

      if (res?.status === 200) {
        setXAccess(false);
        setRepItemData({ repItemID: null, repItemQty: null, repReason: null, repSourceStationID: null });
        toggleSpinner(false);
        notify({ title: "Replenishment Success", message: res.statusText, icon: PackagePlus, iconColor: "text-green-600", barColor: "bg-green-600" });
      } else if (res?.status === 400) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Replenishment Failure", message: res.statusText, icon: PackagePlus, iconColor: "text-yellow-600", barColor: "bg-yellow-600" });
      } else if (res?.status === 401) {
        setXAccess(false);
        setRepItemData({ repItemID: null, repItemQty: null, repReason: null, repSourceStationID: null });
        setItemRepState(false);
        toggleSpinner(false);
        notify({ title: "Replenishment Failure", message: res.statusText, icon: ShieldClose, iconColor: "text-red-600", barColor: "bg-red-600" });
      } else if (res?.status === 500) {
        setXAccess(false);
        toggleSpinner(false);
        notify({ title: "Replenishment Failure", message: res.statusText, icon: PackagePlus, iconColor: "text-orange-600", barColor: "bg-orange-600" });
      }

    }

  };

  return (
    <div className='relative flex w-full h-full items-center justify-center'>
      <div className={`relative ${itemAddState || itemRepState || itemSupState ? 'hidden opacity-0' : 'flex opacity-100'} w-full h-full items-center justify-center gap-6 transition-all`}>
        <button onClick={() => { setItemRepState(true); setItemAddState(false); setItemSupState(false) }} className='relative flex w-fit h-fit text-blue-700 gap-2 rounded border border-zinc-800 py-1.5 px-2.5 items-center justify-center shadow-md shadow-zinc-950 hover:shadow-lg hover:shadow-zinc-950 active:scale-95 transition-all'>
          <PackagePlus className='relative flex transition-all text-blue-600' size={20} />
          <p className='relative flex text-sm font-medium transition-all'>Replenish Items</p>
        </button>
        <button onClick={() => { setItemRepState(false); setItemAddState(false); setItemSupState(true) }} className='relative flex w-fit h-fit text-blue-700 gap-2 rounded border border-zinc-800 py-1.5 px-2.5 items-center justify-center shadow-md shadow-zinc-950 hover:shadow-lg hover:shadow-zinc-950 active:scale-95 transition-all'>
          <PackageMinus className='relative flex transition-all text-blue-600' size={20} />
          <p className='relative flex text-sm font-medium transition-all'>Supply Items</p>
        </button>
        <button onClick={() => { setItemRepState(false); setItemAddState(true); setItemSupState(false) }} className='relative flex w-fit h-fit text-blue-700 gap-2 rounded border border-zinc-800 py-1.5 px-2.5 items-center justify-center shadow-md shadow-zinc-950 hover:shadow-lg hover:shadow-zinc-950 active:scale-95 transition-all'>
          <Package className='relative flex transition-all text-blue-600' size={20} />
          <p className='relative flex text-sm font-medium transition-all'>Add New Item</p>
        </button>
      </div>
      {/* Replenishing Items */}
      <div className={`relative ${itemRepState ? 'flex opacity-100' : 'hidden opacity-0'} gap-6 flex-col w-fit h-fit rounded border border-zinc-700 shadow-lg shadow-zinc-950`}>
        <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
          <PackagePlus className="text-green-800" width={17} height={17} />
          <span className="relative flex text-zinc-600 font-medium text-sm">Item Replenishment</span>
          <button disabled={xAccess} onClick={() => { setItemRepState(false) }} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer"><X width={17} height={17} /></button>
        </h2>
        <div className="relative flex w-full items-center h-fit gap-4 px-6">
          <PackagePlus className="text-green-900 -rotate-12" width={40} height={40} />
          <p className="text-sm">Fill the fields below about the replenishment.</p>
        </div>
        <div className="relative flex flex-col w-fit h-full ml-16 border border-zinc-800 p-2 rounded gap-4 text-sm">
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Select The Item: </label>
            <Popover open={openRep1} onOpenChange={setOpenRep1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[180px] justify-between py-1 h-fit px-2 border border-zinc-800"
                >
                  <p className='block text-left w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>
                    {repItemID
                      ? props.items.find((item) => item.id === repItemID)?.name
                      : "Select an item..."}
                  </p>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] h-48 overflow-hidden bg-zinc-900 border border-zinc-800 p-1 shadow-md shadow-zinc-950">
                <Command>
                  <CommandInput className='placeholder:text-zinc-600' placeholder={"Search Item..."} />
                  <CommandList>
                    <CommandEmpty className="flex items-center justify-center pb-2 pt-3 gap-2 text-zinc-600 text-sm font-medium"><Container className='text-indigo-400 opacity-30' width={18} height={18} /> No items found.</CommandEmpty>
                    <CommandGroup>
                      {props.items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => {
                            setRepItemData({ repItemID: (repItemID === item.id ? null : item.id), repItemQty: repItemQty, repReason: repReason, repSourceStationID: repSourceStationID });
                            setOpenRep1(false);
                          }}
                          className='text-sm font-medium cursor-pointer active:scale-95 hover:bg-zinc-800 rounded text-ellipsis text-nowrap overflow-hidden'
                        >
                          <Check
                            className={cn(
                              "mr-0 h-4 w-4",
                              repItemID === item.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <p className='block w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>{item.name}</p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="reorder_point">Quantity: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setRepItemData({ repItemID: repItemID, repReason: repReason, repItemQty: parseFloat(isNaN(parseFloat(e.target.value)) ? '0' : e.target.value), repSourceStationID: repSourceStationID })} id="reorder_point" value={(repItemQty ? repItemQty : "")} className='bg-transparent font-medium focus:!outline-zinc-700 !py-1 input-field' min={1} type="number" aria-autocomplete="none" autoComplete="off" inputMode="decimal" placeholder='0 or 0.0' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Source Station: </label>
            <Popover open={openRep2} onOpenChange={setOpenRep2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openRep2}
                  className="w-[180px] justify-between py-1 h-fit px-2 border border-zinc-800"
                >
                  <p className='block text-left w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>
                    {repSourceStationID
                      ? props.stations.find((station) => station.id === repSourceStationID)?.name
                      : "(Optional)"}
                  </p>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] h-32 bg-zinc-900 border border-zinc-800 p-1 shadow-md shadow-zinc-950">
                <Command>
                  <CommandInput className='placeholder:text-zinc-600' placeholder={"Search Staion..."} />
                  <CommandList>
                    <CommandEmpty className="flex items-center justify-center pb-2 pt-3 gap-2 text-zinc-600 text-sm font-medium"><Container className='text-indigo-400 opacity-30' width={18} height={18} /> No items found.</CommandEmpty>
                    <CommandGroup>
                      {props.stations.map((station) => (
                        <CommandItem
                          key={station.id}
                          value={station.name}
                          onSelect={() => {
                            setRepItemData({ repSourceStationID: (repSourceStationID === station.id ? null : station.id), repItemQty: repItemQty, repReason: repReason, repItemID: repItemID });
                            setOpenRep2(false);
                          }}
                          className='text-sm font-medium cursor-pointer active:scale-95 hover:bg-zinc-800 rounded text-ellipsis text-nowrap overflow-hidden'
                        >
                          <Check
                            className={cn(
                              "mr-0 h-4 w-4",
                              repSourceStationID === station.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <p className='block w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>{station.name}</p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </fieldset>
          <fieldset className='relative flex gap-2 justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="description">Reason: </label>
            <Textarea value={(repReason ? repReason : "")} maxLength={500} style={{
              borderColor: '#27272a'
            }} onChange={(e) => setRepItemData({ repItemID: repItemID, repItemQty: repItemQty, repReason: e.target.value, repSourceStationID: repSourceStationID })} id="description" className='bg-transparent font-medium !-mt-1 !py-1 max-h-24 focus:ring-zinc-800 placeholder:font-normal input-field' aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='Details about the replenishment...' />
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
          <Button2 disabeled={(password && repItemID && repItemQty && repReason || repSourceStationID) ? false : true} spinner={isSpinning} value={"Confirm"} onClick={() => { sendReplenish() }} />
        </div>
      </div>
      {/* Supplying Items */}
      <div className={`relative ${itemSupState ? 'flex opacity-100' : 'hidden opacity-0'} gap-6 flex-col w-fit h-fit rounded border border-zinc-700 shadow-lg shadow-zinc-950`}>
        <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
          <PackageMinus className="text-orange-800" width={17} height={17} />
          <span className="relative flex text-zinc-600 font-medium text-sm">Item Supply</span>
          <button disabled={xAccess} onClick={() => { setItemSupState(false) }} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer"><X width={17} height={17} /></button>
        </h2>
        <div className="relative flex w-full items-center h-fit gap-4 px-6">
          <PackageMinus className="text-orange-900 -rotate-12" width={40} height={40} />
          <p className="text-sm">Fill the fields below about the supply.</p>
        </div>
        <div className="relative flex flex-col w-fit h-full ml-16 border border-zinc-800 p-2 rounded gap-4 text-sm">
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Select The Item: </label>
            <Popover open={openSup1} onOpenChange={setOpenSup1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[180px] justify-between py-1 h-fit px-2 border border-zinc-800"
                >
                  <p className='block text-left w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>
                    {supItemID
                      ? props.items.find((item) => item.id === supItemID)?.name
                      : "Select an item..."}
                  </p>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] h-48 overflow-hidden bg-zinc-900 border border-zinc-800 p-1 shadow-md shadow-zinc-950">
                <Command>
                  <CommandInput className='placeholder:text-zinc-600' placeholder={"Search Item..."} />
                  <CommandList>
                    <CommandEmpty className="flex items-center justify-center pb-2 pt-3 gap-2 text-zinc-600 text-sm font-medium"><Container className='text-indigo-400 opacity-30' width={18} height={18} /> No items found.</CommandEmpty>
                    <CommandGroup>
                      {props.items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => {
                            setSupItemData({ supItemID: (supItemID === item.id ? null : item.id), supItemQty: supItemQty, supReason: supReason, supTargetStationID: supTargetStationID });
                            setOpenSup1(false);
                          }}
                          className='text-sm font-medium cursor-pointer active:scale-95 hover:bg-zinc-800 rounded text-ellipsis text-nowrap overflow-hidden'
                        >
                          <Check
                            className={cn(
                              "mr-0 h-4 w-4",
                              supItemID === item.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <p className='block w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>{item.name}</p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="reorder_point">Quantity: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setSupItemData({ supItemID: supItemID, supReason: supReason, supItemQty: parseFloat(isNaN(parseFloat(e.target.value)) ? '0' : e.target.value), supTargetStationID: supTargetStationID })} id="reorder_point" value={(supItemQty ? supItemQty : "")} className='bg-transparent font-medium focus:!outline-zinc-700 !py-1 input-field' min={1} type="number" aria-autocomplete="none" autoComplete="off" inputMode="decimal" placeholder='0 or 0.0' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Target Station: </label>
            <Popover open={openSup2} onOpenChange={setOpenSup2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSup2}
                  className="w-[180px] justify-between py-1 h-fit px-2 border border-zinc-800"
                >
                  <p className='block text-left w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>
                    {supTargetStationID
                      ? props.stations.find((station) => station.id === supTargetStationID)?.name
                      : "(Optional)"}
                  </p>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] h-32 bg-zinc-900 border border-zinc-800 p-1 shadow-md shadow-zinc-950">
                <Command>
                  <CommandInput className='placeholder:text-zinc-600' placeholder={"Search Staion..."} />
                  <CommandList>
                    <CommandEmpty className="flex items-center justify-center pb-2 pt-3 gap-2 text-zinc-600 text-sm font-medium"><Container className='text-indigo-400 opacity-30' width={18} height={18} /> No items found.</CommandEmpty>
                    <CommandGroup>
                      {props.stations.map((station) => (
                        <CommandItem
                          key={station.id}
                          value={station.name}
                          onSelect={() => {
                            setSupItemData({ supTargetStationID: (supTargetStationID === station.id ? null : station.id), supItemQty: supItemQty, supReason: supReason, supItemID: supItemID });
                            setOpenSup2(false);
                          }}
                          className='text-sm font-medium cursor-pointer active:scale-95 hover:bg-zinc-800 rounded text-ellipsis text-nowrap overflow-hidden'
                        >
                          <Check
                            className={cn(
                              "mr-0 h-4 w-4",
                              supTargetStationID === station.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <p className='block w-full overflow-hidden text-nowrap text-ellipsis text-sm font-medium'>{station.name}</p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </fieldset>
          <fieldset className='relative flex gap-2 justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="description">Reason: </label>
            <Textarea value={(supReason ? supReason : "")} maxLength={500} style={{
              borderColor: '#27272a'
            }} onChange={(e) => setSupItemData({ supItemID: supItemID, supItemQty: supItemQty, supReason: e.target.value, supTargetStationID: supTargetStationID })} id="description" className='bg-transparent font-medium !-mt-1 !py-1 max-h-24 focus:ring-zinc-800 placeholder:font-normal input-field' aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='Details about the supply...' />
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
          <Button2 disabeled={(password && supItemID && supItemQty && supReason || supTargetStationID) ? false : true} spinner={isSpinning} value={"Confirm"} onClick={() => { sendSupply() }} />
        </div>
      </div>
      {/* Adding New Items */}
      <div className={`relative ${itemAddState ? 'flex opacity-100' : 'hidden opacity-0'} gap-6 flex-col w-fit h-fit rounded border border-zinc-700 shadow-lg shadow-zinc-950`}>
        <h2 className="relative flex items-center w-full h-fit gap-2 px-2 py-1">
          <Package className="text-blue-800" width={17} height={17} />
          <span className="relative flex text-zinc-600 font-medium text-sm">Adding New Items</span>
          <button disabled={xAccess} onClick={() => { setItemAddState(false); setNewItemData({ newInitQty: null, newItemName: null, newRorderPoint: null, newUnitOfMeasure: null, newItemDescription: null }) }} className="absolute flex w-fit h-fit right-0 mr-2 cursor-pointer"><X width={17} height={17} /></button>
        </h2>
        <div className="relative flex w-full items-center h-fit gap-4 px-6">
          <Package className="text-blue-900 -rotate-12" width={40} height={40} />
          <p className="relative flex w-full text-sm">You can provide details of the new item to fields below.</p>
        </div>
        <div className="relative flex flex-col w-fit h-full ml-16 border border-zinc-800 p-2 rounded gap-4 text-sm">
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="item_name">Item Name: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ newInitQty: newInitQty, newItemName: e.target.value, newRorderPoint: newRorderPoint, newUnitOfMeasure: newUnitOfMeasure, newItemDescription: newItemDescription })} id="item_name" value={(newItemName ? newItemName : "")} className='bg-transparent font-medium !py-1 focus:!outline-zinc-800 input-field' type="text" aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='New name' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="reorder_point">Reorder Point: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ newInitQty: newInitQty, newItemName: newItemName, newRorderPoint: parseFloat(isNaN(parseFloat(e.target.value)) ? '0' : e.target.value), newUnitOfMeasure: newUnitOfMeasure, newItemDescription: newItemDescription })} id="reorder_point" value={(newRorderPoint ? newRorderPoint : "")} className='bg-transparent font-medium !py-1 focus:!outline-zinc-800 input-field' min={1} type="number" aria-autocomplete="none" autoComplete="off" inputMode="decimal" placeholder='0 or 0.0' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="init_qty">Initial Quantity: </label>
            <input style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ newInitQty: parseFloat(isNaN(parseFloat(e.target.value)) ? '0' : e.target.value), newItemName: newItemName, newRorderPoint: newRorderPoint, newUnitOfMeasure: newUnitOfMeasure, newItemDescription: newItemDescription })} id="init_qty" value={(newInitQty ? newInitQty : "")} className='bg-transparent font-medium !py-1 focus:!outline-zinc-800 input-field' min={1} type="number" aria-autocomplete="none" autoComplete="off" inputMode="decimal" placeholder='0 or 0.0 &mdash; (Optional)' />
          </fieldset>
          <fieldset className='relative flex gap-2 items-center justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="unit_of_measure">Unit of Measurement: </label>
            <Select value={newUnitOfMeasure ? newUnitOfMeasure : ""} onValueChange={(value) => setNewItemData({ newInitQty: newInitQty, newItemName: newItemName, newRorderPoint: newRorderPoint, newUnitOfMeasure: value, newItemDescription: newItemDescription })}>
              <SelectTrigger className="relative !px-2 !py-1 !h-fit focus:ring-zinc-800 flex w-36 border-zinc-800 focus:border-zinc-800">
                <SelectValue placeholder="Unit of measure" />
              </SelectTrigger>
              <SelectContent className="relative flex flex-col h-36 overflow-y-auto bg-zinc-900 shadow-lg shadow-zinc-950 border-zinc-800">
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="PCS">PCS</SelectItem>
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="PRS">PRS</SelectItem>
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="PKG">PKG</SelectItem>
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="MTR">MTR</SelectItem>
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="LTR">LTR</SelectItem>
                <SelectItem className="!text-xs font-medium rounded hover:bg-zinc-800" value="KGS">KGS</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset className='relative flex gap-2 justify-between'>
            <label className="font-medium text-zinc-500" htmlFor="description">Description: </label>
            <Textarea value={(newItemDescription ? newItemDescription : "")} maxLength={60} style={{
              borderColor: '#27272a'
            }} onChange={(e) => setNewItemData({ newInitQty: newInitQty, newItemName: newItemName, newRorderPoint: newRorderPoint, newUnitOfMeasure: newUnitOfMeasure, newItemDescription: e.target.value })} id="description" className='bg-transparent font-medium placeholder:font-normal !-mt-1 !py-1 max-h-24 focus:ring-zinc-800 input-field' aria-autocomplete="none" autoComplete="off" inputMode="none" placeholder='Details about the new item...' />
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
          <Button2 disabeled={(password && newItemDescription && newItemName && newRorderPoint && newUnitOfMeasure || newInitQty) ? false : true} spinner={isSpinning} value={"Add Item"} onClick={() => { sendNewItem(); }} />
        </div>
      </div>
    </div>
  )
}

export default Actions;