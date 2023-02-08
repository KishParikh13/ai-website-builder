// empty function component

import React from 'react';
import { useState, useEffect } from 'react';
import { TextArea, TextField } from '../components/Fields';
import { Button } from '../components/Button';

const tabs = [
    {
        name: 'Profile',
        href: '#',
        current: true,
    },
    {
        name: 'Projects',
        href: '#',
        current: false,
    },
    {
        name: 'Settings',
        href: '#',
        current: false,
    }
]

function TabsMenu(props) {
    return (
        <div class="flex rounded-md shadow-sm" role="group">
            <button type="button" onClick={e => props.setSelectedTab(tabs[0].name)} class={(props.selectedTab === tabs[0].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg"}>
                {tabs[0].name}
            </button>
            {
                tabs.slice(1, tabs.length-1).map((tab, index) => {
                    return (
                        <button key={index} type="button" onClick={e => props.setSelectedTab(tab.name)} class={(props.selectedTab === tab.name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200"}>
                            {tab.name}
                        </button>
                    )
                })
            }
            <button type="button" onClick={e => props.setSelectedTab(tabs[2].name)} class={(props.selectedTab === tabs[2].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md"}>
                {tabs[tabs.length-1].name}
            </button>
        </div>
    )
}

function ProfileFields(props) {
    return (
        <></>
    )
}

function SiteEditor(props) {

    const [selectedTab, setSelectedTab] = useState('Profile')
    const [saving, setSaving] = useState(false)
    const [projects, setProjects] = useState([])
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1)

    const updateProjects = (index, whichvalue, newvalue) => {
        console.log(index)
        if (index !== -1) {
            let tempProjects = projects.slice();
            tempProjects[index][whichvalue] = newvalue;
            setProjects(tempProjects);
        } else {
            console.log('no match');
        }
    }

    return (
        <div className='flex flex-col gap-4'>

            <TabsMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <h2 className='font-bold text-lg'>{selectedTab}</h2>

            <form className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {
                    selectedTab === 'Profile' && <>
                        <TextField
                            className="col-span-full"
                            type="text"
                            label="Name of site"
                            id="site_name"
                            name="site_name"
                            required
                            value={props.SiteName}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteName(e.target.value)}
                            }
                        />
                        <TextArea
                            className="col-span-full"
                            label="Hero Heading"
                            id="site_hero_heading"
                            name="site_hero_heading"
                            required
                            value={props.SiteHeroHeading}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteHeroHeading(e.target.value)}
                            }
                        />
                        <TextArea
                            className="col-span-full"
                            label="Hero Subheading"
                            id="site_hero_subheading"
                            name="site_hero_subheading"
                            required
                            value={props.SiteHeroSubheading}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteHeroSubheading(e.target.value)}
                            }
                        />
                        {
                            false && props.SiteServices && props.SiteServices.split('\n').filter(service => service.length > 0).map((service, index) => {
                                return (
                                    <TextField
                                        key={index}
                                        className="col-span-full"
                                        type="text"
                                        label={`Service ${index+1}`}
                                        id={`site_service_${index+1}`}
                                        name={`site_service_${index+1}`}
                                        required
                                        value={service}
                                        onChange={e => {
                                            props.setUnsavedChanges(true);
                                            let services = props.SiteServices.split('\n');
                                            services[index] = e.target.value;
                                            props.setSiteServices(services.join('\n'));
                                        }}
                                    />
                                )
                            })
                        }
                    </>
                }
                {
                    selectedTab === 'Projects' && <>
                        <div className="col-span-full">
                            <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                Edit or Create Projects
                            </label>
                            <div className="mt-3 ">
                                <div className="bg-white rounded-lg border border-gray-200 text-gray-900">
                                {
                                    // map through projects where name isnt empty
                                    projects && projects.filter( project => project.name !== "").map((project, index) => {
                                        return (
                                        <a onClick={e => setSelectedProjectIndex(index + 1)} href="#!" aria-current="true" className=" flex justify-between items-center px-4 py-2 border-b border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer">
                                            {project.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </a>
                                        )
                                    })
                                }
                                <a href="#!" aria-current="true" className=" flex justify-between items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-b-lg border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer"
                                onClick={e => {
                                    setProjects([...projects, {name: `Project ${projects.length}`, description: "", link: "", image: "", color: ""}])
                                }} 
                                >
                                Create project
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                </a>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    selectedTab === 'Settings' && <>
                        <TextField
                            className="col-span-full"
                            type="text"
                            label="Call to action"
                            id="site_cta"
                            name="site_cta"
                            required
                            value={props.SiteCTA}
                            onChange={e => props.setSiteCTA(e.target.value)}
                        />
                        <TextField
                            className="col-span-full"
                            type="text"
                            label="CTA Link"
                            id="site_cta_link"
                            name="site_cta_link"
                            required
                            value={props.SiteCTALink}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteCTALink(e.target.value)}
                            }
                        />
                    </>
                }
            </form>
        </div>
    )
}

export default SiteEditor;