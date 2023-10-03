'use client';
import React, { useState } from 'react';
import { Card, CardBody,IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,} from "@material-tailwind/react";
    import {
        PlusIcon,
        HomeIcon,
        CogIcon,
        Square3Stack3DIcon,
      } from "@heroicons/react/24/outline";
       
      import ProductFormSkel from '@components/ProductFormSkel';
      import FormModal from '@components/FormModal';
function AdminProducts() {
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
   
    return (
        <div className="container mx-auto px-4 h-screen overflow-y-auto">
            <FormModal  handleOpen={handleOpen} open= {open} />
            <h1 className="text-3xl font-bold mt-10 mb-6">Products</h1>

            <section className="my-6">
                <h2 className="text-2xl mb-4">View Products</h2>
                {/* Sample card for product */}
                <Card className="max-w-xs">
                    <img src="https://via.placeholder.com/100" alt="product" className="w-full" />
                    <CardBody>
                        <h6 className="text-xl font-semibold">Product Name</h6>
                        <p>Product description...</p>
                    </CardBody>
                </Card>
            </section>
    <div className="fixed right-10 bottom-10">
      <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction>
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction >
    <CogIcon className="h-5 w-5" onClick={() => handleOpen()} />
</SpeedDialAction>

            <SpeedDialAction>
              <Square3Stack3DIcon className="h-5 w-5" />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
        </div>
    );
}

export default AdminProducts;
