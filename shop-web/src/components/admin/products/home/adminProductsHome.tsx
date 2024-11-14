import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import AdminProducts from "../../../../lib/api/admin/products/AdminProducts"
import AdminPagination from "../assets/adminPagination";
import React from "react";
import { AdminProductType } from "../../../../lib/utils/types/adminTypes";
import LoadingAnimation from "../../../../assets/shared/loadingAnmation";
import { useShow, useTitle } from "../../../../lib/utils/hooks/hooks";




const AdminPaginationMemo = React.memo(AdminPagination)
export default function AdminProductHome() {
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("page"))

    const [products,setProducts] = useState<AdminProductType[]>([])
    const [max,setMax] = useState<{page:number,products:number}>({
        page:0,products:0
    })
    const [show] = useShow()
    
    const changeCurrentPageToMax = currentPage ? (currentPage>max.page ? max.page : currentPage) : 1

    const getAdminProducts = async(page:number) => {
        const res = await AdminProducts.getAllProdcuts(page)
        if(res?.success) {
            setMax(prev => ({...prev,page:res.data.pages,
                                    products:res.data.max}))
            setProducts(res.data.products)
            
        } else {
            setProducts([])
        }
    }

    useEffect(() => {
        getAdminProducts(changeCurrentPageToMax)
    },[currentPage])

    useTitle("Admin | products")

    return (
        <div className="mt-5 bg-white/50 rounded-md dark:bg-dark/50 overflow-x-auto">
            <div className=" bg-white rounded-md dark:bg-dark p-3 border border-black/5 dark:border-white/5 min-w-[600px]">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="flex items-center border-b pb-2 text-black/80 dark:text-white/80">
                            <th className="font-medium flex-1 ">Product name</th>
                            <th className="font-medium flex-1 ">Product id</th>
                            <th className="font-medium flex-1 ">Category</th>
                            <th className="font-medium flex-1 ">En stock</th>
                            <th className="font-medium flex-1 ">Price</th>
                            <th className="font-medium w-[80px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {show&&products.map((product,index) => {
                            const {id,name,category,price,stock} = product
                            return (
                                <tr key={index} className={`flex items-center  p-3 text-center text-black/80 dark:text-white/80 ${index != products.length-1?"border-b" :""}`} >
                                    <td className="flex-1 capitalize">{name}</td>
                                    <td className="flex-1">{id}</td>
                                    <td className="flex-1 capitalize">{category}</td>
                                    <td className="flex-1">{stock}</td>
                                    <td className="flex-1">${price}</td>
                                    <td className="w-[80px]">
                                        <Link to={`/admin/products/${product.uid}`}>
                                            <button className="border-2 rounded-md w-full border-black text-black font-medium dark:border-white dark:text-white active:scale-95 hover:bg-black/30 dark:hover:bg-white/30 transition-all duration-300 py-[0.2rem]">
                                                View
                                            </button>
                                        
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        {!show&&(
                            <tr className=" py-12">
                                <td rowSpan={6}>
                                    <LoadingAnimation className="!p-3"/>
                                </td>
                                
                            </tr>
                        )}
                        {show&&(products.length==0)&&(
                            <tr>
                                <td rowSpan={6} className=" text-center py-12 font-medium">
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center p-2 max-[600px]:flex-col-reverse max-[600px]:gap-3">
                <p className="text-sm text-black/70 font-medium dark:text-white/70">Showing {changeCurrentPageToMax}-{products.length} of {max.products}</p>
                {max.page>0&&<AdminPaginationMemo maxPage={max.page}/>}
            </div>
        </div>
    )
}