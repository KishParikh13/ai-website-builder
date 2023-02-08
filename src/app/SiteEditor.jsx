// empty function component

import React from 'react';
import { useState, useEffect } from 'react';
import { TextArea, TextField } from '../components/Fields';
import { Button } from '../components/Button';

function SiteEditor(site) {
    return (
        <div>
            <h2 className='font-bold text-lg mb-4'>Edit Site</h2>
            <form className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <TextField
                    className="col-span-full"
                    type="text"
                    label="Describe yourself and your skillset"
                    id="self_description"
                    name="self_description"
                    required
                />
                <TextArea
                    className="col-span-full"
                    label="Describe yourself and your skillset"
                    id="self_description"
                    name="self_description"
                    required
                />
                <TextArea
                    className="col-span-full"
                    label="What do you want people on your site to do?"
                    id="site_goal"
                    name="site_goal"
                    required
                />
                <div className="col-span-full">
                    <Button
                        type="button"
                        variant="solid"
                        color="slate"
                        className="w-full"
                    >
                        <span>
                            Save changes <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SiteEditor;