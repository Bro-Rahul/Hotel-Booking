import { IoStarSharp } from "react-icons/io5";
import './item.scss'
function createStart(num){
    switch(num){
        case 1:
            return(
                <IoStarSharp/>
            )
        case 2:
            return(
                <>
                    <IoStarSharp key={1}/>
                    <IoStarSharp key={2}/>
                </> 
            )

        case 3:
            return(
                <>
                    <IoStarSharp key={1}/>
                    <IoStarSharp key={2}/>
                    <IoStarSharp key={3}/>
                </> 
            );
        case 4:
            return(
                <>
                    <IoStarSharp key={1}/>
                    <IoStarSharp key={2}/>
                    <IoStarSharp key={3}/>
                    <IoStarSharp key={4}/>
                </> 
            )
            
        case 5:
            return(
                <>
                <IoStarSharp key={1}/>
                <IoStarSharp key={2}/>
                <IoStarSharp key={3}/>
                <IoStarSharp key={4}/>
                <IoStarSharp key={5}/>
            </> 
            )
    }
}
export default function Item({ data }) {
    const da = [data]
    return (
        <>
            {da.map((el, i) => {

                return (
                    <div key={i} className="item-wrap">
                        <div className="left-img">
                            <img src="https://imgs.search.brave.com/PSTChP-356Hx_Dm-dSJeVw7vZugv_2aPiLbt4kLcuhY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudHJ2bC1tZWRp/YS5jb20vaG90ZWxz/LzIzMDAwMDAwLzIy/ODkwMDAwLzIyODgy/MzAwLzIyODgyMjM2/LzMwMDgxYmMzX3ou/anBn" width={350} height={300} />
                        </div>
                        <div className="right-info">
                            <div className="top">
                                <div className="name-rating">
                                    <p className="stars">
                                       {createStart(el.star)}
                                        <span>luxury</span>
                                    </p>
                                    {el.hotelName}
                                    
                                </div>
                                <p className="rate">Great <span className="num">{el.rating}</span></p>

                            </div>
                            <div className="center">
                                {el.description}
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    {el.assets.map((a,i)=><p key={i}>{a.item}</p>)}
                                    <label >+1</label>
                                </div>
                                <div className="right">
                                    <p className="rate"> <span>${el.rate} </span>per night</p>
                                    <button>View more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
        </>
    )
}