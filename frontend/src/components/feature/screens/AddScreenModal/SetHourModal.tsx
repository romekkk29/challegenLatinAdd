import * as React from 'react';
import { Box,Modal,TextField, Button,IconButton} from "@mui/material"
import { getModalStyle } from "@lib/utils.misc"
import styles from './SetHourModal.module.css'
import { ScreenAvailableHours } from "types/screen";
import Switch from '@mui/material/Switch';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { useSetHourForm } from '@hooks/useSetHourForm';

type Props = {
    open:boolean,
    handleClose: () => void,
    daySelected:ScreenAvailableHours,
    setDaySelected: React.Dispatch<React.SetStateAction<ScreenAvailableHours>>,
    handleSaveDaySelected:() => void,
}

const SetHourAvailable = ({open, handleClose,daySelected,setDaySelected,handleSaveDaySelected}:Props) => {

    const {error,resetError,validateIntervals,handleChangeSwitch,handleChangeTime,handleAddInterval,handleRemoveInterval} = useSetHourForm({setDaySelected})

    const handleSave = () => {
        if (!daySelected.enable) {
            handleSaveDaySelected();
            return;
        }
        if (!validateIntervals(daySelected.interval || [])) return;
        handleSaveDaySelected();
    };
    const handleCloseModal=()=>{
        resetError()
        handleClose()
    }
    return (
    <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="add-screen-modal"
        aria-describedby="Modal para agregar pantalla"
    >
        <Box className={styles.modal} sx={{ ...getModalStyle()}}>
            <h4>Hora de funcionamiento ({daySelected.day.toUpperCase()})</h4>
            <div className={styles.switchContainer}>
                <Switch
                checked={daySelected.enable}
                onChange={handleChangeSwitch}
                />
                <p>{daySelected.enable?"Encendida":"Apagada"}</p>
            </div>
            {daySelected.enable &&
            daySelected.interval?.map((el, index) => (
                <Box
                key={index}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                }}
                >

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <TimePicker
                    ampm // permite AM/PM pero usamos HH:mm
                    label="Desde"
                    value={dayjs(el.from, "HH:mm")}
                    onChange={(newValue) =>
                        handleChangeTime(index, "from", newValue)
                    }
                    renderInput={(params) => <TextField {...params}  inputProps={{
                            ...params.inputProps,
                            readOnly: true, 
                        }} size="small" />}
                    />
                    <TimePicker
                    ampm
                    label="Hasta"
                    value={dayjs(el.to, "HH:mm")}
                    onChange={(newValue) =>
                        handleChangeTime(index, "to", newValue)
                    }
                    renderInput={(params) => <TextField {...params} inputProps={{
                            ...params.inputProps,
                            readOnly: true, 
                        }} size="small" />}
                    />
                </LocalizationProvider>
                
                <IconButton disabled={index>0?false:true} color={"error"} onClick={() => handleRemoveInterval(index)}>
                    <Delete />
                </IconButton>
                </Box>
            ))}

            {daySelected.enable && (
            <Box sx={{ marginTop: "20px" }}>
                <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={handleAddInterval}
                >
                Agregar rango
                </Button>
            </Box>
            )}
            {error && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>
                {error}
            </p>
            )}
            <footer className={styles.btnsContainer}>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button
                    variant='contained' 
                    onClick={handleSave}
                >
                    Guardar
                </Button>
           </footer>
        </Box>
    </Modal>
  )
}

export default SetHourAvailable