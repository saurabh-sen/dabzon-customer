import React from 'react'

const index = () => {
    return (
        <>
        <div className="wrap-loader">
            <div className="loader">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="wrap-text">
                    <div className="text"><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span><span>...</span>
                    </div>
                </div>
            </div>
            <div className="loader-text">wait please</div>
            {/* <svg className="animate-spin h-24 w-24 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg> */}
         </div>
        </>
    )
}

export default index