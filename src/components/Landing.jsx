import React from "react";
import Loader from "./Loder";
import Home from "./Home";
const { useState , useEffect } = React;

 function Landing(){

  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },10000);
  },[]);

  return (
    <div>
      { loading ? <Loader/> : <Home/>}
    </div>
  );
}
export default Landing