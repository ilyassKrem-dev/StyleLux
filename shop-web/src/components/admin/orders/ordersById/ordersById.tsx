import { useParams } from "react-router-dom"
import { useTitle } from "../../../../lib/utils/hooks/hooks"
import { useEffect, useState } from "react"
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper"
import NotFoundItem from "../../../../assets/shared/errors/notFound"
import Orders from "../../../../lib/api/admin/orders/Orders"
import { OrderByIdType } from "../../../../lib/utils/types/orderTypes"
import OrderDetails from "./order/orderDetails"




export default function OrdersById() {
    const {id} = useParams()
    const [order,setOrder] = useState<OrderByIdType|null>(null)
    const [show,setShow] = useState<boolean>(false)
    const {session} = useSession()
    useEffect(() => {
        const getOrder = async () => {
            const res = await new Orders(session.uid).getOrderDetails(id)
            if(res?.success) {
                setOrder(res.data as any)
            }
        }
        getOrder()
    },[session,id])
    
    useEffect(() => {
        if(show) return
        const id = setTimeout(() => {
            setShow(true)
        },300)

        return () => clearTimeout(id)
    },[show])

    useTitle("Admin | order: "+id)

    if(show&&!order) {
        return <NotFoundItem />
    }
    return (
        <>
            {show&&order&&<OrderDetails order={order}/>
            }
        </>
    )
}