import { FaFireExtinguisher, FaSmoking } from "react-icons/fa";
import Carosole from "../carosole/carosole";
import Footer from "../../footer/footer";
import { carosoleImages  } from "../../../data.js";
import './hotelImage.scss'
import { useState } from "react";
export default function HotelImages() {
    const [showCarosole , setShowCarosole] = useState(false);
    function handleClick(){
        setShowCarosole(pre=>true);
    }
    return (
        <>
        {showCarosole &&  <Carosole status={showCarosole} setting={setShowCarosole}/>}
            <section className='hotel-preview'>
                <div className="hotel-images">
                    <div className="main-img">
                        <button onClick={handleClick} style={{height:"100%",border:"none",background:"transparent",translate:"35px"}}><img className='image' src={carosoleImages[2].image} width={"100"} height={"100"} /></button>
                    </div>
                    <div className='side-img'>
                        <button onClick={handleClick} style={{height:"100%",border:"none",background:"transparent"}}><img className='image' src={carosoleImages[1].image} width={"100"} height={"100"} /></button>
                        <button onClick={handleClick} style={{height:"100%",border:"none",background:"transparent"}}><img className='image' src={carosoleImages[2].image} width={"100"} height={"100"} /></button>
                        <button onClick={handleClick} style={{height:"100%",border:"none",background:"transparent"}}><img className='image' src={carosoleImages[3].image} width={"100"} height={"100"} /></button>
                        <button onClick={handleClick} style={{height:"100%",border:"none",background:"transparent"}}><img className='image' src={carosoleImages[0].image} width={"100"} height={"100"} /></button>
                    </div>
                </div>
                <article>
                    <div className="left-article">
                        <h1>Test Hotel</h1>
                        <ul className="facility">
                            <li><i className='bx bx-bed' ></i> <br /> King-size Bed</li>
                            <li><i className='bx bx-buildings' ></i> <br />City View</li>
                            <li><i className='bx bx-coffee' ></i><br />Coffee Maker</li>
                        </ul>
                        <h1>Description</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ea ratione atque eum nostrum officia voluptatem labore quam quisquam doloremque </p>
                        <div>
                            <h1>Offered Amenities</h1>
                            <ul className="amenities">
                                <li><i className='bx bx-bed' ></i> <br /> King-size Bed</li>
                                <li><i className='bx bx-buildings' ></i> <br />City View</li>
                                <li><i className='bx bx-coffee' ></i><br />Coffee Maker</li>
                            </ul>
                        </div>
                        <div className="safety">
                            <h1>Safety And Hygiene</h1>
                            <ul>
                                <li><i className='bx bx-brush-alt' ></i> Daily Cleaning</li>
                                <li><i className='bx bx-first-aid' ></i> Disinfection and Sterilization</li>
                                <li><FaFireExtinguisher /> Fire Extinguiser</li>
                                <li><FaSmoking /> Smoke Detector</li>
                            </ul>
                        </div>

                        <div className="reviews">
                            <h1>Customers Reviews</h1>
                            <ul>
                                <li>Nice</li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-article">
                        <p className="discount"><span>$ 1000</span> | discount 10%. Now <span className="amount">$900</span></p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium saepe, officiis</p>
                        <div className="detaile">
                            <div className="dates">
                                <div className="check">
                                    <label>Check in Date</label>
                                    <input placeholder="Check In Date"  type="date" />
                                </div>
                                <div className="check">
                                    <label>Check in Date</label>
                                    <input placeholder="CheckOut Date" type="date" />
                                </div>
                            </div>
                            <div className="dates">
                                <div className="check">
                                    <label>Check in Date</label>
                                    <input placeholder="No. of Adult" type="data" />
                                </div>
                                <div className="check">
                                    <label>Check in Date</label>
                                    <input placeholder="No. of Children" type="data" />
                                </div>
                            </div>
                        </div>
                        <button>Book Now</button>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    );
}