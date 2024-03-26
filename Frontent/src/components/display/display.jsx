import Item from '../search-item/item'
import Search from '../search/search'
import './display.scss'
import { data } from '../../data'
export default function Display(){
    return(
       <>
        <section className='display-grid'>
            <Search/>
           <div className='hotel-wrapper'>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
           </div>
       </section>
       </>
    )
}