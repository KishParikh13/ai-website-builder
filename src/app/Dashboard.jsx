import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { Airtable } from "../api/Airtable";
import DashboardLayout from "./shared/DashboardLayout";

function Dashboard() {

    const base = new Airtable()
    const [sites, setSites] = useState([])

    const logoutUser = () => {
        sessionStorage.removeItem('user')
        window.location.href = '/login'
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (user) {
            // get sites for user
            base.getSitesForUser(JSON.parse(user).id)
                .then(records => {
                    console.log(records)
                    setSites(records)
                })
        } else {
            window.location.href = '/login'
        }


    }, [])

    return (
        <DashboardLayout Title="My sites" Content={
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        sites.map((site, index) => {
                            return (
                                <a key={index} href={`/sites/${site.id}`} className="bg-white hover:bg-slate-100 transition duration-100 overflow-hidden border border-slate-200 rounded-lg">
                                    <div className="p-4 ">
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-shrink-0 bg-slate-500 rounded-md p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                            </div>

                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                    {site.fields.Name}
                                                </h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Created on {' ' + new Date(site.fields.Created).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">View notifications</span>
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                    }

                    <a href="/new" className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-100 overflow-hidden border border-slate-200 rounded-lg">
                        <div className="p-4 ">
                            <div className="flex gap-4 items-center">
                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <svg className="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="text-lg leading-6 font-medium">
                                        Create new portfolio
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-purple-300">
                                        Start from scratch
                                    </p>
                                </div>
                                <div className="ml-auto flex-shrink-0 rounded-full p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        } />
    )
}

export default Dashboard;