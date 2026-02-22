export type GenericPostHookOutput<dataType> = [
    (reqBody: object, customMethod?: string, token?: string) => Promise<dataType | void>,
    {
        data: dataType | ErrorResponse | undefined,
        isLoad: boolean,
        error: string | null
    }
]

export interface ErrorResponse {
    code: number,
    message: string
}