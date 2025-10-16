import TvIcon from '@mui/icons-material/Tv';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const navLinks = [
    [
        {
            path: '/',
            name: 'Pantallas',
            icon: TvIcon
        },
        {
            path: '/report',
            name: 'Reportes',
            icon: AssessmentOutlinedIcon,
            disabled: true
        },
        {
            path: '/companies',
            name: 'Empresas',
            icon: BusinessOutlinedIcon,
            disabled: true
        },
        {
            path: '/campaigns',
            name: 'Campañas',
            icon: CampaignOutlinedIcon,
            disabled: true
        },
    ],
    [
        {
            path: '/multimedia',
            name: 'Multimedia',
            icon: InsertPhotoOutlinedIcon,
            disabled: true
        },
    ],
    [
        {
            path: '/setting',
            name: 'Configuración',
            icon: SettingsOutlinedIcon,
            disabled: true
        },
    ]
] 

export const getModalStyle = () => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        outline: 'none'
    }
};