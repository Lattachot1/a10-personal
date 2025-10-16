// src/components/VenueCatalog.tsx
import Link from "next/link";
import Card from "./Card";

type Venue = {
  id: string | number;
  name: string;
  picture: string;
  address: string;
};

type VenueJson = {
  number?: number;
  data: Venue[];
};

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venueJsonReady = await venuesJson;

  return (
    <>
      {/* <div className="text-center text-xl">Explore {venueJsonReady.number} in VenueCatalog</div> */}
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
        {venueJsonReady.data.map((venue: Venue) => (
          <Link
            key={venue.id}
            href={`/venue/${venue.id}`}
            className="w-[25%]"
          >
            <Card
              venueName={venue.name}
              imgSrc={venue.picture}
              description={venue.address}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
