// TODO: no any
export const text = (fn: (text: string) => any) => (e: any) => fn(e.target.value);