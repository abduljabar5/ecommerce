'use client';
import React,{useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductFormSkel from '@components/ProductFormSkel';
import ProductDetail from "./ProductDetail";
export default function DialogDefault({ handleOpen, open, product,discountedPrice }) {
  return (
    <>
      <Dialog open={open} handleOpen={handleOpen} size='lg' className="bg-transparent shadow-none border-none">
        <DialogBody className="h-[40rem] overflow-scroll">
            {!product ?  <ProductFormSkel open={open} handleOpen={handleOpen}/> : <ProductDetail product = {product} handleOpen = {handleOpen} discountedPrice = {discountedPrice}/> }
        </DialogBody>
      </Dialog>
    </>
  );
}
