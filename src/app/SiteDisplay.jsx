// empty function component

import React from 'react';
import { useState, useEffect } from 'react';

function SiteDisplay (props) {

    const SiteNav = () => {
        return (
            <header className="" style={{ backgroundColor: 'black' }}>
                <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
                    <div className="flex w-full items-center justify-between py-3 lg:border-none">
                        <div className="flex items-center">
                            <a href="#">
                                <span className="text-white font-bold text-lg">{props.OwnerName}</span>
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
                    <h1 className='text-4xl font-bold mb-4 max-w-5xl'>
                        {props.SiteHeroHeading}
                    </h1>
                    <h2 className=' opacity-70 max-w-5xl'>
                        {props.SiteHeroSubheading}
                    </h2>
                    <div className="space-x-4 mt-4">
                        <a href={props.SiteCTALink} target="_blank" style={{ backgroundColor: '#' }} className="inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium bg-black text-white hover:bg-gray-800">
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
            <section id="projects-gallery" style={{ backgroundColor: '#' + 'FFFFFF' + '6F' }} className={`px-8 py-16 `+ (props.SiteProjectsGallery ?  '' : 'hidden')}>
                <div className="mx-auto max-w-7xl">

                    <h2 className='text-3xl font-bold mb-4'>
                        Projects
                    </h2>
                    <div className=' grid grid-cols-2 gap-2'>
                    {
                        [1,2,3].filter(project => project > 0).map((project, index) => {
                            return (
                                <div key={index} className=" bg-slate-200 p-4 rounded-md flex flex-col gap-2">
                                    <img className='object-fit rounded-md flex-grow' style={{ backgroundColor: '' + 'green'}} src={""} />
                                    <h3 className=' text-base font-bold'>
                                        {project}
                                    </h3>
                                    <p className=' opacity-70'>
                                        Increasing conversion and facilitating business operations through a website rebuild
                                    </p>
                                    <a href={""} target="_blank" className=' inline-flex justify-center rounded-md bg-slate-600 hover:bg-slate-500 py-4 px-4 text-sm font-medium text-white shadow-sm'>View</a>
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
                    <div className='mx-auto max-w-7xl '>
                        <h2 className='text-3xl font-bold mb-4'>
                            Services
                        </h2>
                        <ul className='grid grid-cols-2 gap-4'>
                            {
                                props.SiteServices && props.SiteServices.split('\n').filter(service => service.length > 0).map((service, index) => {
                                    return (
                                        <li key={index} className="p-4 bg-gray-200 rounded-md">
                                            {service}. Product Strategy: For those looking to test an idea, explore growth strategies, analyze and optimize processes, or clarify overall product direction.
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
                    <h2 className='text-3xl font-bold mb-4 max-w-5xl'>
                        {props.SiteCTAHeading}
                    </h2>
                    <div className="space-x-4 mt-4 max-w-5xl">
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
            <section id="footer" style={{ backgroundColor: 'black' }} className='px-8 py-8 text-white '>
                <div className='mx-auto max-w-7xl '>
                    © {props.OwnerName} {new Date().getFullYear()}
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
            <SiteCTA />
            <SiteFooter />
        </div>
    )
}

export default SiteDisplay;