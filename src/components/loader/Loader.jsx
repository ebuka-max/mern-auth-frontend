import React from 'react'
import "./Loader.scss"
import ReactDom from "react-dom"
import loaderImg from "../../assets/loader.gif"

const Loader = () => {
    return ReactDom.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export const Spinner = () => {
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="Loading..." />
        </div>
    )
}

export default Loader



/*  mongoose.connect("mongodb+srv://bukason1234:bukason1234@cluster0.fhblprn.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        // listen for request
        app.listen(port, () => {
            console.log(`connected to database & listen on port, ${port}`);
        })

    })
    .catch((error) => {
        console.log(error);
    })
   */
