import './imageBanner.scss'
export default function ImageBanner() {
    return (
        <article>
            <div className='banner-left'>
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
            <div id="banner-right" className='banner-right'>
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
        </article>
    );
}