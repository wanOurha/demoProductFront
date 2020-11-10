import React from "react"

import Loading_Component from "./Loading_Component"
import { useHistory } from "react-router-dom"


function LoadWhenFetch({ action }) {
  const history = useHistory();
  const handleUrl = () => {
    history.push("/")
    history.goBack()
  }

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