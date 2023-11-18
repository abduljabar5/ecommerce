'use client';
import React from 'react';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import GetProduct from '@components/GetProduct';
import FormModal from '@components/FormModal';
function AdminProducts() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col w-full max-h-[88vh]">
      <FormModal handleOpen={handleOpen} open={open} />
      <h1 className="text-3xl font-bold mt-10 mb-6">Products</h1>

      <section className="my-6 w-full overflow-y-auto">

        {/* Sample card for product */}
        <GetProduct view='admin' />
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
