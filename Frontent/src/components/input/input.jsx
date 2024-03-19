import { Children } from "react";
import './input.scss'
export default function Inputs({icon,...rest}){
    return(
        <p className="para-input">
            {icon}
            <input className="input" {...rest}/>
        </p>
    )
}