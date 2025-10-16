export type ScreenType = 'outdoor' | 'indoor'

export interface QueryParams {
    pageSize: number,
    offset: number,
    name?: string,
    type?: ScreenType | null
}

export interface Screen {
    id?: string,
    name: string,
    description: string,
    picture_url?: string,
    user_id?: number,
    price_per_day: string,
    resolution_height: string,
    resolution_width: string,
    type: ScreenType,
}

export interface ScreenListResponse {
    totalCount: number,
    data:Screen[]
}
