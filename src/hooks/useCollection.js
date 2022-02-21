import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useCollection = (collection) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const unsubscribe = onSnapshot(collection,(snapshots) => {
            setLoading(false)
            setData(snapshots.docs)
        });
        return unsubscribe;
    },[])
    return [data, loading]
}
export default useCollection;