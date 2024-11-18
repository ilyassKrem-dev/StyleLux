import { ChangeEvent, useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { Link, useSearchParams } from "react-router-dom"
import { ProductType } from "../../../../lib/utils/types/productTypes"
import Product from "../../../../lib/api/product/Product"
import { useToast } from "../../../../assets/shared/wrappers/ToastWrapper"
import { useOverlayRemove } from "../../../../lib/utils/hooks/hooks"




export default function AdminProductsTop() {
    const [searchParams,setSearchParams] = useSearchParams()
    const {toast} = useToast()
    const searchValue = searchParams.get("v")
    const [show,setShow] = useState<boolean>(false)
    const [products,setProducts] = useState<ProductType[]>([])
    useEffect(() => {
        if(!show) return
        const getProducts = async() => {
            const res = await Product.getProuctsByQuery(searchValue ?? "")
            if(res?.success) {
                setProducts(res.data)
            } else {
                toast({varient:"error",desc:"Couldn't get search results"})
            }
        }
        getProducts()
    },[searchValue,show])

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const params = Object.fromEntries(searchParams)
        if(!value) {
            delete params.v
        } else {
            params.v = value
        }
        setSearchParams(params)
    }
    useOverlayRemove(
        {
            tab:"product_search",
            setShow
        }
    )
    return (
        <div className=" p-4 bg-white dark:bg-dark border-black/5 border rounded-md dark:border-white/5 pb-5 flex items-center gap-6 w-full">
            <Link to={"/admin/products"} className="font-bold text-xl w-[150px] dark:text-white active:scale-95 cursor-pointer">Products</Link>
            <div className="flex-1">
                <div className=" relative product_search" >
                    <div className="relative  flex justify-center items-center" onClick={() => setShow(true)}>
                        <input 
                        type="text"
                        id="orderSearch"
                        value={searchValue??""}
                        onChange={handleSearch} 
                        className=" border rounded-md w-full !p-2 max-full !bg-gray-400/5 !border-black/10 !pl-9 !dark:border-white/10 !dark:bg-black/5" placeholder="Search here.." />
                        <div className="absolute left-2 text-2xl dark:text-white">
                            <IoSearch />
                        </div>
                    </div>
                    {show&&products.length>0&&
                    <div className="absolute top-10 rounded-md z-40 left-0 right-0" >
                        <div className="w-full bg-white dark:bg-dark text-black/80 dark:text-white overflow-y-auto custom-scrollbar max-h-[350px] flex flex-col  border-2 border-black/10 dark:border-white/10 rounded-md">
                            {products.map((product,index) => {
                                const {media,name,price,uid} = product
                                return (
                                    <Link to={`/admin/products/${uid}`} className={`flex items-center gap-3 cursor-pointer group hover:bg-black/10 dark:hover:bg-white/10 ${index==0 ?" rounded-tl-md" :"border-t dark:border-t-white/20"}`}>
                                        <div className="w-[60px] h-[80px] rounded-md">
                                            <img 
                                            src={media.url ?? ""} 
                                            alt={name+" media"}
                                            loading="lazy"
                                            className={`w-full h-full object-cover border border-black/10 dark:border-white/10 ${index==0 ?" rounded-tl-md": ""}
                                            ${(index==products.length-1 || products.length==1)?"rounded-bl-md": ""}
                                            `} 
                                            />
                                        </div>
                                        <div className="flex items-start flex-col">
                                            <p className=" font-medium capitalize cursor-pointer">{name}</p>
                                            <p className="text-sm font-medium cursor-pointer">${price}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </div>
            <Link to={"/admin/products/add"}>
                <div className="bg-black text-white rounded-full p-2 text-lg active:scale-95 hover-opacity cursor-pointer">
                    <FaPlus />
                </div>
            </Link>
        </div>
    )
}