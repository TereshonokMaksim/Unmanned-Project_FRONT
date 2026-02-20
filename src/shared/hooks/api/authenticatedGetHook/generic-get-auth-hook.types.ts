import { AuthErrorResponse } from "../user/creds-out"


export type GenericHookOutput<dataType> = [
    (token: string) => void,
    {
        data: dataType | undefined | AuthErrorResponse,
        isLoad: boolean,
        error: string | null
    }
]