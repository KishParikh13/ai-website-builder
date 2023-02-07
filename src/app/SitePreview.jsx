// empty function component

import React from 'react';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Airtable } from '../api/Airtable';

function SiteEditor() {

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
            {
                site.fields &&
                <h1>Site Editor for {site.fields.Name ?? "Loading"}</h1>
            }
        </div>
    )
}

export default SiteEditor;