import ScreenItem from '../ListItemScreen/ListItemScreen'
import { Paper, Stack } from '@mui/material'
import style from './ListScreens.module.css'
import { Screen } from 'types/screen'
import EmptyDataAdvice from '@components/common/EmptyDataAdvice/EmptyDataAdvice'
import TableDataSkeleton from '@components/common/TableDataSkeleton/TableDataSkeleton'

type Props = {
    screens: Screen[],
    loading?: boolean,
    addModal: () => void
}

//Render list of screens
const ListScreens = ({screens, loading, addModal}:Props) => {
    return (
        <Paper square className={style.listScreensWrapper}>
            {
                loading ? (
                    <TableDataSkeleton/>
                ):screens.length === 0 ? (
                    <EmptyDataAdvice
                        actionButton={{
                            label: 'Agregar',
                            action: addModal
                        }}
                    >
                        No se encontraron datos.
                    </EmptyDataAdvice>
                ):(
                    <Stack className={style.listScreens}>
                        {
                            screens.map((screen) => {
                                return <ScreenItem key={screen.id} screen={screen}/>
                            })
                        }
                    </Stack>
                )
            }
        </Paper>
    )
}

export default ListScreens