export type ScreenType = 'outdoor' | 'indoor'

export type DayWeek =  'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo' 

export type Interval = {
    from: string,
    to: string,
}

export type ScreenAvailableHours =  {
    day: DayWeek,
    interval?: Interval[],
    enable:boolean
}

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
    rules: ScreenAvailableHours[]
}

export interface ScreenListResponse {
    totalCount: number,
    data:Screen[]
}
