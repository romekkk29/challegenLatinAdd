import { Alert, Button, Chip, Collapse, Paper, TextField, Typography } from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FormEvent, useRef, useState } from 'react';
import styles from './ScreenFilter.module.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QueryParams, ScreenType } from 'types/screen';

type Props = {
    onSubmit: (values: QueryParams)=>void,
    pageSize?:number
}

const ScreenFilter = ({pageSize = 10,onSubmit}:Props) => {
    //State que almacena el estado de apertura del filtro
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    //Almacenamos los valores del formulario
    const [filterValues, setFilterValues] = useState({
        name: '',
        outdoor: true,
        indoor: true
    })
    //State que almacena el mensaje de advertencia
    const [warning, setWarning] = useState<string | null>(null)
    //Guardamos la referencia de la busqueda anterior
    const previousFilter = useRef(filterValues)
    
    //Función encargada de cambiar el estado de apertura del filtro
    const toggleFilterOpen = ()=> setFilterOpen(!filterOpen)
    
    //Obtenemos los valores de los inputs del filtro
    const handleFilterValues = (name: string, value: string | boolean)=>{
        setFilterValues({
            ...filterValues,
            [name]: value
        })
    }

    //Función encargada de enviar los nuevos valores de la query
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let type: ScreenType | undefined | null
        //Si los valores por los que se quiere filtrar son iguales a los que ya se filtraron no se ejecutará la consulta
        if (filterValues === previousFilter.current) return

        //Validamos los tipos de pantalla selccionados y enviamos un valor acorde a la query
        if (filterValues.outdoor && filterValues.indoor) {
            type = undefined
        } else if (filterValues.outdoor){
            type = 'outdoor'
        } else if (filterValues.indoor) {
            type = 'indoor'
        } else {
            type = null
        }

        //Si no se selecciona un tipo de pantalla se enviará una advertencia y no se continuará con el proceso
        if (type === null) {
            setWarning("Debes seleccionar un tipo de pantalla.")
            return
        }

        setWarning(null)
        
        const queryValues:QueryParams = {
            pageSize,
            offset: 0,
            name: filterValues.name,
            type
        }

        //Guardamos los datos del filtro para validar en la siguiente consulta
        previousFilter.current = filterValues

        if (!queryValues.type) {
            delete queryValues.type
        }

        onSubmit(queryValues)
    }




    return (
        <div>
            <Button 
                variant='outlined'
                startIcon={<FilterAltOutlinedIcon/>}
                endIcon={filterOpen ? <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
                onClick={toggleFilterOpen}
            >Filtros</Button>
            <Collapse
                in={filterOpen}
                timeout='auto'
                unmountOnExit
            >
                <Paper className={styles.filterBoxContainer} component="form" onSubmit={handleSubmit}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputSection}>
                            <Typography variant='caption'>Por nombre</Typography>
                            <TextField
                                variant='outlined'
                                size='small'
                                label="Nombre"
                                name='name'
                                value={filterValues.name}
                                placeholder='Pantalla avenida Este'
                                onChange={(event)=> {handleFilterValues(event.target.name, event.target.value)}}
                            />
                        </div>
                        <div className={styles.inputSection}>
                            <Typography variant='caption'>Por tipo</Typography>
                            <div className={styles.chipsContainer}>
                                <Chip 
                                    label="Indoor" 
                                    icon={filterValues.indoor ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                                    color={filterValues.indoor ? 'success':'default'}
                                    onClick={()=> handleFilterValues('indoor',!filterValues.indoor)}
                                />
                                <Chip 
                                    label="Outdoor"
                                    icon={filterValues.outdoor ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                                    color={filterValues.outdoor ? 'success':'default'}
                                    onClick={()=> handleFilterValues('outdoor',!filterValues.outdoor)}
                                />
                            </div>
                        </div>
                        <Collapse in={Boolean(warning)}>
                            <Alert severity='warning'>{warning}</Alert>
                        </Collapse>
                    </div>
                    <div className={styles.filterBtnsContainer}>
                        <Button variant='contained' type='submit'>Filtrar</Button>
                    </div>
                </Paper>
            </Collapse>
        </div>
    )
}

export default ScreenFilter