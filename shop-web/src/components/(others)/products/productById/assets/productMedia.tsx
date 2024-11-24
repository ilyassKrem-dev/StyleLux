import { useState } from "react"
import MediaTypes from "../../../../../assets/shared/mediaTypes"
import { MediaType } from "../../../../../lib/utils/types/productTypes"

export  default  function ProductMedia({medias}:{
    medias:MediaType[]
}) {
    const [defaultMedia,setDefaultMedia] = useState<MediaType>(medias.find(me => me.isDefault || me.type == "image") as MediaType)

    return (
        <div className="flex gap-4 lg:flex-row flex-col-reverse">
            {medias.length>0
            &&
            <div className="flex lg:flex-col gap-5 lg:max-h-[600px] xl:max-h-[600px] lg:overflow-y-scroll scrollbar-none flex-row overflow-x-auto  max-[767px]:max-w-[491px] max-[520px]:max-w-[400px] max-[430px]:max-w-[280px] md:max-w-[491px]">
                {medias.map((media,index) => {
                    return (
                        <div key={index} className={`w-[70px] h-[90px] group hover:bg-black/60 cursor-pointer rounded-md active:scale-95 border-2   ${defaultMedia&&(media.uid == defaultMedia.uid) ? " border-black dark:border-white":" border-transparent"} ${medias.length>4 ? "flex-1":""} min-w-[70px]`} onClick={() => setDefaultMedia(media)}>
                            <MediaTypes 
                            type={media.type ? media.type :"image"}
                            url={media.url as string ?? ""}
                            className="w-full h-full object-cover rounded-md group-hover:opacity-40 border border-black/10 dark:border-white/10"
                            />
                        </div>
                    )
                })}
            </div>}
            <div className="min-w-[309px] h-[500px] max-[350px]:w-[280px] max-[430px]:w-[350px] max-[511px]:w-[420px]  max-[767px]:w-[491px] sm:min-w-[350px]  lg:w-[400px] lg:h-[500px] xl:w-[500px] xl:h-[600px]">
                <MediaTypes 
                type={defaultMedia?.type ? defaultMedia?.type :"image"}
                url={defaultMedia?.url as string ?? ""}
                controls={defaultMedia?.type !== "video"}
                className="w-full h-full rounded-md object-cover"
                
                />
                
            </div>
        </div>
    )
}