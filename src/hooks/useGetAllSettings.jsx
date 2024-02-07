import { useEffect, useState } from "react";

const settingsID = 'XA5eUSx0KyLCndY3TiDl';



// GET ALL SETTINGS
export const useGetSettings = () => {
    const [allSettings, setAllSettings] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const getSettings = async () => {
            setLoading(true)
            const docRef = doc(db, 'settings', settingsID);
            const data = await getDoc(docRef)
            console.log(data.data())
            setAllSettings(data.data())
            setLoading(false)
        }
        getSettings()
    }, [])


    return allSettings
}