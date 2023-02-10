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
    }

    // load site data from url
    useEffect(() => {
        if (siteID !== undefined) {
            base.getSiteByID(siteID)
            .then(response => {
                setSite(response.fields)
            })
        } else {
            window.location.href = '/dashboard'
        }
    }, [siteID]);



    return (
        <div>
            <div className="">
                <SiteDisplay
                    PersonName={site.PersonName}
                    SiteName={site.SiteName}
                    SiteCTA={site.SiteCTA}
                    SiteCTALink={site.SiteCTALink}
                    SiteCTAHeading={site.SiteCTAHeading}
                    SiteColor={site.SiteColor}
                    SiteHeroHeading={site.SiteHeroHeading}
                    SiteHeroSubheading={site.SiteHeroSubheading}
                    SiteServices={ site.SiteServices ? JSON.parse(site.SiteServices): null}
                    SiteProjects={ site.SiteProjects ? JSON.parse(site.SiteProjects): null}
                    SiteRecordID={site.SiteRecordID}
                    SiteImages={site.SiteImages}
                    SiteLogo={site.SiteLogo}
                />
            </div>
        </div>
    )
}

export default SiteView;