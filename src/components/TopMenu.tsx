import style from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <div className={style.menucontainer}>
      <Image src="/image/logo.png" alt="Logo" className={style.logoimg} width={0} height={0} sizes="100vh"/>
    { /* <TopMenuItem title="Home" pageRef="/" />
      <TopMenuItem title="About" pageRef="/about" />*/}
      <TopMenuItem title="Booking" pageRef="/booking" />
      {
        session? <Link href="/api/auth/signout" ><div className="flex items-center absolute right-40 h-full px-2 text-cyan-600 text-sm">Sign Out </div></Link>
        : <Link href="/api/auth/signin" ><div className="flex items-center absolute left-5 h-full px-2 text-cyan-600 text-sm">Sign In</div></Link>
      }
     
    </div>
    
  );
}
  