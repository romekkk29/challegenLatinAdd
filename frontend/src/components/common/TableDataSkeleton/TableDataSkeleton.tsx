import { Skeleton } from "@mui/material"

const ItemSkeleton = ()=>{
    return (
        <div style={{display: 'flex', gap:'15px', padding: '15px', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column',gap:'5px'}}>
                <Skeleton variant="rectangular" width="170px" height={10} />
                <Skeleton variant="rectangular" width="130px" height={10} />
            </div>
            <div style={{flex: 1}}/>
            <Skeleton variant="rectangular" width="90px" height='40px'/>
        </div>
    )
}

const TableDataSkeleton = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    }}>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>
        <ItemSkeleton/>

    </div>
    )
}

export default TableDataSkeleton