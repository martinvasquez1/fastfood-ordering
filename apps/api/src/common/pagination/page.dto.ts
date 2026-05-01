import { PageOptions } from "./page-options.dto";

export class PageDto<T> {
    data: T[];
    meta: {
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }

    constructor(data: T[], pageOptions: PageOptions, itemCount: number) {
        this.data = data;

        const { page, take } = pageOptions;

        this.meta = {
            page: page || 1,
            take: take || 10,
            itemCount: itemCount,
            pageCount: Math.ceil(itemCount / (take || 10)),
            hasPreviousPage: (page || 1) > 1,
            hasNextPage: (page || 1) < Math.ceil(itemCount / (take || 10)),
        }
    }
}