import Item from '../search-item/item'
import './display.scss'
import { data } from '../../data'
export default function Display(){
    return(
        <div className="display-wrap">
            <div className="filter">
                <p className='fil'>Filter By</p>
                <section className="rating">
                    <p className='filter-by'>
                        Property Rating
                    </p>
                    <ul>
                        <li>
                        <input type="checkbox" />
                            5 Star
                        </li>
                        <li>
                        <input type="checkbox" />
                            4 Star
                        </li>
                        <li>
                        <input type="checkbox" />
                            3 Star
                        </li>
                        <li>
                        <input type="checkbox" />
                            2 Star
                        </li>
                        <li>
                        <input type="checkbox" />
                            1 Star
                        </li>
                    </ul>
                </section>
                <section className="rating">
                    <p className='filter-by'>
                        Hotel Type
                    </p>
                    <ul>
                        <li>
                        <input type="checkbox" />
                             Budget
                        </li>
                        <li>
                        <input type="checkbox" />
                            Boutique
                        </li>
                        <li>
                        <input type="checkbox" />
                            Luxury
                        </li>
                        <li>
                        <input type="checkbox" />
                            Resort
                        </li>
                        <li>
                        <input type="checkbox" />
                            Bussiness
                        </li>
                        <li>
                            <input type="checkbox" />
                            Family
                        </li>
                    </ul>
                </section>
            </div>
            <div className="display">
                <div className="display-top">
                    <h2><span>5 </span>Hotel Found in Paris</h2>
                    <p>Sort By <input type="text" /></p>
                </div>
                <div className="items-wrap">
                   {data.map((da)=>{
                    return <Item key={da.hotelName} data={{...da}}/>
                   })}
                </div>
            </div>
            
        </div>
    )
}