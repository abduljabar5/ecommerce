'use client';
import {
    Card, CardBody,
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
    CurrencyDollarIcon,
  } from "@heroicons/react/24/outline";
  
function AdminDashboard() {
    return (
        <div className="bg-gray-100  m-16 px-4 md:px-12">
            <div className="max-w-7xl mx-auto py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardBody>
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CurrencyDollarIcon name="attach_money" size="2xl" color="white" />
                                </div>
                                <div className="ml-4">
                                    <h5 color="gray">Total Revenue</h5>
                                    <p className="text-xl">$12,456</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                    {/* <Icon name="people" size="2xl" color="white" /> */}
                                </div>
                                <div className="ml-4">
                                    <h5 color="gray">Total Users</h5>
                                    <p className="text-xl">5,321</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                    {/* <Icon name="category" size="2xl" color="white" /> */}
                                </div>
                                <div className="ml-4">
                                    <h5 color="gray">Total Categories</h5>
                                    <p className="text-xl">23</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* Rest of the dashboard content */}
        </div>
    );
}

export default AdminDashboard;
