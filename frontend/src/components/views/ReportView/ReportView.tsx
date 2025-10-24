import Dashboard from '@components/feature/report/dashboard/Dashboard'
import style from './Home.module.css'

const ReportView = () => {
  return (
    <div className={style.homeContainer}>
         <section className={style.salesContentBox}>
            <Dashboard></Dashboard>
        </section>
    </div>
  )
}

export default ReportView