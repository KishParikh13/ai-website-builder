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

    const [OwnerName, setOwnerName] = useState('');
    const [SiteName, setSiteName] = useState('');
    const [SiteCTA, setSiteCTA] = useState('');
    const [SiteCTALink, setSiteCTALink] = useState('');
    const [SiteCTAHeading, setSiteCTAHeading] = useState('');
    const [SiteColor, setSiteColor] = useState('');
    const [SiteHeroHeading, setSiteHeroHeading] = useState('');
    const [SiteServices, setSiteServices] = useState('');
    const [SiteHeroSubheading, setSiteHeroSubheading] = useState('');
    const [SiteRecordID, setSiteRecordID] = useState('');
    const [SiteImages, setSiteImages] = useState('');
    const [SiteLogo, setSiteLogo] = useState('');

    const cleanString = (str) => {
        return str.replace(/(\r\n|\n|\r)/gm, "")
    }

    // load site data from url
    useEffect(() => {
        console.log(siteID)
        if (siteID !== undefined) {
            loadSite()
        } else {
            window.location.href = '/dashboard'
        }
    }, [siteID]);

    const loadSite = () => {
        base.getSiteByID(siteID)
                .then(response => {
                    setSite(response)
                    let siteFields = response.fields
                    setOwnerName(siteFields.OwnerName)
                    setSiteName(siteFields.Name)
                    setSiteCTA(siteFields.SiteCTA)
                    setSiteCTAHeading(siteFields.SiteCTAHeading)
                    setSiteColor(siteFields.SiteColor)
                    setSiteServices(siteFields.SiteServices)
                    setSiteHeroHeading(cleanString(siteFields.SiteHeroHeading))
                    setSiteHeroSubheading(cleanString(siteFields.SiteHeroSubheading))
                    setSiteRecordID(siteFields.SiteRecordID)
                    setSiteImages(siteFields.SiteImages)
                    setSiteLogo(siteFields.SiteLogo)
                })
    }

    const saveSiteChanges = () => {
        base.updateSiteByID(siteID, {
            "Name": SiteName,
            "SiteCTA": SiteCTA,
            "SiteCTAHeading": SiteCTAHeading,
            "SiteColor": SiteColor,
            "SiteHeroHeading": SiteHeroHeading,
            "SiteServices": SiteServices,
            "SiteHeroSubheading": SiteHeroSubheading,
            "SiteImages": SiteImages,
            "SiteLogo": SiteLogo
        })
        .then (response => {
            console.log(response)
        })
    }

    return (
        <div>
            { site.fields && <>
                <DashboardLayout
                    Title={`Edit ${site.fields.Name}`}
                    cta={{text: "Preview Site", link: "/", color: "indigo"}}
                    hideNav={true}
                    Content={
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                        <div className="grid grid-cols-1 gap-4">
                            <section>
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                        <SiteEditor
                                            saveChanges={saveSiteChanges}
                                            OwnerName={OwnerName} setOwnerName={setOwnerName}
                                            SiteName={SiteName} setSiteName={setSiteName}
                                            SiteCTA={SiteCTA} setSiteCTA={setSiteCTA}
                                            SiteCTALink={SiteCTALink} setSiteCTALink={setSiteCTALink}
                                            SiteCTAHeading={SiteCTAHeading} setSiteCTAHeading={setSiteCTAHeading}
                                            SiteColor={SiteColor} setSiteColor={setSiteColor}
                                            SiteHeroHeading={SiteHeroHeading} setSiteHeroHeading={setSiteHeroHeading}
                                            SiteHeroSubheading={SiteHeroSubheading} setSiteHeroSubheading={setSiteHeroSubheading}
                                            SiteServices={SiteServices} setSiteServices={setSiteServices}
                                            SiteRecordID={SiteRecordID} siteRecordID={setSiteRecordID}
                                            SiteImages={SiteImages} setSiteImages={setSiteImages}
                                            SiteLogo={SiteLogo} setSiteLogo={setSiteLogo}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                            <section aria-labelledby="section-1-title">
                                <h2 className="sr-only" id="section-1-title">Site Preview</h2>
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                        <SitePreview
                                            OwnerName={OwnerName}
                                            SiteName={SiteName}
                                            SiteCTA={SiteCTA}
                                            SiteCTALink={SiteCTALink}
                                            SiteCTAHeading={SiteCTAHeading}
                                            SiteColor={SiteColor}
                                            SiteHeroHeading={SiteHeroHeading}
                                            SiteHeroSubheading={SiteHeroSubheading}
                                            SiteServices={SiteServices}
                                            SiteRecordID={SiteRecordID}
                                            SiteImages={SiteImages}
                                            SiteLogo={SiteLogo}
                                        />
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