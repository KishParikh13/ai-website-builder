// empty function component

import React from 'react';
import { useState, useEffect } from 'react';
import { TextArea, TextField, TextFieldGroup, RadioField, RadioGroup, Label } from '../components/Fields';
import { Button } from '../components/Button';
import Accordion from '../components/Accordion';

const tabs = [
    {
        name: 'Profile',
        current: true,
    },
    {
        name: 'Content',
        current: false,
    },
    {
        name: 'Settings',
        current: false,
    }
]

function TabsMenu(props) {
    return (
        <div className="flex rounded-md shadow-sm" role="group">
            <button type="button" onClick={e => props.setSelectedTab(tabs[0].name)} className={(props.selectedTab === tabs[0].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg"}>
                {tabs[0].name}
            </button>
            {
                tabs.slice(1, tabs.length-1).map((tab, index) => {
                    return (
                        <button key={index} type="button" onClick={e => props.setSelectedTab(tab.name)} className={(props.selectedTab === tab.name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border-t border-b border-gray-200"}>
                            {tab.name}
                        </button>
                    )
                })
            }
            <button type="button" onClick={e => props.setSelectedTab(tabs[2].name)} className={(props.selectedTab === tabs[2].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md"}>
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

    const updateProjects = (index, whichvalue, newvalue) => {
        if (index !== -1) {
            let tempProjects = props.SiteProjects.slice();
            tempProjects[index][whichvalue] = newvalue;
            props.setSiteProjects(tempProjects);
        } else {
            console.log('no match');
        }
    }

    const updateServices = (index, whichvalue, newvalue) => {
        if (index !== -1) {
            let tempServices = props.SiteServices.slice();
            tempServices[index][whichvalue] = newvalue;
            props.setSiteServices(tempServices);
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
                            rows="6"
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
                    selectedTab === 'Content' && <>
                        <div className="col-span-full">
                            <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                Projects
                            </label>
                            <div className="mt-3 ">
                                <div className="bg-white rounded-lg border overflow-hidden border-gray-200 text-gray-900">
                                
                                {
                                    props.SiteProjects && props.SiteProjects.filter( project => project.name !== "").map((project, index) => (
                                        <Accordion
                                            key={index}
                                            title={project.name}
                                            content={
                                                <div className='flex flex-col gap-y-6'>
                                                    <TextField
                                                        className="col-span-full"
                                                        type="text"
                                                        label="Name"
                                                        id={`project_name_${index}`}
                                                        name={`project_name_${index}`}
                                                        required
                                                        value={project.name}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateProjects(index, "name", e.target.value);
                                                        }}
                                                    />
                                                    <TextArea
                                                        className="col-span-full"
                                                        label="Description"
                                                        id={`project_description_${index}`}
                                                        name={`project_description_${index}`}
                                                        rows="4"
                                                        required
                                                        value={project.description}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateProjects(index, "description", e.target.value);
                                                        }}
                                                    />
                                                    <TextFieldGroup
                                                        className="col-span-full"
                                                        label="Image URL"
                                                        prefix="https://"
                                                        id={`project_img_${index}`}
                                                        name={`project_img_${index}`}
                                                        required
                                                        value={project.image}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateProjects(index, "image", e.target.value);
                                                        }}
                                                    />
                                                    <TextFieldGroup
                                                        className="col-span-full"
                                                        label="Link"
                                                        prefix="https://"
                                                        id={`project_link_${index}`}
                                                        name={`project_link_${index}`}
                                                        required
                                                        value={project.link}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateProjects(index, "link", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            }
                                        />
                                    ))
                                }
                                <button type="button" className=" flex justify-between items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-b-lg border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer"
                                onClick={e => {
                                    props.setUnsavedChanges(true);
                                    props.setSiteProjects([...props.SiteProjects, {name: `Project ${props.SiteProjects.length+1}`, description: "", link: "", image: "", color: ""}])
                                }} 
                                >
                                Create project
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                Services
                            </label>
                            <div className="mt-3 ">
                                <div className="bg-white rounded-lg border overflow-hidden border-gray-200 text-gray-900">
                                
                                {
                                    props.SiteServices && props.SiteServices.filter( service => service.name !== "").map((service, index) => (
                                        <Accordion
                                            key={index}
                                            title={service.name}
                                            content={
                                                <div className='flex flex-col gap-y-6'>
                                                    <TextField
                                                        className="col-span-full"
                                                        type="text"
                                                        label="Name"
                                                        id={`service_name_${index}`}
                                                        name={`service_name_${index}`}
                                                        required
                                                        value={service.name}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateServices(index, "name", e.target.value);
                                                        }}
                                                    />
                                                    <TextArea
                                                        className="col-span-full"
                                                        label="Description"
                                                        id={`service_description_${index}`}
                                                        name={`service_description_${index}`}
                                                        rows="4"
                                                        required
                                                        value={service.description}
                                                        onChange={e => {
                                                            props.setUnsavedChanges(true);
                                                            updateServices(index, "description", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            }
                                        />
                                    ))
                                }
                                <button type="button" className=" flex justify-between items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-b-lg border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer"
                                    onClick={e => {
                                        props.setUnsavedChanges(true);
                                        props.setSiteServices([...props.SiteServices, {name: `Service ${props.SiteServices.length+1}`, description: ""}])
                                    }} 
                                >
                                    Create service
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
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
                        <div >
                        <TextFieldGroup
                            className="col-span-full"
                            type="text"
                            label="Color of site"
                            id="site_color"
                            name="site_color"
                            prefix={"#"}
                            required
                            // style={{ borderColor: "#" + props.SiteColor}}
                            value={props.SiteColor}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteColor(e.target.value)}
                            }
                        />
                        </div>
                        <TextField
                            className="col-span-full"
                            type="text"
                            label="Call to action text"
                            id="site_cta"
                            name="site_cta"
                            required
                            value={props.SiteCTA}
                            onChange={e => {
                                props.setUnsavedChanges(true);
                                props.setSiteCTA(e.target.value)
                            }}
                        />

                        <div className="col-span-full">
                            <Label className="">
                                CTA Type
                            </Label>
                            <div className='flex gap-4'>
                                <RadioField
                                    id={"radio-ctatype-website"}
                                    label={"Website"}
                                    name={"radio-ctatype"}
                                    value={"website"}
                                    checked={props.SiteCTAType === "website"}
                                    onChange={e => {
                                        props.setSiteCTALink("")
                                        props.setUnsavedChanges(true);
                                        props.setSiteCTAType("website")
                                    }}
                                />
                                <RadioField
                                    id={"radio-ctatype-email"}
                                    label={"Email"}
                                    name={"radio-ctatype"}
                                    value={"email"}
                                    checked={props.SiteCTAType === "email"}
                                    onChange={e => {
                                        props.setSiteCTALink("")
                                        props.setUnsavedChanges(true);
                                        props.setSiteCTAType("email")
                                    }}
                                />
                            </div>
                            {
                                props.SiteCTAType === "website" &&
                                <TextFieldGroup
                                    className="mt-4"
                                    type="text"
                                    placeholder="google.com"
                                    label="CTA Link"
                                    prefix="https://"
                                    id="site_cta_link"
                                    name="site_cta_link"
                                    required
                                    value={props.SiteCTALink}
                                    onChange={e => {
                                        props.setUnsavedChanges(true);
                                        props.setSiteCTALink(e.target.value)}
                                    }
                                />
                            }
                            {
                                props.SiteCTAType === "email" &&
                                <TextField
                                    className="mt-4"
                                    type="text"
                                    placeholder="elon@tesla.com"
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
                            }
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default SiteEditor;