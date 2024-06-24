import React from "react";

const Background = ({children}) => {
    return(
        <>
            <div className="min-vh-100 w-100 main-content">
                <div className="w-100 py-7 bg-home"/>
                {children}
            </div>
        </>
    )
}

export default Background