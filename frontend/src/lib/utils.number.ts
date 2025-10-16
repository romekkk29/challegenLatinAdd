//Esta función calcula el offset de nuestra query
export const calculateOffset = (pageSize:number, page:number)=>{
    return pageSize * (page-1)
}

//Función que calcula el número total de páginas
export const calculateTotalPages = (totalScreens:number, pageSize:number)=>{
    return totalScreens === 0 ? 1 :Math.ceil(totalScreens / pageSize)
}

//Formatear moneda
export const formatARS = (value:number)=>{
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(value)
}