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
                if (response.fields) {
                    window.location.href = `/sites/${response.id}`
                } else {
                    alert(response)
                }
            })
    }


    const GenerateAIContentThenBuildSite = () => {

        setLoadingState('loading')
        const AIGeneratedContent = {}
        const userName = user.fields["Full name"]

        AIGeneratedContent["SiteImages"] = "[]" //JSON.stringify(images)
        AIGeneratedContent["SiteLogo"] = "" //JSON.parse(response).data[0].url
        AIGeneratedContent["SiteCTAHeading"] = "" //JSON.parse(response).choices[0].text
        AIGeneratedContent["SiteCTA"] = "Contact" //JSON.parse(response).choices[0].text
        AIGeneratedContent["SiteCTALink"] = user.fields.Email
        AIGeneratedContent["SiteCTAType"] = "email"

        //generate content 1 by 1
        
        // site name
        getOpenAICompletion({
            "model": "text-davinci-003",
            "prompt": `Create a short catchy name for a portfolio website that belongs to a ${selfDescription} named ${userName}, e.g. "Katie's Design Portfolio", "John's Developer Showcase", "Jane's Creative Website", etc.`,
            "temperature": 0.4,
            "max_tokens": 100
        }).then(response => {
            console.log("done with site name")
            AIGeneratedContent["Name"] = JSON.parse(response).choices[0].text

            // hero heading
            getOpenAICompletion({
                "model": "text-davinci-003",
                "prompt": `Write a catchy professional one line heading for ${userName}'s personal website. In first person, describing a ${selfDescription}, but using their first name only.
                e.g. John is a circus clown who entertains audiences with his humorous performances.,
                Crafting Creative Experiences Through Design and Development.,
                Chris: Exploring the Universe Through Music.
                `,
                "temperature": 0.4,
                "max_tokens": 100
            }).then(response => {
                console.log("done with hero heading")
                AIGeneratedContent["SiteHeroHeading"] = JSON.parse(response).choices[0].text

                // subheading
                getOpenAICompletion({
                    "model": "text-davinci-003",
                    "prompt": `Write a 2-3 sentence subheading for a personal website. In first person, describing ${userName}, a ${selfDescription}, but using their first name only. The subheading will be below this heading: "${AIGeneratedContent["SiteHeroHeading"]}"
                    e.g. I am a trans-disciplinary approach to design, I am able to leave behind the confines of a conventional method by combining UX fundamentals with years of experience in Product Marketing and Branding.,
                    Hello there! 👋 I'm Daniel, a senior product designer based in Toronto currently working with RBC.,
                    I help businesses big and small to turn their ideas into great products their customers love.
                    `,
                    "temperature": 0.8,
                    "max_tokens": 120
                }).then(response => {
                    console.log("done with subheading")
                    AIGeneratedContent["SiteHeroSubheading"] = JSON.parse(response).choices[0].text
                    
                    // services
                    getOpenAICompletion({
                        "model": "text-davinci-003",
                        "prompt": `2 services with a name and description that describe ${userName},
                            a ${selfDescription} who offers: "${siteGoal}.
                            Format response as a an array of JSON objects with a name and description, e.g.
                            [{"name": "Service 1", "description": "Service 1 description"}, {"name": "Service 2", "description": "Service 2 description"}]"
                        `,
                        "temperature": 0.5,
                        "max_tokens": 200
                    }).then(response => {
                        console.log("done with services")
                        let services = JSON.parse(JSON.parse(response).choices[0].text)
                        AIGeneratedContent["SiteServices"] = JSON.stringify(services)

                        // projects
                        getOpenAICompletion({
                            "model": "text-davinci-003",
                            "prompt": `2 projects with a name, description, and link that belong to
                                a ${selfDescription} who offers: "${siteGoal}.
                                Format response as a an array of JSON objects with a catchy name, technical description, and link e.g.
                                [{"name": "Project 1", "description": "Project 1 description", "link": "https://project1.com"}, {"name": "Project 2", "description": "Project 2 description", "link": "https://project2.com"}]"
                            `,
                            "temperature": 0.5,
                            "max_tokens": 200
                        }).then(response => {
                            let projects = JSON.parse(JSON.parse(response).choices[0].text)
                            projects.forEach(project => {
                                project["image"] = `picsum.photos/seed/${project.name}/450/300`
                                project["link"] = project["link"].replace("https://", "")
                            })
                            console.log("done with projects")
                            AIGeneratedContent["SiteProjects"] = JSON.stringify(projects)

                            // site color
                            getOpenAICompletion({
                                "model": "text-davinci-003",
                                "prompt": `The CSS hex code for a color that represents ${selfDescription} and contrasts with white. background-color: #`,
                                "temperature": 0,
                                "max_tokens": 3
                            }).then(response => {
                                console.log("done with site color")
                                AIGeneratedContent["SiteColor"] = JSON.parse(response).choices[0].text


                                // generate site and redirect
                                GenerateSiteAndRedirect(AIGeneratedContent)
                            })
                        })
                        .catch(error => {
                            console.log("projects failed")
                            console.log((error))
                        })
            
                    })
                    .catch(error => {
                        console.log("services failed")
                        console.log((error))
                    })
                })
            })
        })

        // button text
        // getOpenAICompletion({
        //     "model": "text-davinci-003",
        //     "prompt": `Turn the following text into a 2-3 word call to action button (e.g. Contact Me, Learn More, Get in Touch) for a website about ${selfDescription}: ${siteGoal}`,
        //     "temperature": 0.5,
        //     "max_tokens": 3
        // }).then(response => {
        // })


        // cta section header
        // getOpenAICompletion({
        //     "model": "text-davinci-003",
        //     "prompt": `One sentence convincing someone to perform the following action on a website: "buy stuff"`,
        //     "temperature": 0.5,
        //     "max_tokens": 60
        // }).then(response => {
        // })


        // logo image
        // getOpenAIImage({
        //     "prompt": `A simple symbolic representation without words of the following person in a cartoon style: "mickey mouse"`,
        //     "n": 1,
        //     "size": "256x256"
        // }).then(response => {
        // })

        // image gallery
        // getOpenAIImages({
        //     "prompt": `A collection of images that represent the work the following person does: ${"clown with mask and red nose"}"`,
        //     "n": 4,
        //     "size": "256x256"
        // }).then(response => {
        //     let images = JSON.parse(response).data.map(image => image.url)
        // })

        // after 5 seconds, redirect to the site
        // setTimeout(() => {
        //     GenerateSiteAndRedirect(AIGeneratedContent)
        // }
        // , 20000)



    }

    return (
        <>
            <div className='bg-indigo-800 min-h-screen flex justify-center items-center px-4'>
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