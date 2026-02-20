export type GenericHookOutput<dataType> = [
    () => void,
    {
        data: dataType | undefined,
        isLoad: boolean,
        error: string | null
    }
]