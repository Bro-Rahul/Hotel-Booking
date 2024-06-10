import { IoBedOutline } from "react-icons/io5";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

export const Search = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <section className='grid grid-cols-4 px-9 gap-5 mt-1 p-3 bg-orange-200 w-full max-lg:grid-cols-2 max-sm:grid-cols-1'>
            <div className='flex space-x-2 p-2 container bg-white rounded-sm'>
                <IoBedOutline size={'30px'}/>
                <input className='w-full outline-none text-xl font-semibold' type="text" placeholder='Enter the Locations.. ' />
            </div>
            <div className='flex space-x-2 p-2  container  bg-white rounded-sm'>
                <CiCalendarDate size={'30px'}/>
                <DatePicker selected={startDate} onChange={(date=>setStartDate(date))}/>
            </div>
            <div className='flex space-x-2 p-2  container bg-white rounded-sm'>
                <CiCalendarDate size={'30px'}/>
                <DatePicker selected={startDate} onChange={(date=>setStartDate(date))}/>
            </div>
            <div className='flex space-x-2 p-2  container bg-white rounded-sm'>
                <IoPersonOutline size={'30px'}/>
                <input className='w-full outline-none text-xl font-semibold' type="text" placeholder='Number Of Guess.. ' />
            </div>
        </section>
    )
}

export default Search