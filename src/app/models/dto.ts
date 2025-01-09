export interface DTO<T> {
    success : boolean;
    data : T extends undefined? never: T;
    error :  undefined extends T? string : never;
};


