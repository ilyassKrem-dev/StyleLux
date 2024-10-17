
import Filters from "./assets/filters/filters";
import Products from "./assets/products/products";
import { useSize } from "../../../lib/utils/hooks/hooks";
import Title from "../../../assets/shared/misc/title";


export default function Shop() {
    const {w} = useSize();
    return (
        <div className="py-20 px-4">
            <Title title="Shop" link="Shop"/>
           
            <div className="mt-10 flex items-start gap-2 justify-center">
                {w>785&&<Filters />}
                <Products />
            </div>
        </div>
    )
}