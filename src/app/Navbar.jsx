function Navbar (props) {
    return (
      <header className="" style={{backgroundColor: '#' + props.siteColor + ''}}>
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-3 lg:border-none">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">Your Company</span>
                <img className="h-10 w-auto" src={props.siteLogo} alt="" />
              </a>
              <div className="ml-10 hidden space-x-8">
                <a href="#" className="text-base font-medium text-white hover:text-indigo-50">Solutions</a>
  
                <a href="#" className="text-base font-medium text-white hover:text-indigo-50">Pricing</a>
  
                <a href="#" className="text-base font-medium text-white hover:text-indigo-50">Docs</a>
  
                <a href="#" className="text-base font-medium text-white hover:text-indigo-50">Company</a>
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <a href="#" className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium hover:bg-indigo-50">{props.cta}</a>
            </div>
          </div>
        </nav>
      </header>
    );
  
  }

  export default Navbar;