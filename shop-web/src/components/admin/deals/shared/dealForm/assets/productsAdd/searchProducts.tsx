import { useEffect, useRef, useState } from "react"
import { ProductType } from "../../../../../../../lib/utils/types/productTypes"
import Product from "../../../../../../../lib/api/product/Product"
import { useOverlayRemove } from "../../../../../../../lib/utils/hooks/hooks"
import { IoIosSearch } from "react-icons/io"





export default function SearchProducts() {

    const divRef = useRef<HTMLDivElement>(null)
    const [input,setInput] = useState<string>("")
    const [products,setProducts] = useState<ProductType[]>([])
    const [show,setShow] = useState<boolean>(false)
    const [page,setPage] = useState<number>(1)
    const [pagesNumber,setPagesNumber] = useState<number>(0)
    const [fetching,setFetching] = useState<boolean>(false)
    
    useEffect(() => {
        const getProducts = async() => {
            let res;
            if(!input) {
                res = await Product.getAllProduct({
                    sizeParams:null,
                    pageParams:page.toString(),
                    genderParam:null,
                    categoryParams:null
                }) 
            } else {
                res = await Product.getProuctsByQuery(input)
            }
            if(res?.success) {
                const data = res.data as any
                if(!input) {
                    setProducts(prev => products.length>0 ? [...prev,...data.products] :data.products)
                    setPagesNumber((res.data as any).pages ?? 1)
                } else {
                    setProducts(data)
                    setPage(1)
                }
                
                
                
            }

            setFetching(false)
        }
        getProducts()
    },[input,page])

    const handleScroll = () => {
        if(page>pagesNumber || fetching || input.length>0) return
        const current = divRef.current
        if(!current) return
        const bottomScroll = current.scrollHeight - (current.clientHeight + current.scrollTop)
        if(bottomScroll === 0) {
            setPage(prev => prev+1)
            setFetching(true)
        }
    }

    useOverlayRemove(
        {
            tab:"addbar",
            setShow
        }
    )
    
    return (
        <div className="mt-4 relative p-3 addbar">
            <div className="relative flex justify-center items-center" onClick={() => setShow(true)}>
                <input type="text" id="search" name="search" className=" border !p-1 rounded-full !text-base !pl-8 max-[450px]:w-[250px] w-[300px] sm:w-[450px]" placeholder="Add product" value={input} onChange={(e) => setInput(e.target.value)} />
                <div className="absolute text-2xl left-2">
                    <IoIosSearch />
                </div>
            </div>
            {show&&products.length>0&&
            <div className="absolute top-[3.5rem] w-full rounded-md ">
                <div className="w-full bg-white dark:bg-dark text-black/80 dark:text-white overflow-y-auto custom-scrollbar max-h-[350px] flex flex-col  border-2 border-black/10 dark:border-white/10 rounded-md max-[450px]:max-h-[300px] max-[450px]:max-w-[250px] sm:max-w-[450px] max-w-[300px]" ref={divRef} onScroll={handleScroll}>
                    {products.map((product,index) => {
                        const {media,name,price} = product
                        return (
                        <div key={index} className={`flex items-center gap-3 cursor-pointer group hover:bg-black/10 dark:hover:bg-white/10 ${index==0 ?" rounded-tl-md" :"border-t dark:border-t-white/20"} `}>
                            <div className="w-[70px] h-[100px] rounded-md">
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
                        </div>
                        )
                    })}
                </div>

            </div>} 
        </div>
    )
}