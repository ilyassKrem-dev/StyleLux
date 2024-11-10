import { FaArrowLeft } from "react-icons/fa"
import { OrderByIdType } from "../../../../../lib/utils/types/orderTypes"
import { Link } from "react-router-dom"




export default function OrderDetails({order}:{
    order:OrderByIdType
}) {
    const {id,products,client,city,country,address,postalCode,status} = order
    return (
        <div className="mt-2">
            <div className="rounded-md w-full bg-white dark:bg-dark p-2 px-4 border-black/10 dark:border-white/10 shadow-md border dark:text-white">
                <div className=" flex justify-center items-center relative">
                    <div className="flex flex-col items-center">
                        <h1 className=" font-bold text-2xl text-center">Order {id}</h1>
                        <p className={`capitalize font-semibold text-sm ${status == "refunded" ? "text-black/70 dark:text-white/70": status == "shipping"?"text-green-400": status === "pending"?"text-blue-400":""}`}>{order.status}</p>
                        <p className=" capitalize font-semibold">${order.total}</p>
                    </div>
                    <Link to={"/admin/orders"} className="absolute left-3 text-xl active:scale-95 cursor-pointer hover:bg-black/30 dark:hover:bg-white/30 rounded-full border-black/5 dark:border-white/5 border p-1 transition-all duration-300">
                        <FaArrowLeft />
                    </Link>
                </div>
                
                <div className="flex gap-3 mt-5 max-[700px]:flex-col">
                    <div className="flex flex-col border p-2 rounded-md border-black/30 flex-1 dark:border-white/30">
                        <h2 className=" font-semibold text-xl">Client:</h2>
                        <div className="flex flex-col gap-2 mt-2 px-2">
                            <p className=" font-medium">Id: <span className="text-black/70 dark:text-white/70">{client.id}</span></p>
                            <p className=" font-medium">First name: <span className="text-black/70 dark:text-white/70">{client.firstName}</span></p>
                            <p className=" font-medium">Last name: <span className="text-black/70 dark:text-white/70">{client.lastName}</span></p>
                            <p className=" font-medium">Email: <span className="text-black/70 dark:text-white/70">{client.email}</span></p>
                            <p className=" font-medium">Number: <span className="text-black/70 dark:text-white/70">{client.number ?? ""}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col border p-2 rounded-md border-black/30 flex-1 dark:border-white/30">
                        <h2 className=" font-semibold text-xl">Shipped to:</h2>
                        <div className="flex flex-col gap-2 mt-2 px-2">
                            <p className=" font-medium">Country: <span className="text-black/70 dark:text-white/70">{country}</span></p>
                            <p className=" font-medium">City: <span className="text-black/70 dark:text-white/70">{city}</span></p>
                            <p className=" font-medium">Address: <span className="text-black/70 dark:text-white/70 break-words">{address}</span></p>
                            <p className=" font-medium">Postal code: <span className="text-black/70 dark:text-white/70">{postalCode}</span></p>
                        
                        </div>
                    </div>
                </div>

                <div className="border p-2 rounded-md border-black/30 flex-1 dark:border-white/30  flex flex-col mt-2 gap-4">
                    <h1 className="font-semibold text-xl text-center">Items</h1>
                    <div className="flex flex-col gap-3 px-3">
                        {products.map((product,index) => {
                            const {name,price,quantity,media} = product
                            return (
                                <div key={index} className={`flex gap-2 max-[430px]:flex-col items-center  pb-2 ${index !== products.length-1 ?"border-b border-black/30 dark:border-white/30" :""}`}>
                                    <div className=" w-[130px] h-[160px] rounded-md">
                                        <img 
                                        src={media?.url ?? ""} 
                                        alt={name+ " image"}
                                        className="w-full h-full rounded-md object-cover border border-black/30 dark:border-white/30" />
                                    </div>
                                    <div className=" flex flex-col text-sm font-medium  h-full">
                                        <p>Id: <span className="text-black/80 dark:text-white/80">{product.id}</span></p>
                                        <div className=" flex flex-col gap-1 text-base justify-between h-full">
                                            <div className="flex flex-col">
                                                <p className=" capitalize break-words">Name: <span className="text-black/80 dark:text-white/80">{product.name}</span></p>
                                                <p>Price: <span className="text-black/80 dark:text-white/80">${price}</span></p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Quantity: <span className="text-black/80 dark:text-white/80">{quantity}</span></p>
                                                <p>Total: <span className="text-black/80 dark:text-white/80">${(quantity*price).toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}