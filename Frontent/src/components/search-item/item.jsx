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
    return(
        <div className="item-wrapper">
            <div className="hotel-image">
                <img src="https://imgs.search.brave.com/8zmS_umOIzk7YjDehvdMzrm3JZ-Sgso-CqlhUib3DE4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w" width={'100%'} height={'100%'} />
            </div>
            <div className="hotel-info">
                <div className="title">
                    <p>
                        <h1>Deluxe Suite</h1>
                        <h1>$100</h1>
                    </p>
                    <p>suite Room</p>
                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil ipsum autem cumque ad, perspiciatis cupiditate, illo eaque nam tenetur possimus molestiae eos commodi consequatur tempora error voluptatum deserunt hic fugiat?</p>
                <a href="#"><button>BOOK NOW</button></a>
            </div>
        </div>
    );
}