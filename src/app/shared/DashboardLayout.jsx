import { Button } from "../../components/Button";
import Logo from "../../components/Logo";

function DashboardLayout(props) {

    const logoutUser = () => {
        sessionStorage.removeItem('user')
        window.location.href = '/login'
    }

    return (
        <div>
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">

                    {
                        !props.hideNav &&
                        <nav className="bg-gray-800">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="border-b border-gray-700">
                                    <div className=" flex h-16 items-center justify-between px-4 sm:px-0 ">
                                        <div className="flex items-center">
                                            <a href="/dashboard" className="flex-shrink-0">
                                                <Logo fillColor="white" />
                                            </a>
                                        </div>
                                        <div className="block ">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <div className="relative ml-3">
                                                    <div>
                                                        <Button
                                                            onClick={e => logoutUser()}
                                                            variant="solid"
                                                            type="button"
                                                            color="slate"
                                                            className={" bg-transparent hover:bg-white/10 px-2 py-1"}
                                                        >
                                                            Logout
                                                        </Button>
                                                            
                                                        {/* <button onClick={e => logoutUser()} type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                                            <span className="sr-only">Open user menu</span>
                                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    }

                    <header className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-4 justify-between md:flex-row flex-col">
                            <div className="flex items-center gap-4">
                                {
                                props.hideNav &&
                                <a href="/dashboard" className="text-white text-2xl">
                                    &larr;
                                </a>
                                }
                                <h1 className="text-3xl font-bold tracking-tight text-white">{props.Title}</h1>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap justify-end">
                                {props.cta2}
                                {props.cta1}
                            </div>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        {props.Content}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;