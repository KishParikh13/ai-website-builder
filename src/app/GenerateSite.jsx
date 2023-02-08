import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { SelectField, TextArea, TextField } from '../components/Fields'
import Logo from '../components/Logo'
import { Airtable } from '../api/Airtable'
import { getOpenAICompletion, getOpenAIImage, getOpenAIImages } from '../api/OpenAI'

function GenerateSiteAndRedirect() {

    const airtableBase = new Airtable()

    const [user, setUser] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [siteGoal, setSiteGoal] = useState('')

    const [loadingState, setLoadingState] = useState('')

    // check if user is saved in sessionStorage, redirect to dashboard if so
    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        } else {
            window.location.href = '/login'
        }
    }, [])

    const GenerateSiteAndRedirect = (generatedContent) => {
        airtableBase.createSite(user.id, selfDescription, siteGoal, generatedContent)
            .then(response => {
                console.log(response)
                if (response.fields) {
                    console.log(generatedContent)
                    window.location.href = `/sites/${response.id}`
                } else {
                    alert(response)
                }
            })
    }


    const GenerateAIContentThenBuildSite = () => {

        setLoadingState('loading')
        const AIGeneratedContent = {}

        // hero heading
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `Create a 2-3 word name for a portfolio website that belongs to ${user.fields.name}`,
            "temperature": 0.4,
            "max_tokens": 100
        }).then(response => {
            AIGeneratedContent["Name"] = JSON.parse(response).choices[0].text
        })

        // hero heading
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `Rephrase this text to be one concise sentence. In third person, describing John, a circus clown`,
            "temperature": 0.4,
            "max_tokens": 100
        }).then(response => {
            AIGeneratedContent["SiteHeroHeading"] = JSON.parse(response).choices[0].text
        })

        // hero subheading
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `Rewrite this text without using any of the same words in three sentences. Make it professional and in third person, describing ${"John"} but using their first name only: "${"clown with mask"}"`,
            "temperature": 0.8,
            "max_tokens": 100
        }).then(response => {
            AIGeneratedContent["SiteHeroSubheading"] = JSON.parse(response).choices[0].text
        })

        // button text
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `Turn the following text into a 2-3 word call to action for a website button (e.g. Contact Me, Learn More, Get in Touch): ${"buy stuff"}`,
            "temperature": 0.5,
            "max_tokens": 3
        }).then(response => {
            AIGeneratedContent["SiteCTA"] = JSON.parse(response).choices[0].text
        })

        // cta section header
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `One sentence convincing someone to perform the following action on a website: "buy stuff"`,
            "temperature": 0.5,
            "max_tokens": 60
        }).then(response => {
            AIGeneratedContent["SiteCTAHeading"] = JSON.parse(response).choices[0].text
        })

        // services
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `4 services with descriptions that "John", who describes themself as ${"a clown"}, offers: "${"entertainment"}"`,
            "temperature": 0,
            "max_tokens": 200
        }).then(response => {
            AIGeneratedContent["SiteServices"] = JSON.parse(response).choices[0].text
        })

        // logo image
        getOpenAIImage({
            "prompt": `A simple symbolic representation without words of the following person in a cartoon style: "mickey mouse"`,
            "n": 1,
            "size": "256x256"
        }).then(response => {
            AIGeneratedContent["SiteLogo"] = JSON.parse(response).data[0].url
        })

        // site color
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `The CSS hex code for a color that represents "professional". background-color: #`,
            "temperature": 0,
            "max_tokens": 3
        }).then(response => {
            AIGeneratedContent["SiteColor"] = JSON.parse(response).choices[0].text
        })

        // image gallery
        getOpenAIImages({
            "prompt": `A collection of images that represent the work the following person does: ${"clown with mask and red nose"}"`,
            "n": 4,
            "size": "256x256"
        }).then(response => {
            let images = JSON.parse(response).data.map(image => image.url)
            AIGeneratedContent["SiteImages"] = JSON.stringify(images)

            GenerateSiteAndRedirect(AIGeneratedContent)
        })



    }

    return (
        <>
            <div className='bg-indigo-800 min-h-screen flex justify-center items-center'>
                {
                    loadingState === 'loading' ?
                        <div className='bg-white text-slate-700 text-center p-8 flex rounded-lg gap-4'>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700"></div>
                            <p className=' text-lg font-bold '>Generating your portfolio...</p>
                        </div>
                        :

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
                                        onClick={GenerateAIContentThenBuildSite}
                                    >
                                        <span>
                                            Generate site <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default GenerateSiteAndRedirect;