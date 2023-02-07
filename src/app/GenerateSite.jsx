import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { SelectField, TextArea, TextField } from '../components/Fields'
import Logo from '../components/Logo'
import { Airtable } from '../api/Airtable'

function GenerateSite() {

    const base = new Airtable()
    
    const [user, setUser] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [siteGoal, setSiteGoal] = useState('')

    // check if user is saved in sessionStorage, redirect to dashboard if so
    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        } else {
            window.location.href = '/login'
        }
    }, [])

    const generateSite = () => {
        base.createSite(user.id, selfDescription, siteGoal)
            .then(response => {
                console.log(response)
                if (response.fields) {

                    window.location.href = `/sites/${response.id}`
                } else {
                    alert(response)
                }
                window.location.href = '/dashboard'
            })
    }

    return (
        <>
            <div className='bg-indigo-800 min-h-screen flex justify-center items-center'>
                <div className='bg-white text-white p-8 rounded-lg'>
                    <div className="flex flex-col">
                        <div className=' flex items-center'>
                            <div aria-label="Home">
                                <Logo className="-ml-4" />
                            </div>
                            <div className="">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Build your portfolio in minutes with AI
                                </h2>
                                <p className="mt-1 text-sm text-gray-700">
                                    Answer a few questions and we'll generate your site for you.
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className="mt-8 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <TextArea
                            className="col-span-full"
                            label="Describe yourself and your skillset"
                            id="self_description"
                            name="self_description"
                            required
                            value={selfDescription}
                            onChange={e => setSelfDescription(e.target.value)}
                        />
                        <TextArea
                            className="col-span-full"
                            label="What do you want people on your site to do?"
                            id="site_goal"
                            name="site_goal"
                            required
                            value={siteGoal}
                            onChange={e => setSiteGoal(e.target.value)}
                        />
                        <div className="col-span-full">
                            <Button
                                type="button"
                                variant="solid"
                                color="slate"
                                className="w-full"
                                onClick={generateSite}
                            >
                                <span>
                                    Generate site <span aria-hidden="true">&rarr;</span>
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default GenerateSite;