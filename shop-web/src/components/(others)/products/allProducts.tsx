import { useEffect, useState } from "react"
import { ProductType } from "../../../lib/utils/types/productTypes"
import Product from "../../../lib/api/product/Product"
import { Link } from "react-router-dom"
import { useSize } from "../../../lib/utils/hooks/hooks"



export default function AllProducts() {
    const [products,setProducts] = useState<ProductType[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [page,setPage] = useState<number>(1)
    const [max,setMax] = useState<number>(0)
    const [loadingMore,setLoadingMore] = useState<boolean>(false)
    const {w} = useSize()
    
    useEffect(() => {
        const getAllProducts = async() => {
            const res= await Product.getAllProduct(
                {
                    sizeParams:null,
                    genderParam:null,
                    categoryParams:null,
                    pageParams:page.toString()
                }
            )
            if(res?.success) {
                setMax(res.data.pages)
                if(products.length==0) {
                    setProducts(res.data.products)
                } else setProducts(prev => ([...prev,...res.data.products]))
            
                setLoading(false)
                setLoadingMore(false)
            }
        }
        getAllProducts()
    },[page])
    useEffect(() => {
        
        const infiniteScrolling = () => {
            if (page > max || loadingMore) return;
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight
            const closeToBottom = docHeight - (scrollTop+windowHeight) 
            if(closeToBottom ==0) {
                setPage(prev => prev+1)
                setLoadingMore(true)
            }
            
            
        }
        window.addEventListener("scroll",infiniteScrolling)
        
        return () => window.removeEventListener("scroll",infiniteScrolling)
    },[max,page,loadingMore])
    
    return (
        <div className="py-10 md:py-28 ">
             <div className="flex flex-col max-w-[1100px] mx-auto ">
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold dark:text-white">Products</h1>
                </div>
                <div className="mt-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 gap-y-10 ">
                    {!loading&&products.map((product,index) => {
                        const {media} = product
                        return (
                            <Link to={`/products/${product.uid}`} key={index} className="flex flex-col gap-4 hover:bg-black/5 group/link rounded-sm cursor-pointer">
                                <div className={`
                                    h-[350px] ${w>1250 ?"w-full h-[400px]" :""}
                                `}>
                                    <img 
                                    src={media.url as string} 
                                    alt=""
                                    className=" object-cover h-full w-full rounded-sm group-hover/link:opacity-90" />
                                </div>
                                <div className="flex gap-2 flex-col p-1">
                                    <p className="font-volkhov font-medium capitalize  cursor-pointer dark:text-white">{product.name}</p>
                                    <p className=" cursor-pointer dark:text-white">${product.price}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            </div>
            
        </div>
    )
}