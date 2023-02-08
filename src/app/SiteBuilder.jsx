// empty function component

import React from 'react';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Airtable } from '../api/Airtable';
import SiteDisplay from './SiteDisplay';
import { Button } from '../components/Button';
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

    const [saving, setSaving] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const cleanString = (str) => {
        return str.replace(/(\r\n|\n|\r)/gm, "")
    }

    // load site data from url
    useEffect(() => {
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
            loadSite()
        })
    }

    return (
        <div>
            { site.fields && <>
                <DashboardLayout
                    Title={`Edit ${site.fields.Name}`}
                    // cta1={{text: "Preview Site", target: "_blank", link: `/view/${siteID}`, color: "indigo"}}
                    cta1={
                        <Button
                            type="button"
                            variant="solid"
                            target= "_blank"
                            href= {`/view/${siteID}`}
                            color= "indigo"
                        >
                            <span>View site</span>
                        </Button>
                    }
                    cta2={
                        <Button
                            type="button"
                            variant="solid"
                            color= { saving ? "green" : "slate" }
                            className={ unsavedChanges ? ' ' : 'hidden'}
                            onClick={e => {
                                setSaving(true)
                                saveSiteChanges()
                                setTimeout(() => {
                                    setSaving(false)
                                    setUnsavedChanges(false);
                                }, 2000)
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
                                    <> Save changes <span aria-hidden="true">&uarr;</span> </>
                                }
                            </span>
                        </Button>
                    }
                    hideNav={true}
                    Content={
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                        <div className="grid grid-cols-1 gap-4">
                            <section>
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                        <SiteEditor
                                            unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges}
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
                                        <div className="border-4 border-slate-800 rounded-lg shadow-xl">
                                            <SiteDisplay
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