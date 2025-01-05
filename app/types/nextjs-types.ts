
export type Params = Promise<Record<string, string>>;
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type PropsNextPage = {
    params: Params,
    searchParams: SearchParams,
};

