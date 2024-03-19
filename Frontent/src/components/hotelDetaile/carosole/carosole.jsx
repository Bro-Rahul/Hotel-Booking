import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";
import { carosoleImages } from "../../../data";
import { useEffect, useRef, useState } from "react";
import './carosole.scss'
export default function Carosole({setting,status}){
    const showDialog = useRef();
    useEffect(()=>{
        showDialog.current.showModal();
    },[status]);
    const [images , setImages] = useState({num:0,src:carosoleImages[0].image});
    function handleClose(){
        setting(pre=>false);
    }
    function handleClick(num){
        setImages(pre=>{
            showDialog.current.showModal;
            const len = carosoleImages.length;
            let current;
            if(pre.num === 0 && num===-1){
                current = len-1;
            }else{
                current = (Math.abs(pre.num+num)%len);
            }
            console.log(current)
            return{
                num:current,
                src : carosoleImages[current].image
            }
        })
    }

    return createPortal((
        <dialog className="dialog" ref={showDialog}>
            <form method="dialog" className="dialog">
                <img src={images.src} width={"100%"} height={"90%"} />
                <div className="toggle-btn">
                    <div> 
                        <button type="button" onClick={()=>handleClick(-1)} ><FaArrowLeft/></button>
                        <button type="button" onClick={()=>handleClick(1)} ><FaArrowRight/></button>
                    </div>
                    <button onClick={handleClose} id="close">Close</button>
                </div>
            </form>
        </dialog>
    ),document.getElementById('modal'));
}

