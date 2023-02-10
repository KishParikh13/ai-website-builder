// empty function component

import React from 'react';
import { useState, useEffect } from 'react';

function SiteDisplay (props) {

    const SiteNav = () => {
        return (
            <header className=" px-8 " style={{ backgroundColor: '#' + props.SiteColor }}>
                <nav className="mx-auto max-w-7xl " aria-label="Top">
                    <div className="flex w-full items-center justify-between py-3 lg:border-none">
                        <div className="flex items-center">
                            <a href="#">
                                <span className="text-white font-bold text-lg">{props.PersonName}</span>
                            </a>
                        </div>
                        <div className="ml-10 space-x-4">
                            <a href={props.SiteCTALink} target="_blank" className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium hover:bg-indigo-50">
                                {props.SiteCTA}
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

    const SiteHero = () => {
        return (
            <section id="hero" style={{ backgroundColor: '#' + '3F' }} className='px-8 py-16  '>
                <div className="mx-auto max-w-7xl  flex flex-col gap-1">
                    <h1 className='md:text-6xl text-4xl font-bold mb-4 max-w-3xl '>
                        {props.SiteHeroHeading}
                    </h1>
                    <h2 className=' opacity-70 md:text-2xl text-lg max-w-xl'>
                        {props.SiteHeroSubheading}
                    </h2>
                    <div className="space-x-4 mt-4">
                        <a href={props.SiteCTALink} target="_blank"  style={{ backgroundColor: '#' + props.SiteColor }} className="inline-block rounded-md border border-transparent py-3 px-5 text-base md:text-lg font-medium bg-black text-white hover:bg-gray-800">
                            {props.SiteCTA}
                        </a>
                    </div>
                </div>
            </section>
        )
    }

    const SiteImageGallery = () => {
        return (
            <section id="image-gallery" style={{ backgroundColor: '' }} className={`bg-gray-800 px-8 py-16 `+ (props.SiteImageGallery ?  '' : 'hidden')}>
                <div className="mx-auto max-w-7xl grid grid-cols-2 gap-2">
                    {
                        [1,2,3].map((image, index) => {
                            return (
                                <div key={index} className='h-72 bg-white rounded-md'>
                                    <img className='object-cover h-full w-full rounded-md' src={""} />
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        )
    }

    const SiteProjectsGallery = () => {
        return (
            <section id="projects-gallery" style={{ backgroundColor: '#' + 'FFFFFF' + '6F' }} className={`px-8 py-16 `+ (props.SiteProjects ?  '' : 'hidden')}>
                <div className="mx-auto max-w-7xl ">

                    <h2 className='text-3xl mb-8'>
                        Projects
                    </h2>
                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-2'>
                    {
                        props.SiteProjects && props.SiteProjects.map((project, index) => {
                            return (
                                <div key={index} className=" bg-slate-200 text-black p-4 rounded-md flex flex-col gap-2">
                                    {
                                        project.image && <img className='object-fit h-auto w-full rounded-md p-1 mb-2' style={{ backgroundColor: '#' + props.SiteColor }} src={"https://" +project.image} />
                                    }
                                    <h3 className=' text-2xl font-medium '>
                                        {project.name}
                                    </h3>
                                    <p className=' text-md opacity-70'>
                                        {project.description}
                                    </p>
                                    <a href={"https://" + project.link} target="_blank" className=' text-lg underline mt-auto '>View</a>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </section>
        )
    }

    const SiteServices = () => {
        return (
            <section id="services" style={{ backgroundColor: '#' + 'FFFFFF' + '3F' }} className={`px-8 py-16 w-full `+ (props.SiteServices ?  '' : 'hidden')}>
                <div className=" flex flex-col gap-1 ">
                    <div className='mx-auto max-w-7xl  w-full'>
                        <h2 className='text-3xl mb-8'>
                            Services
                        </h2>
                        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {
                                props.SiteServices && props.SiteServices.map((service, index) => {
                                    return (
                                        <li key={index} className=" p-4 bg-slate-100 rounded-md">
                                            <h3 className='text-2xl font-medium mb-2'>{service.name}</h3>
                                            <p className='text-md opacity-70'>{service.description}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
    
    const SiteCTA = () => {
        return (
            <section id="cta" style={{ backgroundColor: '' }} className='bg-gray-800 text-white px-8 py-16 '>
                <div className="mx-auto max-w-7xl flex flex-col gap-1">
                    <h2 className='text-3xl font-bold mb-4 max-w-7xl '>
                        {props.SiteCTAHeading}
                    </h2>
                    <div className="space-x-4 mt-4 max-w-7xl ">
                        <a href="#" className="inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium bg-white text-black hover:bg-gray-50">
                            {props.SiteCTA}
                        </a>
                    </div>
                </div>
            </section>
        )
    }

    const SiteFooter = () => {
        return (
            <section id="footer"  style={{ backgroundColor: '#' + props.SiteColor }} className='px-8 py-8 text-white '>
                <div className='mx-auto max-w-7xl '>
                    © {props.PersonName} {new Date().getFullYear()}
                </div>
            </section>
        )
    }

    const SiteBody = () => {
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <SiteNav />
            <SiteHero />
            <SiteImageGallery />
            <SiteProjectsGallery />
            <SiteServices />
            {/* <SiteCTA /> */}
            <SiteFooter />
        </div>
    )
}

export default SiteDisplay;