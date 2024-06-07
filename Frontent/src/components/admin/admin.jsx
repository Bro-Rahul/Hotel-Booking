import { FaSignOutAlt } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2'
import CreateNewHotelForm from '../hotelForm/createNewHotel'
import { Chart } from 'chart.js/auto'
import './admin.scss'

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'My First Bar Graph',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: [12, 19, 3, 5, 2, 3]
        }
    ]
};


export default function AdminPanel() {
    const data = useSelector(state=>state.auth)
    console.log(data.role)
    const [contentType, setContentType] = useState('Booking');
    function handleClick(msg) {
        setContentType(pre => msg)
    }

    return (
        <section className='admin-panel'>
            <div className="profile-cart">
                <div className="profile-image">
                    <img src="https://imgs.search.brave.com/NQRBwORwTJ3VOfZBXmY-MVxTW5iNPhSU-WSXBoHpWlk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzllLzRk/LzljLzllNGQ5YzI1/ZGMwMGVlMWVmM2M2/MmJmNzY4NzgwMGZl/LmpwZw" width={'100%'} height={'100%'} />
                </div>
                <div className="info">
                    <h2>About</h2>
                    <h2>Rahul Yadav</h2>
                    <p>Sign Out <FaSignOutAlt /></p>
                </div>
            </div>
            <div className="customer-history">
                <div className="ch-top">
                    <h1>Hello, Rahul Yadav </h1>
                    <h6>Joinied in 2023-10-23</h6>
                </div>
                <div className="ch-middle">
                    <p onClick={() => handleClick('Booking')}><span><TbBrandBooking /> </span>Current Booking </p>
                    <p onClick={() => handleClick('Amount Spend')}><span><IoCashOutline /></span> Amount Spent</p>
                </div>
                {contentType === 'Booking' ?
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
                    </table>
                    : <CreateNewHotelForm />
                }

            </div>
        </section >
    )
}

<div style={{ width: '100%', height: '50vh' }}>
    <Bar
        data={data}
        width={100}
        height={50}
        options={{
            maintainAspectRatio: false
        }}
    />
</div>