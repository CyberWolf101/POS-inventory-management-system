import { doc, updateDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../config"
import { userContext } from "../contexts/userContext"
import { useToast } from "@chakra-ui/react"
import swal from "sweetalert"

export const useBuyBranch = () => {
    const [loading, setLoading] = useState(false)
    const [userDetails, setuserDetails] = useContext(userContext)
    const toast = useToast()
    const buyBranch = async (amount, onClose) => {
        try {
            setLoading(true)

            const userRef = doc(db, 'users', userDetails.id)
            // const invRef = doc(db, 'inventoryData', userDetails.inventoryId)

            if (userDetails.availableBranch) {
                await updateDoc(userRef, {
                    availableBranch: userDetails.availableBranch + amount
                })
                setuserDetails({ ...userDetails, availableBranch: userDetails.availableBranch + amount })
            } else {
                await updateDoc(userRef, {
                    availableBranch: amount
                })
                setuserDetails({ ...userDetails, availableBranch: amount })
            }
            toast({
                title: 'Slot added',
                description: 'You succcessfully purchased a new slot',
                status: 'success',
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            onClose()
            setLoading(false)
        } catch (error) {
            console.log(error)
            swal('An error occured')
            setLoading(false)

        }

    }

    return { loading, buyBranch }
}