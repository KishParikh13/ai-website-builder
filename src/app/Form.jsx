

function Form(props) {
    return (
        <div className={props.className}>
            <div className="  h-full">
                <div className="flex flex-col gap-8  h-full">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0  h-full">
                        <form action="#" method="POST"  className="h-full">
                            <div className="overflow-hidden shadow sm:rounded-md  h-full flex flex-col">
                                <div className="bg-white px-4 py-5 sm:p-6 flex-grow">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-row gap-4">
                                            <div className="flex-grow">
                                                <label for="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="flex-grow">
                                                <label for="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            <label for="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                                            <input type="text" name="email-address" id="email-address" autocomplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>

                                        <div className="hidden">
                                            <label for="country" className="block text-sm font-medium text-gray-700">Country</label>
                                            <select id="country" name="country" autocomplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-row gap-4 hidden">
                                            <div className="flex-grow">
                                                <label for="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                                                <input type="text" name="street-address" id="street-address" autocomplete="street-address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="flex-grow">
                                                <label for="city" className="block text-sm font-medium text-gray-700">City</label>
                                                <input type="text" name="city" id="city" autocomplete="address-level2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4 hidden">
                                            <div className="flex-grow">
                                                <label for="region" className="block text-sm font-medium text-gray-700">State / Province</label>
                                                <input type="text" name="region" id="region" autocomplete="address-level1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="flex-grow">
                                                <label for="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>
                                        </div>

                                        <fieldset  className="hidden">
                                        <legend className="sr-only">By Email</legend>
                                        <div className="text-base font-medium text-gray-900" aria-hidden="true">By Email</div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label for="comments" className="font-medium text-gray-700">Comments</label>
                                                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label for="candidates" className="font-medium text-gray-700">Candidates</label>
                                                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label for="offers" className="font-medium text-gray-700">Offers</label>
                                                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        </fieldset>

                                        <fieldset className="hidden">
                                        <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                                        <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center">
                                                <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-everything" className="ml-3 block text-sm font-medium text-gray-700">Everything</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-email" className="ml-3 block text-sm font-medium text-gray-700">Same as email</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">No push notifications</label>
                                            </div>
                                        </div>
                                        </fieldset>

                                        <div className="flex flex-col gap-6 hidden">
                                            <div className="">
                                                <label for="company-website" className="block text-sm font-medium text-gray-700">Website</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span>
                                                    <input type="text" name="company-website" id="company-website" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="about" className="block text-sm font-medium text-gray-700">About</label>
                                            <div className="mt-1">
                                                <textarea id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="you@example.com"></textarea>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500 hidden">Brief description for your profile. URLs are hyperlinked.</p>
                                        </div>

                                        <div  className="hidden">
                                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                                            <div className="mt-1 flex items-center">
                                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </span>
                                                <button type="button" className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label for="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Form;