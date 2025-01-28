import { Link } from "react-router-dom"

const footerTabs = [
    {
        name:"Support Center",
        link:"#"
    },
    {
        name:"Blog",
        link:"#"
    },
    {
        name:"FAQ,s",
        link:"#"
    }
    
]


export default function BottomHome() {


    return (

        <footer className="absolute bottom-0 right-0 left-0 h-[100px] flex items-center border-t border-black/10 dark:border-white/10 px-4 flex-col dark:text-white">
            <div className="w-full flex items-center flex-1 max-[540px]:justify-center">
                <div className="flex-1 flex justify-start max-[540px]:hidden">
                    <h4 className=" font-semibold font-volkhov text-2xl  capitalize">
                        SHOP
                    </h4>
                </div>
                <div className="flex-1 flex items-center gap-6 justify-end text-[0.9rem] max-[540px]:justify-center">
                    {footerTabs.map((tab,index) => {

                        return (
                            <Link to={tab.link} key={index} className="hover-opacity active:scale-95">
                                {tab.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <p className="flex justify-center items-center capitalize text-sm text-black/80 dark:text-white/80">
                    Copyright &copy; 2024. Ilyass kremcht
            </p>
        </footer>
    )
}