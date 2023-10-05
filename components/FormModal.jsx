'use client';
import React,{useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ProductFormSkel from '@components/ProductFormSkel';
export default function DialogDefault({ handleOpen, open }) {
  return (
    <>
      <Dialog open={open} handleOpen={handleOpen}>
        <DialogBody divider>
         <ProductFormSkel open={open} handleOpen={handleOpen}/>
        </DialogBody>
      </Dialog>
    </>
  );
}
