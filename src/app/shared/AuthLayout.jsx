function AuthLayout(props) {

    return (
        <div>
            <div className='grid md:grid-cols-2 grid-cols-1 min-h-screen'>
                <div className='md:p-16 p-8'>
                    {props.content}
                </div>
                <div className='bg-blue-600 md:block hidden'></div>
            </div>
        </div>
    )
}

export default AuthLayout;