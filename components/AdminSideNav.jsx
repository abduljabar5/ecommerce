'use client';
import React from "react";
import Link from "next/link";

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {AiOutlineClose, AiOutlineMenuUnfold} from 'react-icons/ai'
import { signOut, useSession } from "next-auth/react";
export default function SidebarWithLogo() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); 
    const { data: session } = useSession();

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <> <div className={`absolute z-40 top-6 left-0 h-full w-64 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
            <Card className="h-[88vh] w-full p-4 mt-16 shadow-xl bg-gray-900 shadow-blue-gray-900/5 lg:mt-0">
                <div className="mb-2 flex items-center gap-4 p-4">
                    <img src={session?.user?.image} alt="brand" className="h-12 w-12 rounded-full" />
                    <Typography variant="h5" className="text-gray-300">
                        Admin
                    </Typography>
                </div>

                <List className="h-100" style={{ height: '100%' }}>
                    <Accordion
                        open={open === 1}
                        icon={<ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="white" className="mr-auto font-normal">
                                    Dashboard
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                   <Link href='/admin'>
                                    Dashboard
                                   </Link>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                     Analytics
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    <Link href='/admin/users'>
                                    Users
                                    </Link>
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 2}
                        icon={<ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="white" className="mr-auto font-normal">
                                    E-Commerce
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    <Link href="/admin/ecommerce/orders">
                                       Orders
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    <Link href="/admin/ecommerce/product">
                                        Add Product
                                    </Link>
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-600" />
                    <ListItem className="hover:bg-gray-300 hover:text-black text-gray-300 mt-auto">
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5  hover:text-black" />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal">
                            Inbox
                        </Typography>
                        <ListItemSuffix>
                            <Chip value="14" size="sm" variant="ghost" color="white" className="rounded-full bg-gray-300" />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem className="hover:bg-gray-300 hover:text-black text-gray-300" href='/profile'>
                        <ListItemPrefix className="">
                            <UserCircleIcon className="h-5 w-5 " />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                    <ListItem className="hover:bg-gray-300 hover:text-black text-gray-300">
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <ListItem className="hover:bg-gray-300 hover:text-red-600 text-gray-300" onClick={() => {signOut()}}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>  <button
                onClick={toggleSidebar}
                className={`fixed px-4  py-2 top-16 z-50 ${isSidebarOpen ? 'right-0 text-white' : 'left-64 text-black'} lg:hidden transition-all duration-300`}>
                {isSidebarOpen ?
                    <AiOutlineClose />
                    :
                    <AiOutlineMenuUnfold />}
            </button>
        </div></>
    );
}