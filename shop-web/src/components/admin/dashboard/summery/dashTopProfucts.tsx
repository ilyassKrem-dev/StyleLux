import { Link } from "react-router-dom"
import { sessionType } from "../../../../lib/utils/types/authTypes"
import { useEffect, useState } from "react"
import DashBoard from "../../../../lib/api/admin/dashboard/dashboard";


type TopProductType = {
    id:number;
    name:string;
    sold:number;
    total:number;
    uid:string
}


export default function DashTopProducts({session}:{
    session:sessionType
}) {
    const [topProducts,setTopProducts] = useState<TopProductType[]>([]);

    useEffect(() => {
        const getTopProducts = async () => {
            const res =await new DashBoard(session.uid).getTopProducts()
            if(res?.success) {
                setTopProducts(res.data)
            }
        }
        getTopProducts()
    },[session])
    return (
        <div className="bg-white p-4 rounded-md dark:bg-dark flex-1 ">
            <h1 className=" font-semibold text-xl dark:text-white">Top products</h1>
            <div className="flex flex-col gap-3 mt-4">
                <table>
                    <thead >
                        <tr className=" font-medium flex text-black/50 dark:text-white/50 border-b pb-2 border-b-black/50 dark:border-b-white/50">
                            <th className="w-[50px]">
                                #
                            </th>
                            <th className="flex-1">
                                Name   
                            </th>
                            <th className="flex-1">Sold</th>
                            <th className="flex-1">Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-black dark:text-white ">
                        {topProducts.length>0&&topProducts.map((product,index) => {
                            const {name,uid,sold,total} = product
                            return (
                                <tr key={index} className="flex py-4  dark:text-white border-b border-b-black/50 dark:border-b-white/50 font-medium">
                                    <td className="w-[50px] text-center">
                                        0{index+1}
                                    </td>
                                    <td className="flex-1 truncate max-w-[100px] sm:max-w-[200px] md:max-w-[300px] font-medium capitalize">
                                        <Link to={`/products/${uid}`}
                                        target="_blank" 
                                        className="underline active:scale-95">
                                            {name}
                                        </Link>
                                        
                                    </td>
                                    <td className="flex-1 text-center">
                                        {sold}
                                    </td>
                                    <td className="flex-1 text-center">
                                        ${total.toFixed(1)}
                                    </td>
                                </tr>
                            )
                        })}
                        {topProducts.length==0&&(
                            <tr>
                                <td className="font-bold text-lg text-center pt-8" rowSpan={4}>No products to show</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}