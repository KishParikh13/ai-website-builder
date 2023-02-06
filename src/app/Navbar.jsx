

function Navbar (props) {
    return (
      <header class="" style={{backgroundColor: '#' + props.siteColor + ''}}>
        <nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div class="flex w-full items-center justify-between py-3 lg:border-none">
            <div class="flex items-center">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <img class="h-10 w-auto" src={props.siteLogo} alt="" />
              </a>
              <div class="ml-10 hidden space-x-8">
                <a href="#" class="text-base font-medium text-white hover:text-indigo-50">Solutions</a>
  
                <a href="#" class="text-base font-medium text-white hover:text-indigo-50">Pricing</a>
  
                <a href="#" class="text-base font-medium text-white hover:text-indigo-50">Docs</a>
  
                <a href="#" class="text-base font-medium text-white hover:text-indigo-50">Company</a>
              </div>
            </div>
            <div class="ml-10 space-x-4">
              <a href="#" class="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium hover:bg-indigo-50">{props.cta}</a>
            </div>
          </div>
        </nav>
      </header>
    );
  
  }

  export default Navbar;