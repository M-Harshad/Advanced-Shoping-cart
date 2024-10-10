import { useEffect, useState } from "react";


function useLocalStorage<T>(Key: string, InitialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const JsonValue = localStorage.getItem(Key)
        if (JsonValue != null) return JSON.parse(JsonValue)

            if(typeof InitialValue === "function"){
                return (InitialValue as () => T)()
            } else{
                return InitialValue
            }
    })


useEffect(() => {
    localStorage.setItem(Key , JSON.stringify(value))
}, [Key, value])

return [value , setValue] as [typeof value, typeof setValue]
}


 export default useLocalStorage