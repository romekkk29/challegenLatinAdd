import { Alert, Box, Button, Collapse, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, TextareaAutosize } from "@mui/material"
import { getModalStyle } from "@lib/utils.misc"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import styles from './AddScreenModal.module.css'
import HeightIcon from '@mui/icons-material/Height';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useAddScreenForm } from "@hooks/useAddScreenForm";
import { Screen } from "types/screen";
import { FormEvent } from "react";


type Props = {
    open:boolean,
    handleClose: () => void,
    action:  (screen: Screen)=>void,
    initialValues?: Screen
}

const AddScreen = ({open, handleClose, action, initialValues}:Props) => {
    //Extraemos los datos del hook personalzdo
    const {values, onSubmit, inputErrors, onChange, error, resetValues} = useAddScreenForm({
        //Enviamos un objeto initialValues para validar si estamos editando o creando una nueva pantalla
        initialValues: {
            name: initialValues?.name || '',
            description: initialValues?.description || '',
            pricePerDay: initialValues?.price_per_day || '',
            resolutionWidth: initialValues?.resolution_width || '',
            resolutionHeight: initialValues?.resolution_height || '',
            type: initialValues?.type || 'indoor'
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        onSubmit((values)=>{
            const {type, resolutionWidth, resolutionHeight, pricePerDay, description, name} = values
            action({
                name,
                description,
                price_per_day: pricePerDay,
                resolution_height: resolutionHeight,
                resolution_width: resolutionWidth,
                type
            })
            handleClose()
            
            !initialValues && resetValues()
        })
    }

    return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-screen-modal"
        aria-describedby="Modal para agregar pantalla"
    >
        <Box className={styles.modal} sx={{ ...getModalStyle()}}>
            <h2>{initialValues ? 'Editar' : 'Agregar'} pantalla</h2>
            <Collapse in={Boolean(error)} unmountOnExit>
                <Alert severity="error">{error}</Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label="Nombre"
                        name='name'
                        placeholder='Pantalla avenida Este...'
                        value={values.name}
                        onChange={onChange}
                        error={Boolean(inputErrors.name)}
                        helperText={inputErrors.name}
                    />
                    <FormControl fullWidth error={Boolean(inputErrors.description)}>
                        <TextareaAutosize
                            minRows={3}
                            name="description"
                            className={styles.inputTextArea}
                            value={values.description}
                            onChange={onChange}
                            style={{
                                outline: inputErrors.description ? '1px solid red' : undefined
                            }}
                            placeholder="Esta es una pantalla situada en la Avenida Este ... "
                        />
                        <FormHelperText>{inputErrors.description}</FormHelperText>
                    </FormControl>
                    <div className={styles.sizeInputsContainer}>
                        <TextField
                            size="small"
                            placeholder="1920"
                            label="Ancho"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TrendingFlatIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            name="resolutionWidth"
                            value={values.resolutionWidth}
                            onChange={onChange}
                            error={Boolean(inputErrors.resolutionWidth)}
                            helperText={inputErrors.resolutionWidth}
                        />
                        <TextField
                            size="small"
                            placeholder="1080"
                            label="Alto"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HeightIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            name="resolutionHeight"
                            value={values.resolutionHeight}
                            onChange={onChange}
                            error={Boolean(inputErrors.resolutionHeight)}
                            helperText={inputErrors.resolutionHeight}
                        />
                    </div>
                    <TextField
                        fullWidth   
                        placeholder="1500"
                        label="Precio por día"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon fontSize="small"/>
                                </InputAdornment>
                            ),
                        }}
                        name="pricePerDay"
                        value={values.pricePerDay}
                        onChange={onChange}
                        error={Boolean(inputErrors.pricePerDay)}
                        helperText={inputErrors.pricePerDay}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="type-screen-label">Tipo</InputLabel>
                        <Select
                            labelId="type-screen-label"
                            id="demo-simple-select"
                            label="Tipo"
                            name="type"
                            value={values.type}
                            onChange={onChange}
                        >
                            <MenuItem value={'indoor'}>Indoor</MenuItem>
                            <MenuItem value={'outdoor'}>Outdoor</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <footer className={styles.btnsContainer}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        variant='contained' 
                        startIcon={initialValues ? <EditIcon/> : <AddIcon/>} 
                        // onClick={handleOpenAddModal}
                        type='submit'
                    >
                        {initialValues ? 'Editar' : 'Agregar'}
                    </Button>
                </footer>
            </form>
        </Box>
    </Modal>
  )
}

export default AddScreen