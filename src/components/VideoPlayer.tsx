'use client'
import { useRef,useEffect,useState } from "react";
import  useWindowListener  from "@/hooks/useWindowListener";

export default function VideoPlayer({vdoSrc, isPlaying}:{vdoSrc:string, isPlaying:boolean}) {
    const vdoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(isPlaying){
            vdoRef.current?.play();
        }else{
            vdoRef.current?.pause();
        }
    },[isPlaying]); //ใส่ isPlaying เข้าไปใน array เพื่อให้ useEffect ทำงานเมื่อ isPlaying เปลี่ยนแปลง

    useWindowListener("resize",(e)=>{alert("Window resized to "+ (e.target as Window).innerWidth)});

    return(
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted />
    )
}