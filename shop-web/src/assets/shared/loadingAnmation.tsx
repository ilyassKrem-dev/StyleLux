


export default function LoadingAnimation({className}:{
    className?:string
}) {

    return (
        <div className="flex flex-col gap-3 items-center">
            <div className={`p-4 rounded-full border-4 border-black border-r-white animate-spin dark:border-white dark:border-r-black ${className}`}>

            </div>
                
        </div>
    )
}