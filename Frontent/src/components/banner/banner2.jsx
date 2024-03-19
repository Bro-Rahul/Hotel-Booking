import Inputs from "../input/input";
import './banner2.scss'
export default function Banner2(){
    return (
        <div className="newsletter">
            <div className="news-detaile">
                <h2>Explore More About Our Hotel</h2>
                <h1>Sign Up for Our NewLetters</h1>
            </div>
            <div className="news-inputs">
                <input type="email"  required placeholder="Email"/>
                <button>subscribe</button>
            </div>
        </div>
    );
}