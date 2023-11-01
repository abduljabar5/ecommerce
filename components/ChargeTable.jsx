import React from 'react'
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { stringify } from 'postcss';
import TableLoader from './TableLoader';
const ChargeTable = ({ data, loading }) => {
    return (
        <tbody>
            {loading ? <tr>
                <td colSpan={5}>
                    <TableLoader />
                </td>
            </tr> : <>
                {data.map((item, index) => {
                    const isLast = index === data.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={item.billing_details.name}>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    {/* <Avatar
                                        src={img}
                                        alt={name}
                                        size="md"
                                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                    /> */}
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {item.billing_details.name}
                                    </Typography>
                                </div>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {item.amount}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {item.currency}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={item.status}
                                        color={
                                            item.status === "succeeded"
                                                ? "green"
                                                : item.status === "pending"
                                                    ? "amber"
                                                    : "red"
                                        }
                                    />
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                        <Avatar
                                            src={
                                                item?.payment_method_details?.card?.brand === "visa"
                                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                            }
                                            size="sm"
                                            alt={item?.payment_method_details?.card?.brand}
                                            variant="square"
                                            className="h-full w-full object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal capitalize"
                                        >
                                            {item?.payment_method_details?.card?.brand.split("-").join(" ")} {item?.payment_method_details?.card?.last4}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {item?.payment_method_details?.card?.exp_month}/{item?.payment_method_details?.card?.exp_year.toString().slice(-2)}
                                        </Typography>
                                    </div>
                                </div>
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
                },
                )}
            </>} </tbody>
    )
}

export default ChargeTable