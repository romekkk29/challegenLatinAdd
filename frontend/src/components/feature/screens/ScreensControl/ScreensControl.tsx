import useScreen from '@hooks/useScreen'
import { useCallback, useEffect, useState } from 'react'
import { QueryParams, Screen, ScreenListResponse } from 'types/screen'
import styles from './ScreensControl.module.css'
import { Button, Pagination } from '@mui/material'
import ListScreens from '../ListScreens/ListScreens'
import ScreenFilter from '../ScreensFilter/ScreenFilter'
import { calculateOffset, calculateTotalPages } from '@lib/utils.number'
import { defaultPageSize as pageSize } from '@lib/config'
import AddIcon from '@mui/icons-material/Add';
import AddScreen from '../AddScreenModal/AddScreenModal'
import { toast } from 'sonner'

const INITIAL_PAGE = 1

const ScreensControl = () => {
    const {getScreens, loading, addScreen} = useScreen()
    //State que controla la visualización del modal 'agregar'
    const [isAddOpen, setIsAddOpen] = useState(false)
    //State donde se almacena las pantallas
    const [screens, setScreens] = useState<Screen[]>([])
    //Cantidad total de pantallas
    const [totalScreens, setTotalScreens] = useState<number>(0)
    //State que almacena la página actual del listado
    const [page, setPage] = useState<number>(INITIAL_PAGE)
    //State donde se almacena los parámetros que usaremos para buscar en la bd
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pageSize,
        offset: calculateOffset(pageSize, page)
    })

    const handleCloseAddModal = ()=> setIsAddOpen(false)
    const handleOpenAddModal = ()=> setIsAddOpen(true)

    //Actualizamos la página y guardamos los valores en los estados correspondientes
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) =>{
        if (event) {
            setPage(value)
            setQueryParams((prev) => ({
                ...prev,
                offset: calculateOffset(pageSize, value)
            }))
        }
    } 

    //Al enviar el filtro se ejecturá esta función.
    //useCallback para no crear la función en cada renderizado.  
    const handleFilterSubmit = useCallback((values: QueryParams) => {
        setPage(INITIAL_PAGE)
        setQueryParams(values)
    }, [])

    //Cargamos una nueva pantalla en array
    const handleAddScreen = (newScreen: Screen)=>{
        const promise = addScreen(newScreen, (response:Screen)=>{
            setScreens((prev) => [response, ...prev])
            setPage(INITIAL_PAGE)
            setQueryParams((prev) => ({
                ...prev,
                offset: calculateOffset(pageSize, INITIAL_PAGE)
            }))
        })

        //Enviamos la promesa a través del objeto toast para recibir un feedback del estado de nuestra petición
        toast.promise(promise, {
            loading: 'Agregando...',
            success: () => {
                return `Pantalla agregada correctamente`;
            },
            error: (error) => error,
        })
    }

    //Ejecutamos este efecto cuando se carga el módulo
    useEffect(() => {
        //Obtenemos las pantallas enviando parámetros a la query
        getScreens(queryParams,(response:ScreenListResponse)=>{
            setScreens(response.data)
            setTotalScreens(response.totalCount)
        })
    }, [getScreens, queryParams])

    return (
        <>
            <div className={styles.screensControlContainer}>
                <div className={styles.screensControlHeader}>
                    <h1>Pantallas</h1>
                    <Button 
                        variant='contained' 
                        startIcon={<AddIcon/>} 
                        onClick={handleOpenAddModal}
                    >
                        Agregar<span className={styles.titleSpan}>&nbsp;pantalla</span>
                    </Button>
                </div>
                <ScreenFilter 
                    pageSize={pageSize}
                    onSubmit={handleFilterSubmit}
                />
                <ListScreens screens={screens} loading={loading} addModal={handleOpenAddModal}/>
                <Pagination 
                    color='primary'
                    count={calculateTotalPages(totalScreens, pageSize)}
                    variant='outlined'
                    shape="rounded"
                    onChange={handlePage}
                    page={page}
                />
            </div>
            <AddScreen open={isAddOpen} handleClose={handleCloseAddModal} action={handleAddScreen}/>
        </>
    )
}

export default ScreensControl