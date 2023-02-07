import Logo from "../components/Logo";

function Dashboard() {

    return (
        <div>
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                    <nav className="bg-gray-800">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="border-b border-gray-700">
                                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                    <div className="flex items-center">
                                        <a href="/dashboard" className="flex-shrink-0">
                                            <Logo fillColor="white" />
                                        </a>
                                    </div>
                                    <div className="block ">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <div className="relative ml-3">
                                                <div>
                                                    <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <header className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-white">My portfolios</h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <a href="#" className="bg-white hover:bg-slate-100 transition duration-100 overflow-hidden border border-slate-200 rounded-lg">
                                    <div className="p-4 ">
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-shrink-0 bg-slate-500 rounded-md p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                            </div>

                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                    Portfolio 1
                                                </h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    This is a portfolio
                                                </p>
                                            </div>
                                            <div className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">View notifications</span>
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#" className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-100 overflow-hidden border border-slate-200 rounded-lg">
                                    <div className="p-4 ">
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                                <svg className="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>

                                            <div>
                                                <h3 className="text-lg leading-6 font-medium">
                                                    Create new portfolio
                                                </h3>
                                                <p className="mt-1 max-w-2xl text-sm text-purple-300">
                                                    Start from scratch
                                                </p>
                                            </div>
                                            <div className="ml-auto flex-shrink-0 rounded-full p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;