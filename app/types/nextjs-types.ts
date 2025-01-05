
export type Params = Promise<Record<string, string>>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type PropsNextPage = {
    params: Params,
    searchParams: SearchParams,
};

