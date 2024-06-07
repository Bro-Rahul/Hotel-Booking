
import './hero.scss'
export default function Hero() {
    return (
       <section className='hero' >
        <div className='hero-left'>
            <h1>Explore Our Exquisite Hotel</h1>
            <p>Experience an Exquisite Hotel immersed in Rich History and <br />Timeless Elegance</p>
            <button>Get Started</button>
            <ul className='hotel-types'>
                <li>Basic Room <br /><span>50</span></li>
                <li>Luxury Room <br /><span>120</span></li>
                <li>Suite Room <br /><span>60</span></li>
            </ul>
        </div>
        <div className='hero-right'>
            <div className='right-top'>

            <img className='image' src="https://mediaassets.cbre.com/-/media/project/cbre/dotcom/global/services/property-types/hotels/hotels-topic-hero.jpeg" width={"100%"} height={"100%"} />
            </div>
            <div className='right-bottom'>
                <div className='bottom-1'>
                <img className='image' src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=1600&height=900" width={"100%"} height={"100%"} />
                </div>
                <div className='bottom-2'>
                <img className='image' src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=1600&height=900" width={"100%"} height={"100%"} />
                </div>
            </div>
        </div>
       </section>
    )
}