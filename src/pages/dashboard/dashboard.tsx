import Chart from 'react-apexcharts';
import ChartWrapper from "./ui/ChartWrapper"
import { barChart, columnChart, lineChart, radialChart } from "./const";

const Dashboard = () => {
  return (
    <>
      <ChartWrapper option="Доллар" title="График курса валют">
        <Chart options={lineChart.options} series={lineChart.series} type="area" height={350} />
      </ChartWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 mt-16">
        <ChartWrapper option="за год" title="Продажи по Казахстану">
          <Chart options={barChart.options} series={barChart.series} type="bar" height={220} />
        </ChartWrapper>
        <ChartWrapper option="за год" title="Статистика заявок">
          <Chart options={columnChart.options} series={columnChart.series} type="bar" height={220} />
        </ChartWrapper>
        <ChartWrapper option="за день" title="KPI">
          <div className="flex flex-col items-center">
            <Chart options={radialChart.options} series={radialChart.series} type="radialBar" height={220} />
            <p><span className="text-green-500">▲</span> прирост за день</p>
          </div>
        </ChartWrapper>
      </div>
    </>
  )
}

export default Dashboard