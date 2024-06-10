import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [icon, setIcon] = useState(false);

    const style = 'bg-slate-50 text-black space-y-3 -m-1 px-5 absolute top-20 ' 

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth >= 650) {
            setIcon(false);
        }
    }, [windowWidth]);
    return (
        <div className="bg-blue-800 py-6 space-y-10 px-10">
            <div className="mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                <span className="flex space-x-2 md:visible max-sm:hidden">
                    <Link
                        className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                        to="/my-bookings"
                    >
                        My Bookings
                    </Link>
                    <Link
                        className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                        to="/my-hotels"
                    >
                        My Hotels
                    </Link>
                    <Link
                        to="/sign-in"
                        className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                    >
                        Sign In
                    </Link>
                </span>
                <span className="flex flex-col items-end text-white sm:hidden max-sm:visible" onClick={() => setIcon(icon => !icon)}>
                    {icon ? <ImCancelCircle className='text-[45px]'/> : <IoMenuOutline className='text-[45px]'/>}
                    <ul className={!icon ? style+'hidden':style}>
                        <li className='hover:bg-stone-300 w-full p-1'>My Booking</li>
                        <li className='hover:bg-stone-300 w-full p-1'>My Hotel</li>
                        <li className='hover:bg-stone-300 w-full p-1'>Sign in</li>
                        <li className='hover:bg-stone-300 w-full p-1'>Sing Out</li>
                    </ul>
                </span>
            </div>
            <div className="mx-auto flex flex-col justify-start space-y-2 text-white">
                <h1 className="font-bold text-4xl"> Find Your Next Stay At Booking.io </h1>
                <p className="text-xl">Search low prices on hotels, homes and much more...</p>
            </div>
        </div>
    );
}

export default Header;
