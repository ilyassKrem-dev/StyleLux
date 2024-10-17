import { useState } from "react"
import MediaTypes from "../../../../../assets/shared/mediaTypes"
import { MediaType } from "../../../../../lib/utils/types/productTypes"

const mediaTest = 
    {
        id: 31,
        uid: "T4BE202B-88fC-bF6f-4E8c-c96BcC3258A7",
        type: "image",
        url: "/image.png",
        isDefault: true
    }

export  default  function ProductMedia({medias}:{
    medias:MediaType[]
}) {
    const [defaultMedia,setDefaultMedia] = useState<MediaType>(medias.find(me => me.isDefault) as MediaType)
    return (
        <div className="flex gap-4 lg:flex-row flex-col-reverse">
            {medias.length>0
            &&
            <div className="flex lg:flex-col gap-5 lg:max-h-[600px] xl:max-h-[600px] lg:overflow-y-scroll scrollbar-none flex-row overflow-x-scroll  max-[767px]:max-w-[491px] max-[520px]:max-w-[400px] max-[430px]:max-w-[280px] md:max-w-[491px]">
                {[...Array(6)].map((_,index) => {
                    return (
                        <div key={index} className={`w-[70px] h-[90px] group hover:bg-black/60 cursor-pointer rounded-md active:scale-95 border-2   ${mediaTest.uid == defaultMedia.uid ? " border-black dark:border-white":" border-transparent"} flex-1 min-w-[70px]`} onClick={() => setDefaultMedia(mediaTest)}>
                            <MediaTypes 
                            type={mediaTest.type}
                            url={mediaTest.url}
                            className="w-full h-full object-cover rounded-md group-hover:opacity-40"
                            />
                        </div>
                    )
                })}
            </div>}
            <div className="w-fit  lg:w-[400px] lg:h-[500] xl:w-[500px] xl:h-[600px]">
                    <MediaTypes 
                type={defaultMedia.type}
                url={"/image2.png"}
                controls={defaultMedia.type !== "video"}
                className="w-full h-full rounded-md object-cover"
                
                />
                
            </div>
        </div>
    )
}