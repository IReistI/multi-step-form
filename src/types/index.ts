export type Step1 = {
    name: string
    email: string
    phone: string
};

export type Step2 = {
    option: string
    billing: number
};

export type Step3 = {
    name: string
    value: number
    isRemove?: boolean
};