import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useDocument = (dataBase,id) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        if(id === false) return [null,false];
        const getData = async () => {
            const docRef = doc(dataBase, "messages", id);
            const docSnap = await getDoc(docRef);
            const docValue = docSnap.exists() ? docSnap.data() : null;
            console.log('docValue = ',docValue)
            setData(docValue);
            setLoading(false);
        }
        getData();
    },[]);
    return [data,loading]
}
export default useDocument;