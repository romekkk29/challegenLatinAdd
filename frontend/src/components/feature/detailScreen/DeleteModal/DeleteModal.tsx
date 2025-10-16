import { Box, Button, Modal } from "@mui/material"
import styles from './DeleteModal.module.css'
import { getModalStyle } from "@lib/utils.misc"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
    open:boolean,
    handleClose:()=>void,
    name:string,
    handleDelete: ()=> void
}

const DeleteModal = ({open, handleClose, name, handleDelete}:Props) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-screen-modal"
        aria-describedby="Modal para agregar pantalla"
        keepMounted
    >
        <Box className={styles.modal} sx={{ ...getModalStyle()}}>
            <h2>Eliminar pantalla</h2>
            <p className={styles.text}>¿Estás seguro que deseas eliminar la pantalla <b>{name}</b>?</p>
            <footer className={styles.btnsContainer}>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    variant='contained' 
                    startIcon={<DeleteOutlineIcon/>} 
                    onClick={handleDelete}
                    color="error"
                    type='submit'
                >
                    Eliminar
                </Button>
            </footer>
        </Box>
    </Modal>
  )
}

export default DeleteModal