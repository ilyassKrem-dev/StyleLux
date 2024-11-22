import { useTitle } from "../../../../lib/utils/hooks/hooks"
import DealForm from "../shared/dealForm/dealForm"




export default function AdminAddDeal() {



    useTitle("Deals | add")
    return (
        <DealForm />
    )
}