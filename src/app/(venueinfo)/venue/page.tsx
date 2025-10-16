import CardPanel from "@/components/CardPanel";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";   
import { LinearProgress } from "@mui/material";

export default function Venue(){
    const venues =  getVenues();

    return (
        <main className="text-xl text-center"> 
            <Suspense fallback={<p>Loading venues... <LinearProgress /></p>}>
                <VenueCatalog venuesJson={venues} />
            </Suspense>


            <hr className="m-10"/>
        </main>

    )
}