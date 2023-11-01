"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Badge,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  Bars2Icon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { BsLightningChargeFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { PiSignInBold, PiSignOutLight, PiListChecks } from 'react-icons/pi';

import CartDrawer from '@components/CartDrawer'


function ProfileMenu() {

  const profileMenuItems = [
    {
      label: "DashBoard",
      icon: CubeTransparentIcon,
    },
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "View orders",
      icon: PiListChecks,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Become an Admin",
      icon: CodeBracketSquareIcon, // Use any appropriate icon
      action: () => handleOpen()
    },
    {
      label: "Sign Out",
      icon: PiSignOutLight,
      action: () => signOut()
    }

  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [passcode, setPasscode] = React.useState("");
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleAdminUpgrade = async () => {
    if (passcode === '0000') {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        alert("You are now an admin!");
        setOpen(false);
      } else {
        alert("Error updating role");
      }
    } else {
      alert("Incorrect passcode!");
    }
  }
  const isAdmin = session?.user?.role === 'admin';

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-4"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={session?.user ? session.user.image : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          if (label === "Become an Admin" && isAdmin) {
            return null;
          }

          if (label === "DashBoard" && !isAdmin) {
            return null;
          }
          // link
          let href;
          if (label === "DashBoard") {
            href = '/admin';
          } else if (label === "My Profile") {
            href = '/profile';
          } else if (label === "View orders") {
            href = '/profile/orders'
          } else {
            href = '#';
          }
          return (
            <Link href={href}>
              <MenuItem
                key={label}
                onClick={action}

                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >


                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem></Link>
          );
        })}
      </MenuList>

      <><Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
      >
        <DialogHeader>Enter Password</DialogHeader>
        <DialogBody divider>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
            placeholder="Enter passcode" />
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
          <Button variant="gradient" color="green" onClick={handleAdminUpgrade}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog></>

    </Menu>
  );
}
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: AiFillHome,
    href: "/",
  },
  {
    label: "Sale",
    icon: BsLightningChargeFill,
    href: "/sale"
  },
  {
    label: "Sign In",
    icon: PiSignInBold,
    href: "#",
    action: () => signIn('google')

  },

];

function NavList() {
  const { data: session } = useSession();
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon, href, action }) => (
        (!session || label !== "Sign In") && (
          <Link href={href} onClick={action} className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
            <Typography variant="small" color="blue-gray" className="font-normal">
              {label}
            </Typography>
          </Link>


        )
      ))}
    </ul>
  );
}
export default function ComplexNavbar() {

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { data: session } = useSession();
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex justify-center ">
      <Navbar className="p-5 lg:pl-6 z-30 max-w-none">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-3xl"
          >
            Ecommerce
          </Typography>

          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <div className="ms-auto me-4">
            <Badge className="text-xs font-"> <ShoppingBagIcon onClick={openDrawerRight} className="h-[20px] w-[20px] hover:cursor-pointer" /></Badge>
          </div>
          {session?.user ? <ProfileMenu /> : ''}
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="lg:ml-0  mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar><CartDrawer closeDrawerRight={closeDrawerRight} openRight={openRight} /></div>
  );
}