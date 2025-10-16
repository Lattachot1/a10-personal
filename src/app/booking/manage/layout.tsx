
export default function ManageReservationLayout({children,dashboard,manage}:{children:React.ReactNode,dashboard:React.ReactNode,manage:React.ReactNode}){
    return(
        <div className="flex flex-col w-full h-full">
            {children}
            {dashboard}
            {manage}
        </div>
    )
}