"use client";
import Link from "next/link";
import Card from "./Card";
import { useReducer, useState, useRef, useEffect } from "react";
import getVenues from "@/libs/getVenues";

// 1) กำหนด type ให้ชัด
type Venue = {
  id: string;
  name: string;
  picture: string;
  address: string;
  // เติมฟิลด์อื่น ๆ ถ้ามี เช่น province, district, postalcode, tel, dailyrate
};

type VenuesResponse = {
  data: Venue[];
};

export default function CardPanel() {
  // 2) ใส่ generic ให้ useState เพื่อไม่ให้กลายเป็น never
  const [venueResponse, setVenueResponse] = useState<VenuesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 3) เรียก fetchData() จริง ๆ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await getVenues(); // ควร return รูปแบบ { data: Venue[] }
        setVenueResponse(venues);
      } catch (e) {
        setError("Failed to load venues");
        console.error(e);
      }
    };
    fetchData(); // <-- ต้องมีวงเล็บ
  }, []);

  const countRef = useRef(0);

  const compareReducer = (
    compareList: Map<string, number>,
    action: { type: string; venueName: string; rating: number }
  ) => {
    switch (action.type) {
      case "add": {
        compareList.set(action.venueName, action.rating);
        return new Map(compareList);
      }
      case "remove": {
        compareList.delete(action.venueName);
        return new Map(compareList);
      }
      default: {
        return compareList;
      }
    }
  };

  const initialState = new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);

  const [compareList, dispatchCompare] = useReducer(compareReducer, initialState);

  if (error) return <div>{error}</div>;
  if (!venueResponse) return <div>Loading...</div>;

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "space-around",
        }}
      >
        {/* 4) map ด้วย type ที่ถูกต้อง */}
        {venueResponse.data.map((v: Venue) => (
          <Link key={v.id} href={`/venue/${v.id}`} className="w-[25%]">
            <Card
              venueName={v.name}
              imgSrc={v.picture}
              description={v.address}
              onCompare={(venue: string, rating: number) =>
                dispatchCompare({ type: "add", venueName: venue, rating })
              }
            />
          </Link>
        ))}
      </div>

      <div className="w-full text-xl font-medium">Venue List with Ratings: {compareList.size}</div>
      {Array.from(compareList).map(([venue, rating]) => (
        <div
          key={venue}
          data-testid={venue}
          onClick={() => dispatchCompare({ type: "remove", venueName: venue, rating })}
        >
          {venue} Rating: {rating}
        </div>
      ))}

      <button
        className="block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => {
          countRef.current = countRef.current + 1;
          alert(countRef.current);
        }}
      >
        Count with ref Object
      </button>
    </div>
  );
}
