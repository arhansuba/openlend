import React,{useEffect} from 'react';

const Footer = ()=>{

   useEffect(()=>{
      console.log("footer :)");
    });

   return(
    <>
     <div className='fixed-bottom footer' style={{height:'30px'}}>
      <div className='font-weight-light text-light'>Developed By : Ansh Tiwari</div>
     </div>
    </>
   )
}

export default Footer;