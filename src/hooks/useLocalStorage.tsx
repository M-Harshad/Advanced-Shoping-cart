import { useEffect, useState } from "react";


function useLocalStorage<T>(Key: string, InitialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const JsonValue = localStorage.GetItem(Key)
        if (JsonValue != null) return JSON.parse(JsonValue)

            if(typeof InitialValue === "function"){
                return (InitialValue as () => T)()
            } else{
                return InitialValue
            }
    })
}

useEffect(() => {
    localStorage.setItem(Key , JSON.stringify(value))
}, [key, value])

return [value , setValue] as [typeof Value, typeof setValue]
