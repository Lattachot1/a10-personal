"use client";
import styles from './banner.module.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const covers = ['/image/cover.jpg', '/image/cover2.jpg', '/image/cover3.jpg', '/image/cover4.jpg'];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session?.user.token);

  return <div className={styles.banner} onClick={() => {setIndex((index + 1)%4)}}>
    <Image
      src={covers[index]}
      alt="Cover"
      fill={true}
      style={{ objectFit: "cover" }}
      priority
    />
    <div className={styles.bannerText}>
      <h1 className="text-3xl font-serif">where every event finds its venue</h1>
      <h3 className="text-lg font-serif">At Chulalongkorn university</h3>
    </div>
    {
      session? <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl"> Welcome {session.user?.name} </div> : null
    }
    <button className='bg-white text-cyan-800 border border-cyan-800 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-5 
      hover:bg-cyan-800 hover:text-white hover:shadow-lg' onClick={(e)=>{e.stopPropagation(); router.push('/venue')}}>
      Select Venue
    </button>
  </div>;
}
