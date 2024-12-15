// TODO: no any
export const text = (fn: (text: string) => any) => (e: any) => fn(e.target.value);
export const file = (fn: (file: FileList) => any) => (e: any) => fn(e.target.files);