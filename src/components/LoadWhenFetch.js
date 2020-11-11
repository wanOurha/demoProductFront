import React from "react"

import Loading_Component from "./Loading_Component"


function LoadWhenFetch({ action }) {
  

  if (action==true) {
    console.log("true")
    return <Loading_Component/>
  }

  if (action==false) {
    console.log("false")
    return (<div>
    </div>) 
  }

}

export default LoadWhenFetch;