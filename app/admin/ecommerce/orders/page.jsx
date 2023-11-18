'use client';
import {useEffect, useState} from 'react'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import ChargeTable from '@components/ChargeTable';
const Orders = () => {
  const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  async function fetchCharges() {
    const response = await fetch('/api/getCharges');
    const data = await response.json();
    setData(data.data);
    setLoading(false)
  }
  useEffect(() => {
   fetchCharges();
  }, [])
  
  
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
         </div>
      </CardHeader>
      <CardBody className="overflow-scroll h-[72vh] px-0">
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
         <ChargeTable data = {data} loading = {loading}/>
        </table>
      </CardBody>
      
    </Card>
  )  
}

export default Orders