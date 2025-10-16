import Link from "next/link";
import styles from "./topmenu.module.css"

export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}){
    return (
        <div className={styles.itemcontainer}>
            <Link href={pageRef}>{title}</Link>
        </div>
    );
}
