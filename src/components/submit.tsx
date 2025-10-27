"use client"

import { useFormStatus } from "react-dom"

export const Submit=()=>{
    const {pending}=useFormStatus()
    return(
        <button type="submit" disabled={pending}>
            {pending ? "Submitting...":"Submit"}
        </button>
    )
}