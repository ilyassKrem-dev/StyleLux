import { MouseEvent,SetStateAction,useCallback,useEffect, useState } from "react"
import { MediaType } from "../../../../lib/utils/types/productTypes";
import ReactDOM from "react-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import MediaTypes from "../../mediaTypes";
import { RxCross2 } from "react-icons/rx";

export default function MediaUpdate({medias,setMedias}:{
    medias:MediaType[];
    setMedias:React.Dispatch<SetStateAction<MediaType[]>>
}) {
    const [selectedMedia,setSelectedMedia] = useState<MediaType|null>(medias.find(med => med.isDefault ?? med.type == "image") ?? null)
    const [dragging,setDragging] = useState<boolean>(false)

    const setIsDefault = (media:MediaType) => {
        if(media.type == "video") return
        setMedias(prev => {
            const newData = prev.map(med => {
                if(med != media && med.isDefault) return {...med,isDefault:false}
                if(med == media) return {...med,isDefault:true}
                return med
            })
            return newData
        })
    }   
    

    const handleAdd =(files:FileList | null |undefined) => {
        if(files && files.length>0) {
            const filesToArray = Array.from(files)
            const readFile = (filesArray:File[]) => {
                if(filesArray.length == 0) return
                const oneFile = filesArray.shift()
                const fileReder = new FileReader()
                if(oneFile) {
                    if(!oneFile.type.includes("image")&&!oneFile.type.includes("video")) return
                    fileReder.onload = () => {
                        const mediaObject:MediaType= {
                            id:medias.reduce((t,a) => t+(a.id ?a.id: 10),0),
                            uid:nanoid(),
                            type:oneFile.type.includes("image") ? "image" : "video",
                            url:fileReder.result as string,
                            isDefault:medias.length===0 && oneFile.type.includes("image") ? true :false,
                            file:oneFile
    
                        }
                        setMedias(prev => [...prev,mediaObject])
                        if(medias.length ==0) setSelectedMedia(mediaObject)
                        readFile(filesArray)
                    }
                    fileReder.readAsDataURL(oneFile)
                }
            }   
            readFile(filesToArray)
        }
        
    }

    const handleRemove= useCallback((e:MouseEvent,media:MediaType) => {
        e.stopPropagation()
        if(media == selectedMedia) {
            setSelectedMedia(null)
        }
        setMedias(prev => (prev.filter((med) => med !== media)))
    },[selectedMedia])
    useEffect(() => {
        const handleDragEnter = (e: DragEvent) => {
            e.preventDefault(); 
            setDragging(true);
          };
        const handleDragLeave = (e:DragEvent) => {
            const fromElement = e.relatedTarget as HTMLElement;
            if (!fromElement || !document.documentElement.contains(fromElement)) {
                setDragging(false);
            }
        }
        const handleDrag = (e:DragEvent) => e.preventDefault()
        const handleDrop = (e:DragEvent) => {
            e.preventDefault()
            setDragging(false)
            handleAdd(e.dataTransfer?.files)
        }
        document.body.addEventListener("dragenter", handleDragEnter);
        document.body.addEventListener("dragleave",handleDragLeave)
        document.body.addEventListener("dragover",handleDrag)
        document.body.addEventListener("drop",handleDrop)
        return () => {
            document.body.removeEventListener("dragenter", handleDragEnter);
            document.body.removeEventListener("dragleave",handleDragLeave)
            document.body.removeEventListener("dragover",handleDrag)
            document.body.removeEventListener("drop",handleDrop)

        }
    },[])
    return (
        <>
            <div className="bg-white dark:bg-dark rounded-md p-2 flex flex-col md:max-w-[400px] max-[767px]:justify-center max-[767px]:items-center">
                <div className="max-[500px]:w-[300px] w-[400px] md:w-[380px] h-[500px] relative group">
                   {selectedMedia&&<>
                        <MediaTypes
                        type={selectedMedia?.type ?? "image"}
                        url={selectedMedia?.url ?? ""}
                        controls={true}
                        className="w-full h-full object-cover rounded-md border border-black/20 dark:border-white/20"
                        />
                        <div className="absolute top-0 left-0 right-0 bg-white/30 rounded-md  items-start group-hover:flex hidden transition-all duration-300 ">
                            <div className="flex w-full">
                                <button className="flex-1 bg-black text-white dark:bg-white rounded-tl-md font-medium py-2 hover:bg-black/60 dark:hover:bg-white/60 transition-all duration-300 dark:text-black" onClick={() =>setIsDefault(selectedMedia as MediaType)}>Set default</button>
                                <button className="flex-1 bg-accent text-white rounded-tr-md font-medium py-2 hover:bg-accent/60  transition-all duration-300" onClick={(e) => handleRemove(e,selectedMedia)}>Remove</button>
                            </div>
                        </div>
                    </>}
                    {!selectedMedia&&
                    <div className="flex justify-center items-center h-full font-medium text-center break-words flex-col border rounded-md dark:border-white/30 border-black/30">
                        <span className="text-2xl"><IoCloudUploadOutline /></span>
                        Add an image or video
                    </div>}
                </div>
                <div className="flex items-center gap-2 mt-2">

                    <label htmlFor="upload" className="rounded-md flex flex-col items-center p-4 border border-black/40 dark:border-white/40 cursor-pointer bg-lighter dark:bg-darker group hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300 px-6">
                        <div className="text-2xl text-black dark:text-white">
                            <IoCloudUploadOutline />
                        </div>
                        <p className=" cursor-pointer dark:text-white text-black/80 font-medium">Add</p>
                    </label>
                    <input type="file" multiple accept="image/*" id="upload" className="hidden" onChange={(e) =>  handleAdd(e.target.files)}/>
                
                    <div className="flex overflow-x-auto gap-1 custom-scrollbar pb-1 max-w-[600px]:scrollbar-none">
                        {medias.length>0&&
                        medias.map((media,index) => {
                            const {url,type,isDefault} = media
                            return (
                                <div key={index} className=" relative group" onClick={() => setSelectedMedia(media)}>
                                    <div key={index} className={`h-[90px] w-[86.44px] rounded-md  ${isDefault ? "border-4 border-blue-400":"border-2"} min-w-[86.44px] cursor-pointer hover:bg-white/30 group `} >
                                        <MediaTypes 
                                        type={type ?? "image"}
                                        url={url ?? ""}
                                        controls={false}
                                        className="rounded-md w-full h-full object-cover group-hover:opacity-80 transition-all duration-300"
                                        /> 
                                    </div>
                                    <div className="absolute top-2 right-2 rounded-full p-1  bg-accent text-white cursor-pointer active:scale-95 hidden group-hover:block" onClick={(e) => handleRemove(e,media)}>
                                        <RxCross2 />
                                    </div>
                                </div>
                                    
                            )
                        })}
                        

                    </div>

                    
                </div>
            </div>

            {dragging&&
            ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 dark:bg-white/30 z-50 flex justify-center items-center ">
                <div className="flex flex-col gap-3 items-center">
                    <div className="text-6xl text-white dark:text-black">
                        <IoCloudUploadOutline />
                    </div>
                    <p className="text-white dark:text-black text-2xl font-semibold">Drop image</p>
                </div>
            </div>,document.body)}
        </>
    )
}