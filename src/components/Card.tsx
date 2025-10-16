"use client"
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from '@mui/material';
import { useState } from "react"; 
import { on } from "events";


export default function Card({venueName,imgSrc,description,onCompare}: {venueName: string; imgSrc: string; description: string; onCompare?:Function}) { 

    const [rating, setRating] = useState<number | null>(null);

    return(
        <InteractiveCard contentName={venueName} >
            {/* ส่วนรูปภาพ */}
            <div className="relative w-full h-[70%] rounded-t-lg">
                <Image 
                    src={imgSrc}
                    alt={venueName} 
                    fill={true} 
                    className="object-cover rounded-t-lg" 
                />
            </div>

            {/* ส่วนข้อความ */}
            <div className="w-full p-[10px]">
                <h2 className="text-lg font-bold">{venueName}</h2>
                <p className="text-sm mt-1">{description}</p>  
                <span className="text-sm font-bold block mt-1">300$/hour</span>
            </div>

            {/* 
                <button className="block h-[25px] text-sm rounded-md bg-sky-600 hover:bg-indigo-700 text-white shadow-sm mx-2"
                    onClick={(e)=>{e.stopPropagation(); onCompare(venueName)}}>
                    Book Now
                </button> */}
                { onCompare?
                    <Rating 
                    id={venueName + " Rating"}
                    name={venueName + " Rating"}
                    data-testid={venueName + " Rating"}

                    value={rating}
                    precision={0.5}
                    onClick={(e)=>e.stopPropagation()}
                    onChange={(e,value)=>{e.stopPropagation();setRating(value);onCompare(venueName,value)}} />
                :""}
        </InteractiveCard>
    )
}
