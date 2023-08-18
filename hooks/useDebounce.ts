import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {

            return () => {
                clearTimeout(timer)
            }
        }, delay || 1000)

        setDebouncedValue(value)
    }, [value, delay])

    return debouncedValue
}
