import './createNewHotel.scss'
import { FaAngleDown } from "react-icons/fa";
import { useState,useRef } from 'react';
import axios from 'axios'

function Input({htmlfor,type,...rest}){
    return(
        <p>
            <label htmlFor={htmlfor}>
                Enter {htmlfor} 
            </label>
            <input type={type} name={htmlfor} {...rest} />
        </p>
    )
}

export default function CreateNewHotelForm(){
    const [select,setSelect] = useState(true)
    const inputRef = useRef();

    function handleChange(message){
        inputRef.current.value = message
    }
    function handleClick(type){
        handleChange(type)
        setSelect(pre=>!pre)
    }

    async function handleForm(e){
        e.preventDefault();
        const data = new FormData(e.target);

        try {
            const response = await axios.post('http://127.0.0.1:8000/hotel/create', data, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            
            alert(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files.');
        }
    }

  
   
    return (
        <form method='POST' onSubmit={handleForm}>
            <div id='form-wrapper'>
                <Input htmlfor={"Hotel Name"} type={'text'} required/>
                <Input htmlfor={"Hotel Pin"} type={'number'} required/>
                <Input htmlfor={"Hotel Address"} type={"text"} required/>
                <Input htmlfor={"Hotel Rate"} type={'number'} required/>
                <Input style={{height:'45px'}} htmlfor={"images"} type={'file'} required multiple/>
                <Input htmlfor={"Hotel Facility"} type={'text'} required/>
                <div className='hotel-type'>
                    <div>
                        <input ref={inputRef} type="text" name="Hotel Type" defaultValue={'Royal'} onChange={()=>handleChange(mes)}/>
                       <button onClick={()=>setSelect(pre=>!pre)} type='button'><FaAngleDown/> </button>
                    </div>
                   
                    <ul style={select ? {display:'none'}:undefined}>
                        <li onClick={()=>handleClick('Royal')} >Royal</li>
                        <li onClick={()=>handleClick('Simple')} >Simple</li>
                        <li onClick={()=>handleClick('Larged')} >Larged</li>
                        <li onClick={()=>handleClick('Budget')} >Budget</li>
                    </ul>
                </div>
                <button className='form-submit'>submit</button>

            </div>
        </form>
    )
}