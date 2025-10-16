import { Skeleton, useMediaQuery } from '@mui/material'
const DetailSkeleton = () => {
  const desktop = useMediaQuery('(min-width:768px)');

  return (
    <div style={{
        display: desktop ? 'flex' : 'block',
        gap: '15px',
    }}>
        <Skeleton variant='rounded' width={desktop ? 550 : '95%'} height={desktop ? 500 : 400}/>
        <div>
            <Skeleton width={300} height={24}/>
            <Skeleton width={300} height={48}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>

        </div>
    </div>
  )
}

export default DetailSkeleton