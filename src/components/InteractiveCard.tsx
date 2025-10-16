'use client'
import React from "react";

export default function InteractiveCard({children,contentName}: {children: React.ReactNode; contentName: string} ) { 
    function onvenueClick() {
        alert("You select " + contentName);
    }
    function onCardMouseAction(event: React.SyntheticEvent){
        if(event.type == "mouseover"){
            event.currentTarget.classList.remove("shadow-lg");
            event.currentTarget.classList.add("shadow-2xl","bg-neutral-200","rounded-lg");
        }else if(event.type == "mouseout"){
            event.currentTarget.classList.remove("shadow-2xl","bg-neutral-200","rounded-lg");
            event.currentTarget.classList.add("shadow-lg");
        }
    }
    return(
        <div className="w-full h-[500px] rounded-lg shadow-lg bg-white " 
            //onClick ={()=>onvenueClick()} เติม e.preventcompare(); เพื่อไม่ให้ลิงค์ทำงาน
            onMouseOver={(e)=>onCardMouseAction(e)} 
            onMouseOut={(e)=>onCardMouseAction(e)}>
            {children}
        </div>
    )
}
