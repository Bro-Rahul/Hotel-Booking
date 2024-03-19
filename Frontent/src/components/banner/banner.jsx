import './banner.scss'
export default function Banner(){
    return(
        <div className='banner'>
            <div className='banner-right'>
                <div className='topimg'>
                    <img className='image' src="https://mediaassets.cbre.com/-/media/project/cbre/dotcom/global/services/property-types/hotels/hotels-topic-hero.jpeg" width={"100%"} height={"100%"} /> 
                </div>
                <div className='bottomimg'>
                    <div className='bimg'> 
                       <img className='image' src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=1600&height=900" width={"100%"} height={"100%"} /> 
                    </div>
                    <div className='bimg'>
                       <img className='image' src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=1600&height=900" width={"100%"} height={"100%"} /> 
                    </div>
                </div>
            </div>
            <div className='feature'>
                <h1>Featured Room</h1>
                <p>A spacious and luxurious suits with stunning views Enjoy the comfort ans elefance od this beautifuk suite cimoketer eith modern amenities and breathaking cistas os the citi stkline</p>
                <div>
                   <div>
                   <p>Start From <br /><span>$100</span></p>
                    <p>Start From <br /><span>$100</span></p>
                   </div>
                   <button>More Detaile</button>

                </div>
            </div>
        </div>
    );
}