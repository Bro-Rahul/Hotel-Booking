import { FaSignOutAlt } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";
import './admin.scss'

export default function AdminPanel() {
    return (
        <section className='admin-panel'>
            <div className="profile-cart">
                <div className="profile-image">
                     <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  width={'100%'} height={'100%'}/> 
                </div>
                <div>
                    <h2>About</h2>
                    <h2>Rahul Yadav</h2>
                    Sign Out <FaSignOutAlt />
                </div>
            </div>
            <div className="customer-history">
                <div className="ch-top">
                    <h1>Hello, Rahul Yadav </h1>
                    <h6>Joinied in 2023-10-23</h6>
                </div>
                <div className="ch-middle">
                        <p><span><TbBrandBooking /> </span>Current Booking </p>
                    <p><span><IoCashOutline /></span> Amount Spent</p>
                </div>

                <table>
                    <tr>
                        <th>ROOM NAME</th>
                        <th>UNIT PRICE</th>
                        <th>DISCOUNT</th>
                        <th>NO. DAYS BOOKED</th>
                        <th>DAYS LEFT</th>
                    </tr>
                    <tr>
                        <td>Rahul Yadav </td>
                        <td>200</td>
                        <td>184</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Rahul Yadav </td>
                        <td>200</td>
                        <td>184</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    
                </table>
            </div>
        </section>
    )
}