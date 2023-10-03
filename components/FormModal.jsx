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
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>It's a simple dialog.</DialogHeader>
        <DialogBody divider>
         <ProductFormSkel/>
        </DialogBody>
        <DialogFooter> 
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
