import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {Paper,Grid,Tooltip,IconButton,TextField} from '@mui/material'
import {
  BarPlot,
  LinePlot,
  ScatterPlot,
} from '@mui/x-charts'
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsAxisHighlight,
} from '@mui/x-charts'
import useReport from '@hooks/useReport'
import { SalesResponse } from 'types/sales'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
//  Activar los plugins
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default function Dashboard() {
  const { getSales } = useReport()
  const [data, setData] = useState<SalesResponse[]>([])
  const [allData, setAllData] = useState<SalesResponse[]>([]) //  Datos originales sin filtrar
 
  const today = dayjs().startOf('day');
  const [dateFrom,setDateFrom]=useState<Date>(today.toDate());
  const [dateTo,setDateTo]=useState<Date>(today.toDate());
  
  useEffect(() => {
    getSales((response: SalesResponse[]) => {
      setData(response)
      setAllData(response)
    })
  }, [getSales])

  //  Filtrar por rango de fechas
  const handleSearchDate = () => {
    const from = dayjs(dateFrom).startOf('day')
    const to = dayjs(dateTo).endOf('day')
    if (from.isAfter(to)) {
      alert('La fecha "Desde" no puede ser mayor que "Hasta".')
      return
    }
    const filtered = allData.filter((d) => {
      const saleDate = dayjs(d.date, 'YYYY-MM-DD')
      return saleDate.isSameOrAfter(from) && saleDate.isSameOrBefore(to)
    })
    setData(filtered)
  }
  // Calcular promedio
  const average = data.length
    ? data.reduce((acc, d) => acc + d.value, 0) / data.length
    : 0

  const dates = data.map((d) => d.date)
  const values = data.map((d) => d.value)

  // Buscar máximos y mínimos (puede haber más de uno)
  let maxEntries: SalesResponse[] = []
  let minEntries: SalesResponse[] = []

  if (data.length > 0) {
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)

    maxEntries = data.filter((d) => d.value === maxValue)
    minEntries = data.filter((d) => d.value === minValue)
  }

  const avgLine = Array(dates.length).fill(average)


  // Series con scatter para todos los máximos y mínimos
  const series = [
    {
      type: 'bar',
      yAxisId: 'ventas',
      label: 'Ventas',
      data: values,
      color: '#90caf9',
    },
    {
      type: 'line',
      yAxisId: 'ventas',
      label: `Promedio (${average.toFixed(2)})`,
      data: avgLine,
      color: 'orange',
      curve: 'linear',
    },
    ...(maxEntries.length
      ? [
          {
            type: 'scatter',
            yAxisId: 'ventas',
            label: 'Máximo',
            data: maxEntries.map((d) => ({ x: d.date, y: d.value })),
            color: 'green',
            markerSize: 8,
            tooltip: {
              trigger: 'item',
              label: (item: any) => `Máximo: ${item.y}`,
              valueFormatter: (item: any) => `${item.x}`,
            },
          },
        ]
      : []),
    ...(minEntries.length
      ? [
          {
            type: 'scatter',
            yAxisId: 'ventas',
            label: 'Mínimo',
            data: minEntries.map((d) => ({ x: d.date, y: d.value })),
            color: 'red',
            markerSize: 8,
            tooltip: {
              trigger: 'item',
              label: (item: any) => `Mínimo: ${item.y}`,
              valueFormatter: (item: any) => `${item.x}`,
            },
          },
        ]
      : []),
  ]
  return (
    <>
    <Grid sx={{ padding: '20px 0px 20px 0px'}} container spacing={2} alignItems="center">
      <Grid item xs={7} md={7} container alignItems="center">
        <h1 style={{ flexGrow: 1 }}>Ventas</h1>  
      </Grid>
      <Grid onClick={handleSearchDate} item xs={1} md={1} container justifyContent="flex-end">
        <Tooltip title="Buscar">
        <IconButton >
            <TroubleshootIcon/>
        </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={2} md={2} container alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={dayjs(dateFrom)} onChange={(newValue)=>{newValue?setDateFrom(newValue.toDate()):null}} maxDate={today} label={"Desde"} renderInput={(params) => <TextField {...params}  inputProps={{
                                          ...params.inputProps,
                                          readOnly: true, 
                                      }} size="small" />}
                                  />
            </LocalizationProvider>
      </Grid>
      <Grid item xs={2} md={2} container alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={dayjs(dateTo)} onChange={(newValue)=>{newValue?setDateTo(newValue.toDate()):null}} maxDate={today} label={"Hasta"} renderInput={(params) => <TextField {...params}  inputProps={{
                                          ...params.inputProps,
                                          readOnly: true, 
                                      }} size="small" />}
                                  />
            </LocalizationProvider>
      </Grid>
    </Grid>
    <Box sx={{ width: '100%', height: 400 }}>
      <ChartContainer
        series={series as any}
        xAxis={[
          {
            id: 'fecha',
            data: dates,
            scaleType: 'band',
            label: 'Fecha',
          },
        ]}
        yAxis={[
          {
            id: 'ventas',
            scaleType: 'linear',
            position: 'left',
            label: 'Ventas',
          },
        ]}
      >
        <ChartsAxisHighlight x="line" />
        <BarPlot />
        <LinePlot />
        <ScatterPlot />
        <ChartsTooltip /> {/* Tooltip global */}
        <ChartsXAxis
          axisId="fecha"
          tickLabelStyle={{ fontSize: 10, textAnchor: 'middle' }}
          tickPlacement="middle" // centra la barra en el tick
          tickInterval={(value, index) => {
            const forcedDates = [
              ...maxEntries.map((d) => d.date),
              ...minEntries.map((d) => d.date),
            ]
            return (
              forcedDates.includes(value) ||
              index === 0 ||
              index === dates.length - 1 ||
              index % 2 === 0
            )
          }}
        />
        <ChartsYAxis axisId="ventas" />
      </ChartContainer>
    </Box>
    <Box sx={{ display: "flex", gap:"20px",justifyContent:"center",flexWrap:"wrap" }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <h6 >Menor cantidad de ventas por día </h6>
            <h4 style={{color:'red'}}>{minEntries[0]?.value}</h4>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <h6 >Promedio de ventas por día </h6>
            <h4 style={{color:'orange'}}>{average.toFixed(1)}</h4>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <h6 >Mayor cantidad de ventas por día </h6>
            <h4 style={{color:'green'}}>{maxEntries[0]?.value}</h4>
      </Paper>
      </Box>
    </>
  )
}
