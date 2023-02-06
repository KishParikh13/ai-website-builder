import Navbar from './Navbar';
import { useState, useEffect } from 'react';


function Builder() {

  const [contentGenerated, setContentGenerated] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);

  const [name, setName] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [siteGoal, setSiteGoal] = useState('')
  const [siteFeeling, setSiteFeeling] = useState('')

  const [loading, setLoading] = useState(false)

  const [siteHeader, setSiteHeader] = useState('')
  const [siteSubheader, setSiteSubheader] = useState('')
  const [siteCTA, setSiteCTA] = useState('')
  const [siteCTALong, setSiteCTALong] = useState('')
  const [siteColor, setSiteColor] = useState('')
  const [siteLogo, setSiteLogo] = useState('')
  const [siteGallery, setSiteGallery] = useState([])

  const [siteServices, setSiteServices] = useState('')

  const [projects, setProjects] = useState([
    {
      name: '',
      description: '',
      image: '',
      link: '',
      color: ''
    }
  ])
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)


  const getOpenAICompletion = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/completions";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Completion Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.choices[0].text
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Completion Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }

  const getOpenAIImage = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Image Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.data[0].url
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Image Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }

  const getOpenAIImages = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Image Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.data
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Images Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }

  const handleServicesOutput = (services) => {
    let servicesArray = services.split('\n').filter((service) => {
      return service !== ''
    })
    setSiteServices(servicesArray)
  }

  const generateSiteCopy = () => {
    setSidebarShow(false)
    setContentGenerated(true)
    setLoading(true)

    // hero heading
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `Rephrase this text to be one concise sentence. In third person, describing ${name}: "${selfDescription}"`,
      "temperature": 0.4,
      "max_tokens": 100
    }, setSiteHeader)

    // hero subheading
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `Rewrite this text without using any of the same words in three sentences. Make it professional and in third person, describing ${name} but using their first name only: "${selfDescription}"`,
      "temperature": 0.8,
      "max_tokens": 100
    }, setSiteSubheader)

    // button text
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `Turn the following text into a 2-3 word call to action for a website button (e.g. Contact Me, Learn More, Get in Touch): ${siteGoal}`,
      "temperature": 0.5,
      "max_tokens": 3
    }, setSiteCTA)

    // cta section header
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `One sentence convincing someone to perform the following action on a website: "${siteGoal}"`,
      "temperature": 0.5,
      "max_tokens": 60
    }, setSiteCTALong)

    // services
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `4 services with descriptions that ${name}, who describes themself as ${selfDescription}, offers: "${siteGoal}"`,
      "temperature": 0,
      "max_tokens": 200
    }, handleServicesOutput)

    // logo image
    getOpenAIImage({
      "prompt": `A simple symbolic representation without words of the following person in a cartoon style: "${selfDescription}"`,
      "n": 1,
      "size": "256x256"
    }, setSiteLogo)

    // site color
    getOpenAICompletion({
      "model": "text-davinci-003",
      "prompt": `The CSS hex code for a color that represents "${siteFeeling}". background-color: #`,
      "temperature": 0,
      "max_tokens": 3
    }, setSiteColor)

    // image gallery
    getOpenAIImages({
      "prompt": `A collection of images that represent the work the following person does: "${selfDescription} who does ${siteGoal} and wants to be seen as ${siteFeeling}"`,
      "n": 4,
      "size": "256x256"
    }, setSiteGallery)

    // set loading to false when all requests to finish
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }

  const updateProjects = (index, whichvalue, newvalue) => {
    console.log(index)
    if (index !== -1) {
      let tempProjects = projects.slice();
      tempProjects[index][whichvalue] = newvalue;
      setProjects(tempProjects);
    } else {
      console.log('no match');
    }
  }


  return (
    <div className="App">
      <body>
        <div className='flex '>

          {/* Form */}
          <div className={`h-screen bg-slate-200 p-8 sticky top-0 ${sidebarShow ? 'w-[80rem]' : 'w-[1rem]'}`}>
            {
              sidebarShow ? (
                <div className={`h-full `}>
                  <div className="flex flex-col gap-4  h-full">
                    <div className="md:col-span-1 flex justify-between">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Site Information</h3>
                        <p className="mt-1 text-sm text-gray-600">Input some details and watch your personal website get autocreated.</p>
                      </div>
                      <div onClick={e => setSidebarShow(false)} className=''>
                        Hide
                      </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0  h-full">
                      <div className="overflow-hidden shadow sm:rounded-md  h-full flex flex-col">
                        <div className="bg-white px-4 py-5 sm:p-6 flex-grow overflow-y-auto">

                          {selectedProjectIndex === 0 ? (
                            <div className="flex flex-col gap-6">
                              <div className="flex flex-row gap-4">
                                <div className="flex-grow">
                                  <label htmlFor="" className="block text-sm font-medium text-gray-700">Full name</label>
                                  <input value={name} onChange={e => setName(e.target.value)} type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                              </div>

                              <div>
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">Describe yourself and your skillset</label>
                                <div className="mt-1">
                                  <textarea value={selfDescription} onChange={e => setSelfDescription(e.target.value)} id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder=""></textarea>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">What do you want people on your site to do?</label>
                                <div className="mt-1">
                                  <textarea value={siteGoal} onChange={e => setSiteGoal(e.target.value)} id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder=""></textarea>
                                </div>
                              </div>
                              <div className="flex-grow">
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Describe how you want your site to feel</label>
                                <input value={siteFeeling} onChange={e => setSiteFeeling(e.target.value)} type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                              </div>

{/* 
                              <div>
                              </div> */}


                              <div className="flex-grow">
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Projects</label>
                                <div class="mt-2 ">
                                  <div class="bg-white rounded-lg border border-gray-200 text-gray-900">
                                  {
                                    // map through projects where name isnt empty
                                    projects.filter( project => project.name !== "").map((project, index) => {
                                      return (
                                        <a onClick={e => setSelectedProjectIndex(index + 1)} href="#!" aria-current="true" class=" flex justify-between items-center px-4 py-2 border-b border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer">
                                          {project.name}
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                          </svg>
                                        </a>
                                      )
                                    })
                                  }
                                  <a href="#!" aria-current="true" class=" flex justify-between items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-b-lg border-gray-200 w-full  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-200 cursor-pointer"
                                    onClick={e => {
                                      setProjects([...projects, {name: `Project ${projects.length}`, description: "", link: "", image: "", color: ""}])
                                    }} 
                                  >
                                    Create project
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                  </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                            :
                            <>
                              <div className="flex flex-col gap-6">
                                <div className='flex justify-between'>
                                <button type='button' className='flex items-center gap-2 p-2 bg-slate-100 rounded-md'
                                  onClick={e => {
                                    setSelectedProjectIndex(0)
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                  </svg>
                                  Back
                                </button>
                                <button type='button' className='flex items-center gap-1 p-2 bg-red-100 hover:bg-red-300 text-red-800 rounded-md transition duration-200'
                                  onClick={e => {
                                    // delete selected project
                                    let tempProjects = projects
                                    tempProjects.splice(selectedProjectIndex, 1)
                                    setProjects(tempProjects)
                                    setSelectedProjectIndex(0)
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                  Delete
                                </button>
                                </div>
                                <div className="flex-grow">
                                  <label htmlFor="" className="block text-sm font-medium text-gray-700">Project name</label>
                                  <input type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={projects[selectedProjectIndex].name}
                                    onChange={e => 
                                      {
                                        updateProjects(selectedProjectIndex, 'name', e.target.value)
                                      }
                                    } 
                                  />
                                </div>
                                <div className="flex-grow">
                                  <label htmlFor="" className="block text-sm font-medium text-gray-700">Image URL</label>
                                  <input type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={projects[selectedProjectIndex].image}
                                    onChange={e => 
                                      {
                                        updateProjects(selectedProjectIndex, 'image', e.target.value)
                                      }
                                    } 
                                  />
                                  <img src={projects[selectedProjectIndex].image} alt="" className="mt-2 w-full h-auto object-fit" />
                                </div>


                                <div>
                                  <label htmlFor="" className="block text-sm font-medium text-gray-700">Color</label>
                                  <input type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={projects[selectedProjectIndex].color}
                                    onChange={e => 
                                      {
                                        updateProjects(selectedProjectIndex, 'color', e.target.value)
                                      }
                                    } 
                                  />
                                </div>

                                <div>
                                  <label htmlFor="" className="block text-sm font-medium text-gray-700">Project link</label>
                                  <input type="text" name="" id="" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={projects[selectedProjectIndex].link}
                                    onChange={e => 
                                      {
                                        updateProjects(selectedProjectIndex, 'link', e.target.value)
                                      }
                                    } 
                                  />
                                </div>
                                <div>
                                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">Describe the project and what you did</label>
                                  <div className="mt-1">
                                    <textarea id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder=""
                                      value={projects[selectedProjectIndex].description}
                                      onChange={e =>
                                        {
                                          updateProjects(selectedProjectIndex, 'description', e.target.value)
                                        }
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button type="button" onClick={e => generateSiteCopy()} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Build Site
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div onClick={e => setSidebarShow(true)} className=' rotate-90'>
                  Show
                </div>
              )
            }
          </div>

          {/* Generated Site */}
          <div className={`relative w-full ${contentGenerated ? '' : 'hidden'}`}>
            <Navbar siteLogo={siteLogo} siteColor={siteColor} cta={siteCTA} />
            <section id="hero" style={{ backgroundColor: '#' + siteColor + '3F' }} className='px-8 py-16  '>
              <div className="mx-auto max-w-7xl  flex flex-col gap-1">
                <h1 className='hidden'>{name}'s Portfolio</h1>
                <h2 className='text-4xl font-bold mb-4 max-w-5xl'>
                  {siteHeader}
                </h2>
                <h3 className=' opacity-70 max-w-5xl'>
                  {siteSubheader}
                </h3>
                <div class="space-x-4 mt-4">
                  <a href="#" style={{ backgroundColor: '#' + siteColor }} class="inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-white hover:bg-gray-50">{siteCTA}</a>
                </div>
              </div>
            </section>

            <section id="image-gallery" style={{ backgroundColor: '#' + siteColor + '6F' }} className='px-8 py-16  '>
              <div className="mx-auto max-w-7xl grid grid-cols-4 gap-2">
                {
                  siteGallery && siteGallery.map((image, index) => {
                    return (
                      <div key={index} className='h-72 bg-gray-200 rounded-md'>
                        <img className='object-cover h-full w-full rounded-md' src={image.url} />
                      </div>
                    )
                  })
                }
              </div>
            </section>
            <section id="projects-gallery" style={{ backgroundColor: '#' + siteColor + '6F' }} className='px-8 py-16  '>
              <div className="mx-auto max-w-7xl grid grid-cols-2 gap-2">
                {
                  projects && projects.filter( project => project.name !== "").map((project, index) => {
                    return (
                      // project card layout
                      <div key={index} className=" bg-white p-4 rounded-md flex flex-col gap-2">
                        <img className='object-fit rounded-md flex-grow' style={{backgroundColor: '' + project.color}}  src={project.image} />
                        <h3 className=' text-base font-bold'>{ project.name}</h3>
                        <p className=' opacity-70'>{project.description}</p>
                        <a href={project.link} target="_blank" className=' inline-flex justify-center rounded-md bg-slate-600 hover:bg-slate-500 py-4 px-4 text-sm font-medium text-white shadow-sm'>View</a>
                      </div>
                    )
                  })
                }
              </div>
            </section>
            <section id="services" style={{ backgroundColor: '#' + siteColor + '3F' }} className='px-8 py-16 w-full'>
              <div className=" flex flex-col gap-1 ">
                <div className='mx-auto max-w-7xl '>
                  <h2 className='text-3xl font-bold mb-4'>
                    Services
                  </h2>
                  <ul className='grid grid-cols-2 gap-4'>
                    {
                      siteServices && siteServices.map((service, index) => {
                        return (
                          <li key={index} className="p-4 bg-white/50 rounded-md">
                            {service}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>

              </div>
            </section>
            <section id="cta" style={{ backgroundColor: '#' + siteColor + '6F' }} className='px-8 py-16 '>
              <div className="mx-auto max-w-7xl flex flex-col gap-1">
                <h2 className='text-3xl font-bold mb-4 max-w-5xl'>
                  {siteCTALong}
                </h2>
                <div class="space-x-4 mt-4 max-w-5xl">
                  <a href="#" class="inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium bg-white text-black hover:bg-gray-50">{siteCTA}</a>
                </div>
              </div>
            </section>
            <section id="footer" style={{ backgroundColor: '#' + siteColor + '' }} className='px-8 py-8 text-white '>
              <div className='mx-auto max-w-7xl '>
                © {name} {new Date().getFullYear()}
              </div>
            </section>
            <section id="loading">
              {
                loading &&
                <div className='absolute bottom-0 top-0 left-0 right-0 bg-white/30 backdrop-blur-xl text-2xl italic'>
                  <p className='h-screen sticky top-0 flex justify-center items-center'>Generating...</p>
                </div>
              }
            </section>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Builder;
