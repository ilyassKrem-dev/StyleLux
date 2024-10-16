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
        <div className="flex gap-4">
            {medias.length>0
            &&
            <div className="flex flex-col gap-5 lg:max-h-[600px] xl:max-h-[600px] overflow-y-scroll scrollbar-none">
                {medias.map((media,index) => {
                    return (
                        <div key={index} className={`w-[70px] h-[90px] group hover:bg-black/60 cursor-pointer rounded-md active:scale-95 border-2   ${media.uid == defaultMedia.uid ? " border-black dark:border-white":" border-transparent"}`} onClick={() => setDefaultMedia(media)}>
                            <MediaTypes 
                            type={media.type}
                            url={media.url}
                            className="w-full h-full object-cover rounded-md group-hover:opacity-40"
                            />
                        </div>
                    )
                })}
            </div>}
            <div className="lg:w-[400px] lg:h-[500] xl:w-[500px] xl:h-[600px]">
                    <MediaTypes 
                type={defaultMedia.type}
                url={defaultMedia.url}
                controls={defaultMedia.type !== "video"}
                className="w-full h-full rounded-md object-cover"
                
                />
                
            </div>
        </div>
    )
}