import React from "react";

const Button = ({disabled=false,text="Click",func,width,backgroundColor="#f7f7f9",textColor="383d51",className=""})=>{

   const execute_func = ()=>{
    console.log("clicked");
     func();
   }

   return(
    <>
      <button className={`btn ${className}`} disabled={disabled} onClick={execute_func} style={{width:`${width}%`,backgroundColor:`${backgroundColor}`,color:`${textColor}`,border:`${disabled ? 'none' : ""}`}}>{text}</button>
    </>
   );
}

export default Button;