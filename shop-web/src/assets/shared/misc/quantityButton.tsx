



export default function QuantityBtn({quantity,handleQuantity,productId}:{
    quantity:number;
    handleQuantity:(arg:"increase"|"decrease",arg2?:string) => void;
    productId?:string
}) {

    return (
        <div className="flex items-center rounded-md border border-black/40  dark:border-white/40">
            <div className="bg-white  rounded-l-md cursor-pointer  p-1 px-3 text-lg font-medium hover:bg-black/20 transition-all duration-300 dark:hover:bg-white/20 dark:bg-dark dark:text-white" onClick={() => handleQuantity("decrease",productId)}>
                -
            </div>
            <p className=" dark:text-white w-[30px] text-center">{quantity}</p>
            <div className="bg-white  rounded-r-md  p-1 px-3 text-lg font-medium cursor-pointer hover:bg-black/20 transition-all duration-300 dark:hover:bg-white/20 dark:bg-dark dark:text-white" onClick={() => handleQuantity("increase",productId)}>
                +
            </div>
        </div>
    )
}