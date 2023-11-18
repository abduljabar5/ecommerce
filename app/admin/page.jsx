'use client';
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import UserList from '@components/UserList';
function AdminDashboard() {
    return (
        <div className="w-10/12 max-h-[92.5vh] overflow-y-hidden mx-auto lg:mx-4">
            <div className="grid grid-cols-1 bg-img rounded-2xl md:grid-cols-3 gap-6 mx-auto my-auto py-6">
                <div class="frosted shadow-lg hover:shadow-lg rounded-2xl p-4">
                    <div class="flex items-center">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg">
                            <CurrencyDollarIcon />
                        </div>
                        <div class="flex-shrink-0 ml-3">
                            <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">$3,600</span>
                            <h3 class="text-base font-normal text-gray-500">Today's Money</h3>
                        </div>
                        <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                            +16%
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="frosted shadow-lg hover:shadow-lg rounded-2xl p-4">
                    <div class="flex items-center">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg">
                            <CurrencyDollarIcon />
                        </div>
                        <div class="flex-shrink-0 ml-3">
                            <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">$3,600</span>
                            <h3 class="text-base font-normal text-gray-500">Today's Money</h3>
                        </div>
                        <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                            +16%
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="frosted shadow-lg hover:shadow-lg rounded-2xl p-4">
                    <div class="flex items-center">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg">
                            <CurrencyDollarIcon />
                        </div>
                        <div class="flex-shrink-0 ml-3">
                            <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">$3,600</span>
                            <h3 class="text-base font-normal text-gray-500">Today's Money</h3>
                        </div>
                        <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                            +16%
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            <UserList />
        </div>
    );
}

export default AdminDashboard;
