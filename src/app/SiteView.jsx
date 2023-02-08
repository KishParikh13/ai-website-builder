import React from 'react';
import { useState, useEffect } from 'react';
import SiteDisplay from './SiteDisplay';
import { useParams } from 'react-router-dom'
import { Airtable } from '../api/Airtable';

function SiteView (props) {

    const base = new Airtable();
    const { siteID } = useParams()
    const [site, setSite] = useState({});

    const loadSite = () => {
        base.getSiteByID(siteID)
            .then(response => {
                setSite(response.fields)
            })
    }

    // load site data from url
    useEffect(() => {
        if (siteID !== undefined) {
            loadSite()
        } else {
            window.location.href = '/dashboard'
        }
    }, [siteID]);



    return (
        <div>
            <div className="">
                <SiteDisplay
                    OwnerName={site.OwnerName}
                    SiteName={site.SiteName}
                    SiteCTA={site.SiteCTA}
                    SiteCTALink={site.SiteCTALink}
                    SiteCTAHeading={site.SiteCTAHeading}
                    SiteColor={site.SiteColor}
                    SiteHeroHeading={site.SiteHeroHeading}
                    SiteHeroSubheading={site.SiteHeroSubheading}
                    SiteServices={site.SiteServices}
                    SiteRecordID={site.SiteRecordID}
                    SiteImages={site.SiteImages}
                    SiteLogo={site.SiteLogo}
                />
            </div>
        </div>
    )
}

export default SiteView;