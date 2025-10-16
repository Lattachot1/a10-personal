'use client'
import { Rating } from "@mui/material";
import VideoPlayer from "./VideoPlayer"
import { useState } from "react";
import useWindowListener  from "@/hooks/useWindowListener";


export default function PromoteCard(){

    const [playing, setPlaying]= useState(true);
    const [rating, setRating] = useState(0); 
    const [pointerPosition, setPointerPosition] = useState<{x:number,y:number}>({x:0,y:0});

    useWindowListener("pointermove",(e)=>{
        setPointerPosition({x:(e as PointerEvent).clientX,y:(e as PointerEvent).clientY});
    });
    useWindowListener("contextmenu",(e)=>{
        e.preventDefault();
        alert("Right click is disabled");
    });
    return(
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-1 bg-gray-200 flex-row">
            <VideoPlayer vdoSrc="/video/venue.mp4" isPlaying={playing}></VideoPlayer>
            <div className="m-5"> Book your venue today. ({pointerPosition.x}, {pointerPosition.y})</div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-3 py-2 text-white shadow-sm" 
            onClick={() => setPlaying(!playing)}>
                {playing ? "Pause" : "Play"}
            </button>
            <Rating className="w-full h-[10%] m-2" value={(rating==undefined)?0:rating}
                onChange={(event, newValue) => {
                    setRating(newValue==null?0:newValue);
                }} />
        </div>


    )
}