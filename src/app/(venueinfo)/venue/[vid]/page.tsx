import Image from "next/image";
import getVenue from "@/libs/getVenue";
import { PageProps } from "../../../../../.next/types/app/layout";

export default async function VenueDetailPage({ params }: PageProps) {
    const { vid } = await params;  
    const venueDetail = await getVenue(vid);

    return (
        <main className=" text-center p-5">
            <h1 className="text-lg font-medium "> {venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={venueDetail.data.picture} alt="Venue" width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]" />
                <div className="text-md mx-5"> {venueDetail.data.name}
                    <div className="text-md mx-5">address: {venueDetail.data.address}</div>
                    <div className="text-md mx-5">province: {venueDetail.data.province}</div>
                    <div className="text-md mx-5">district: {venueDetail.data.district}</div>
                    <div className="text-md mx-5">postalCode: {venueDetail.data.postalcode}</div>
                    <div className="text-md mx-5">tel: {venueDetail.data.tel}</div>
                    <div className="text-md mx-5">dailyRate: {venueDetail.data.dailyrate}</div>
                </div>

            </div>
        </main>
    );
}

