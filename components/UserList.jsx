'use client';
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Admin",
        value: "admin",
    },
    {
        label: "User",
        value: "user",
    },
];

const TABLE_HEAD = ["Member", "Role", "Status", "Member Since", ""];

export default function MembersTable() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [filteredUsers, setFilteredUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Fetch Error: ', error);
            }

        };
        fetchUsers();
    }, []);
    useEffect(() => {
        const filterUsers = async () => {

            try {
                setFilteredUsers(users.filter(user => {
                    if (activeTab === "all") return true;
                    return user.role === activeTab;
                }));
            } catch (error) {
                console.error('Filter Error: ', error);
            }
        };
        if (users) {
            filterUsers();
        }
        console.log("filteredUsers:", filteredUsers, activeTab);
    }, [users, activeTab]);
    return (
        <Card className="w-full h-full mt-4">
            {loading ? <div>Loading</div> :
                <><CardHeader floated={false} shadow={false} className="rounded-none mb-8">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Members list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" size="sm">
                                view all
                            </Button>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={activeTab} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value} onClick={(e) => setActiveTab(value)}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                    </div>
                </CardHeader><CardBody className="overflow-scroll h-72 px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => {
                                    const isLast = index === users.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={user.image} alt={user.name} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal uppercase text-base"
                                                        >
                                                            {user.username}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {user.email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal uppercase"
                                                    >
                                                        {user.role}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user.id}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                {/* <div className="w-max">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value={online ? "online" : "offline"}
                                                            color={online ? "green" : "blue-gray"} />
                                                    </div> */}
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    2020
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                }
                                )}
                            </tbody>
                        </table>
                    </CardBody></>
            }

        </Card>
    );
}