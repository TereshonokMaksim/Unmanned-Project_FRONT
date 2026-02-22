import { UsePost } from "../genericPostHook"; 
import { useUserContext } from "../../../../context";


export interface UseEditUserCreds {
    surname: string
    name: string,
    partonymic: string
    birthday: string
    phoneNumber: string
    email: string,
}

export type Help = [
    (credentials: UseEditUserCreds) => Promise<void>,
    {
        isLoading: boolean,
        error: string | null
    }
]

export function UseEditUser(): Help{
    const [postReq, {error, data: dat, isLoad}] = UsePost<null>("users/profile", null)
    const {token} = useUserContext()
    async function UseRequest(creds: UseEditUserCreds): Promise<void>{
        await postReq(creds, "PATCH", token ? token : undefined)
    }
    return [UseRequest, {isLoading: isLoad, error}]
}