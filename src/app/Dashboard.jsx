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
                    setSites(records)
                })
        } else {
            window.location.href = '/login'
        }


    }, [])

    function SiteCreateButton (props) {
        return (
            <a href="/new"  className={"bg-indigo-600 text-white hover:bg-indigo-700 transition duration-100 overflow-hidden border border-slate-200 rounded-lg " + props.className}>
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
        )
    }

    function SitePreviewCard (props) {
        let site = props.site
        
        return(
        <div className="bg-white  transition duration-100 overflow-hidden border border-slate-200 rounded-lg flex flex-col">
            <div className=" border-b border-gray-300  bg-slate-100 opacity-70 hover:opacity-100 transition  duration-100 flex-grow">
                <div className="flex flex-col ">
                    <div className="py-2"  style={{ backgroundColor: "#" +( site.fields.SiteColor) }}></div>
                    <div>
                        <div className="p-6" > 
                            <p className="text- font-extrabold mb-2">{site.fields.SiteHeroHeading}</p>
                            <p className="text-sm text-black/70">{site.fields.SiteHeroSubheading}</p>
                        </div>
                    </div>
                </div>
            </div>
        <div className="p-6">
            <div className="flex flex-col gap-2 items-between justify-center">
                {/* <target="_blank" className=" rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </a> */}

                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {site.fields.Name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Created on {' ' + new Date(site.fields.Created).toLocaleDateString()}
                    </p>
                </div>
                <div className="mt-auto ">
                </div>  
            </div>  
        </div>  
            <div className="px-6  pb-6">
                <div className="flex gap-2">
                    <a href={`/sites/${site.id}`}  className="inline-flex  bg-slate-200 hover:bg-slate-300 text-gray-600 rounded-md py-3 px-8">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg> */}
                        <span>Edit</span>
                    </a>
                    <a href={`/view/${site.id}`} target="_blank" className="inline-flex gap-1 flex-grow text-white rounded-md" style={{ backgroundColor: "#" +( site.fields.SiteColor) }} >
                        <div className="  flex justify-center w-full p-3  transition duration-100 bg-black-0 hover:bg-black/10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            <span className="ml-2 font-medium">Open</span>
                        </div>
                    </a>
                </div>
            </div>
            
        </div>
        )
    }

    return (
        <DashboardLayout Title="My sites" Content={
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        sites.map((site, index) => {
                            return (
                                <SitePreviewCard site={site} key={index} />
                            )
                        })
                    }
                    <SiteCreateButton className={"mb-auto"} />
                    
                </div>
            </div>
        } />
    )
}

export default Dashboard;