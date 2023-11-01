'use client';
import { Dialog, DialogBody } from "@material-tailwind/react";
import ProductFormSkel from '@components/ProductFormSkel';
import ProductDetail from "./ProductDetail";
import UpdateProduct from '@components/UpdateProduct';
export default function DialogDefault({ handleOpen, open, product,discountedPrice, update, productId }) {
  return (
    <>
      <Dialog open={open} handleOpen={handleOpen} size='lg' className="bg-transparent shadow-none border-none">
        <DialogBody className="h-[40rem] overflow-scroll">
          {update ? <UpdateProduct open={open} handleOpen={handleOpen}  productId = {productId}/> : <>
            {!product ?  <ProductFormSkel open={open} handleOpen={handleOpen}/> : <ProductDetail product = {product} handleOpen = {handleOpen} discountedPrice = {discountedPrice}/> }
     </> }  </DialogBody>
      </Dialog>
    </>
  );
}