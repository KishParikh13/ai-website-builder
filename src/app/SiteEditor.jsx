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
                            onChange={e => props.setSiteName(e.target.value)}
                        />
                        <TextArea
                            className="col-span-full"
                            label="Hero Heading"
                            id="site_hero_heading"
                            name="site_hero_heading"
                            required
                            value={props.SiteHeroHeading}
                            onChange={e => props.setSiteHeroHeading(e.target.value)}
                        />
                        <TextArea
                            className="col-span-full"
                            label="Hero Subheading"
                            id="site_hero_subheading"
                            name="site_hero_subheading"
                            required
                            value={props.SiteHeroSubheading}
                            onChange={e => props.setSiteHeroSubheading(e.target.value)}
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
                            onChange={e => props.setSiteCTALink(e.target.value)}
                        />
                    </>
                }
                
                <div className="col-span-full">
                    <Button
                        type="button"
                        variant="solid"
                        color= { saving ? "green" : "slate" }
                        className="w-full"
                        onClick={e => {
                            setSaving(true)
                            props.saveChanges()
                            setTimeout(() => setSaving(false), 2000)
                        }}
                    >
                        <span>
                            {
                                saving ? <div className='flex items-center gap-2'>
                                    Saving...
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                </div>
                                :
                                <>Save changes <span aria-hidden="true">&uarr;</span></>
                            }
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SiteEditor;