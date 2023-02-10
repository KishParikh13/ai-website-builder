// empty function component

import React from 'react';
import { useState, useEffect } from 'react';
import { TextArea, TextField, TextFieldGroup, RadioField, RadioGroup, Label } from '../components/Fields';
import { Button } from '../components/Button';
import Accordion from '../components/Accordion';

const tabs = [
    {
        name: 'Content',
        current: true,
    },
    {
        name: 'Design',
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

    const [selectedTab, setSelectedTab] = useState(tabs[0].name)

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
                    selectedTab === tabs[0].name && <>
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
                            rows="4"
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
                    selectedTab === tabs[1].name && <> 
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
                    </>
                }
                {
                    selectedTab === tabs[2].name && <>
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
                            <Button
                                className=" w-full gap-2 mt-8 "
                                type="button"
                                variant='outline'
                                color="red"
                                onClick={e => {
                                    let confirmDelete = window.confirm("Are you sure you want to delete this site? This action cannot be undone.");
                                    if (confirmDelete) {
                                        props.deleteSite();
                                    } else {
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                                Delete Site
                            </Button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default SiteEditor;