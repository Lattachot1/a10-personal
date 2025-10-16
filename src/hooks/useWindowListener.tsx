
import { useEffect, useState } from "react";

export default function useWindowListener(eventType:string,listener:EventListener){
    //const[winwidth,setWinwidth]=useState(0);
    useEffect(()=>{
        window.addEventListener(eventType,listener);
        //ถ้าใส่ winwidth ใน array ตัว useEffect จะทำงานทุกครั้งที่ winwidth เปลี่ยนแปลง
        //แต่ถ้าใส่ [] ตัว useEffect จะทำงานแค่ตอน component mount เท่านั้น

        return()=>{
            window.removeEventListener(eventType,listener); //clean up
        }
    },[]);
}