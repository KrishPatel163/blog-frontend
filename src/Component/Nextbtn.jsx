import React, { useState } from 'react'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Nextbtn = ({pageno,setPageno,cardslength}) => {
    const[hp,setHp] =useState(true);
    const[hn,setHn] =useState(true);

    function decpageno(){
      if(pageno>1){
        setPageno(pageno-1);
      }
      else{
        setHp(false);
        setHn(true);
      }
    }
    function incpageno(){
        if(pageno<((cardslength/6))){
            setPageno(pageno+1)
        }
        else{
            setHn(false);
            setHp(true);
        }
    }



    return (
        <div className='flex items-center justify-center '>
            <div className="flex items-center justify-center  space-x-2 bg-gray-800 text-white py-2 px-4 rounded-lg w-2/12 ">
               {
                hp &&  <button onClick={decpageno} className="flex items-center">
                <span  className="material-icons mx-2"><GrPrevious /></span> Previous
            </button>
               }
                <div className="flex items-center space-x-1">
                    <button className="text-green-500">{pageno}</button>
                    {/* <button className="text-gray-400">2</button>
                    <span className="text-gray-400">...</span>
                    <button className="text-gray-400">10</button> */}
                </div>
                {
                    hn&& <button onClick={incpageno} className="flex items-center">
                    Next <span className="material-icons mx-2"><GrNext /></span>
                </button>
                }
            </div>
        </div>
    )
}

export default Nextbtn
