import { useState , useRef} from 'react'
import './search.scss'
export default function Search(){
    const [showModal , setshowModel] = useState(false);
    const [selectedType , setSelectedType] = useState("All");
    const sortby = useRef();
    function handleClick(){
        setshowModel(pre=>!pre);
    }
    function selectType(type){
        setSelectedType(pre=>pre = type);
        setshowModel(false);
        sortby.current.innerText = type;
    }
    return(
        <div className='search'>
            <div className='room-type'> 
                Room Type
                <p><li ref={sortby}>All</li><button onClick={handleClick}><i className='bx bx-chevron-down'></i></button></p>
                <ol className={showModal ? 'show' : 'hidden'}>
                    <li onClick={()=>selectType('Royal')}>Royal</li>
                    <li onClick={()=>selectType('Classic')}>Classic</li>
                    <li onClick={()=>selectType('Grand')}>Grand</li>
                </ol>
            </div>
            <input type="text" placeholder='Search' />
            <button className='searchbtn'>Search</button>
        </div>
    )
}