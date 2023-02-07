// empty function component

import React from 'react';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Airtable } from '../api/Airtable';
import SitePreview from './SitePreview';
import Logo from '../components/Logo';
import DashboardLayout from './shared/DashboardLayout';
import SiteEditor from './SiteEditor';

function SiteBuilder() {

    const base = new Airtable();
    const { siteID } = useParams()

    const [site, setSite] = useState({});

    // load site data from url
    useEffect(() => {
        if (siteID.length > 5) {
            base.getSiteByID(siteID)
                .then(response => {
                    setSite(response)
                })
        } else {
            window.location.href = '/dashboard'
        }
    }, [siteID]);

    return (
        <div>
            { site.fields && <>
                <DashboardLayout Title={`Edit ${site.fields.Name}`} Content={
                    <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                        <div class="grid grid-cols-1 gap-4">
                            <section aria-labelledby="section-2-title">
                                <h2 class="sr-only" id="section-2-title">Section title</h2>
                                <div class="overflow-hidden rounded-lg bg-white shadow">
                                <div class="p-6">
                                    <SiteEditor />
                                </div>
                                </div>
                            </section>
                        </div>

                        <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                            <section aria-labelledby="section-1-title">
                                <h2 class="sr-only" id="section-1-title">Site Preview</h2>
                                <div class="overflow-hidden rounded-lg bg-white shadow">
                                    <div class="p-6">
                                        <SitePreview site={site} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                } />
            </> }
        </div>
    )
}

export default SiteBuilder;