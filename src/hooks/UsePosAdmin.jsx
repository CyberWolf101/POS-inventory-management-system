import { useContext, useState } from "react"
import useAuth from "./auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../config"
import { uuidv4 } from '@firebase/util';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userContext } from "../contexts/userContext";
import { useReferal } from "./useReferal";
import { InventoryDataContext } from "../contexts/inventoryDataContext";

export const UseMakePosAdmin = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const nav = useNavigate()
    const [userDetails, setuserDetails] = useContext(userContext)
    const { handleReferal } = useReferal()
    const [inventoryData, setInventoryData] = useContext(InventoryDataContext)

    async function hasPaidPos(clickedItem, months, timeFrame, onClose, referalCode) {
        // is user is pos_admin we will not allow it
        const docRef = doc(db, 'users', user.id)
        const id = uuidv4()
        let subDue;
        const moment = Date.now(); // Current timestamp in milliseconds

        setLoading(true)
        if (months == 3) {
            subDue = moment + (3 * 30 * 24 * 60 * 60 * 1000); // Add 3 months to moment in milliseconds
        } else if (months == 6) {
            subDue = moment + (6 * 30 * 24 * 60 * 60 * 1000); // Add 6 months to moment in milliseconds
        } else if (months == 12) {
            subDue = moment + (12 * 30 * 24 * 60 * 60 * 1000); // Add 12 months to moment in milliseconds
        } else {
            console.log('invalid month');
        }

        try {
            await setDoc(doc(db, 'inventory_data', id), {
                ownerName: user.name,
                ownerID: user.id,
                id: id,
                subscriptionPeriod: timeFrame,
                subscriptionDue: subDue,
                months: months,
                amountPerMonth: clickedItem.amountPerMonth,
                plan: clickedItem.plan,
                allowedStores: clickedItem.stores,
                totalItems: 0,
                totalPrice: 0,
                totalQuantity: 0,
                totalCategories: 0,
                sold: 0,
                salesTotal: 0,
                totalBranches: 0,
                totalStores: 0,
                totalAddedStock: 0,
                suppliers: [],
                customers: [],
                salesRep: []
            })

            await updateDoc(docRef, {
                pos_admin: true,
                POSsubscriptionPeriod: timeFrame,
                POSsubscriptionDue: subDue,
                inventoryID: id,
                allowedStores: clickedItem.stores,
                pos_plan: clickedItem.plan

            })
            const invData = await getDoc(doc(db, 'inventory_data', id))
            const main = invData.data()
            setInventoryData(main)

            const userData = await getDoc(docRef)
            const theData = userData.data()
            const amount_to_add = 1000
            const userObject = {
                email: theData.email,
                name: theData.name,
                type: 'POS',
                amount: amount_to_add
            }

            await handleReferal(userObject, referalCode, amount_to_add)
            setuserDetails({ ...userDetails, pos_admin: true, inventoryID: id })
            setLoading(false)
            nav('/profile/pos-admin/' + user.id)
            swal('Success', 'You successfuly subscribed for ' + clickedItem.plan + ' for a period of ' + timeFrame, 'success')
            onClose()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    return { hasPaidPos, loading }
}
export const UseRenewPos = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const nav = useNavigate()

    async function hasPaidPos(clickedItem, months, timeFrame, onClose, type) {
        // is user is pos_admin we will not allow it
        const docRef = doc(db, 'users', user.id)
        // const id = uuidv4()
        let subDue;
        const moment = Date.now(); // Current timestamp in milliseconds

        setLoading(true)
        if (months == 3) {
            subDue = moment + (3 * 30 * 24 * 60 * 60 * 1000); // Add 3 months to moment in milliseconds
        } else if (months == 6) {
            subDue = moment + (6 * 30 * 24 * 60 * 60 * 1000); // Add 6 months to moment in milliseconds
        } else if (months == 12) {
            subDue = moment + (12 * 30 * 24 * 60 * 60 * 1000); // Add 12 months to moment in milliseconds
        } else {
            console.log('invalid month');
        }

        try {
            await updateDoc(doc(db, 'inventory_data', user.inventoryID), {
                subscriptionPeriod: timeFrame,
                subscriptionDue: subDue,
                months: months,
                amountPerMonth: clickedItem.amountPerMonth,
                plan: clickedItem.plan,
                allowedStores: clickedItem.stores,
            })

            await updateDoc(docRef, {
                pos_admin: true,
                POSsubscriptionPeriod: timeFrame,
                POSsubscriptionDue: subDue,
                allowedStores: clickedItem.stores,
                pos_plan: clickedItem.plan

            })
            setLoading(false)
            nav('/profile/pos-admin/' + user.id)
            swal('Success', 'You succefully ' + type + 'ed your plan for a period of ' + timeFrame, 'success')
            onClose()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    return { hasPaidPos, loading }
}


export const UseGetData = () => {
    const [Loading, setLaoding] = useState(false)
    const { user, loadingUser } = useAuth()
    const [inventoryData, setInventoryData] = useContext(InventoryDataContext)

    useEffect(() => {
        async function handleGetData() {
            setLaoding(true)
            try {
                const rawData = await getDoc(doc(db, 'inventory_data', user?.inventoryID))
                const mainData = rawData.data()
                setInventoryData(mainData)
                console.log(mainData)
                setLaoding(false)
            } catch (error) {
                setLaoding(false)
                console.log(error)
            }

        }
        handleGetData()
    }, [user])
    return { Loading }
}
