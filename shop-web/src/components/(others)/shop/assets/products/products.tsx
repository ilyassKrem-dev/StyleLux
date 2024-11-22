import { useEffect, useState } from "react"
import FilterShowen from "./assets/topOfProducts"
import Product from "../../../../../lib/api/product/Product"
import { ProductType } from "../../../../../lib/utils/types/productTypes"
import { useSize } from "../../../../../lib/utils/hooks/hooks"
import { Link, useSearchParams } from "react-router-dom"
import Pagination from "./assets/pagination/pagination"
import { calculateDicount } from "../../../../../lib/utils/random/random"
export default function Products() {
    const [filterBy,setFitlerBy] = useState<string>("")
    const [maxPages,setMaxPages] = useState<number>(0)
    
    const [products,setProducts] = useState<ProductType[]>([])

    const [loading,setLoading] = useState<boolean>(true)
    
    const [searchParams,setSearchParams] = useSearchParams()
    const sizeParams = searchParams.get("size")
    const categoryParams = searchParams.get("category")
    const pageParams = searchParams.get("page")
    const genderParam = searchParams.get('gender')
    useEffect(() => {
        const getProducts = async() => {
            const parms = Object.fromEntries(searchParams)
            const res = await Product.getAllProduct({
                sizeParams,
                categoryParams,
                pageParams,
                genderParam
            })
            if(res?.success) {
                if(res.data.pages < Number(pageParams)) {
                    delete parms.page 
                    setSearchParams({...parms})
                }
                
                
                setProducts(res.data.products)
                setMaxPages(res.data.products.length === 0 ?0 :res.data.pages)
            } else {
                setProducts([])
            }
        }
        getProducts()
    },[sizeParams,categoryParams,pageParams,genderParam])
    
    useEffect(() => {
        if(!loading) return
        const id = setTimeout(() => {
            setLoading(false)
        },300)

        return () => clearTimeout(id)
    },[loading])
    const {w} = useSize()
    return (
        <div className={`flex flex-col gap-5 self-start font-poppins ${w<1100 ?"flex-1" :""}`}>
            <FilterShowen />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 gap-y-10 ">
                {!loading&&products.map((product,index) => {
                    const {media} = product
                    return (
                        <Link to={`/products/${product.uid}`} key={index} className="flex flex-col gap-3 hover:bg-black/5 group/link rounded-sm cursor-pointer">
                            <div className={`
                                h-[350px] ${w>1250 ?"w-[300px] h-[400px]" :""}
                            `}>
                                <img 
                                src={media.url as string} 
                                alt=""
                                className=" object-cover h-full w-full rounded-sm group-hover/link:opacity-90" />
                            </div>
                            <div className="flex gap-2 flex-col p-1">
                                <p className="font-volkhov font-medium capitalize  cursor-pointer dark:text-white">{product.name}</p>
                                <div className="flex gap-2">
                                    <p className={`font-semibold text-sm  ${product.discount>0 ?" line-through text-black/50 dark:text-white/50" :"dark:text-white"}`}>${(product.price).toFixed(2)}</p>
                                    {product.discount>0&&
                                    <p className={`font-semibold text-sm  dark:text-white`}>${calculateDicount(product.price,product.discount).toFixed(2)}</p>
                                    }
                                </div>
                                
                            </div>
                        </Link>
                    )
                })}
            </div>
            {maxPages>0&&<Pagination maxPages={maxPages}/>}
        </div>
    )
}