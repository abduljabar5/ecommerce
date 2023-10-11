"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import CartDrawer from '@components/CartDrawer'
// profile menu component


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
    label: "Edit Profile",
    icon: Cog6ToothIcon,
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
    icon: PowerIcon,
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
      // Call an API to update the user role to admin
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
        console.log(data.success);
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
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={session?.user ? session.user.image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
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
          
          
          return (
            <Link href={label === "DashBoard" ? '/admin' : "#"}>
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

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Account",
    icon: UserCircleIcon,
  },
  {
    label: "Blocks",
    icon: CubeTransparentIcon,
  },
  // {
  //   label: "Docs",
  //   icon: CodeBracketSquareIcon,
  // },
  {
    label: "Sign In",
    icon: UserCircleIcon,
    action: () => signIn('google')
},

];

function NavList() {
  const { data: session } = useSession();
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
    <NavListMenu />
    {navListItems.map(({ label, icon, action }, key) => (
      (!session || label !== "Sign In") && (  // <-- conditionally render
        <Typography 
          key={label}
          as="a"
          variant="small"
          color="blue-gray"
          className="font-normal"
          onClick={action}
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      )
    ))}
  </ul>
  );
}
function SignInButton() {
  const [providers, setProviders] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProviders();
  }, []);

  if (isLoading) {
    return <div className="ms-auto my-auto"> <Spinner /></div>; // or replace with a spinner
  }

  if (error) {
    return <p>Error loading providers. Please try again.</p>;
  }

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            type="button"
            color="blue-gray"
            variant="contained"
            className="ml-auto mr-2 lg:hidden"
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            aria-label={`Sign in with ${provider.name}`}
          >
            Sign in with {provider.name}
          </Button>
        ))}
    </>
  );
}


export default function ComplexNavbar() {
  
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { data: session } = useSession();
console.log(session);
const [passcode, setPasscode] = useState(''); 
  const [error, setError] = useState(null);

  const handlePasscodeSubmit = async () => {
    if (passcode === '0000') {
      // Make an API call to update the user's role to 'admin' in the database
      // If successful, maybe also update session/client-side state to reflect the change
    } else {
      setError("Invalid passcode");
    }
  };
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
    <div><Navbar className="mx-auto p-2 lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ShoppingBagIcon onClick={openDrawerRight} className="h-[18px] w-[18px] ms-auto hover:cursor-pointer" />
        {session?.user ? <ProfileMenu /> : <SignInButton />}
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar><CartDrawer closeDrawerRight = {closeDrawerRight} openRight = {openRight}/></div>
  );
}