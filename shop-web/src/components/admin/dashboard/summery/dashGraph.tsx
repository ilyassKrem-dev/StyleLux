
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { sessionType } from '../../../../lib/utils/types/authTypes';
import DashBoard from '../../../../lib/api/admin/dashboard/dashboard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

type GraphDataType = {
    currentMonth:number[],
    lastMonth:number[]

}


export default function DashGraph({session}:{
    session:sessionType
}) {
    const [graphData,setGraphData] = useState<GraphDataType>({
        currentMonth:Array.from({length:4},() => 0),
        lastMonth:Array.from({length:4},() => 0)
    })
    const isDark = localStorage.getItem("darkMode")
    
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels
        datasets: [
          {
            label: 'This month', // Label for the first line
            data: graphData.currentMonth, // Y-axis data points for Dataset 1
            fill: false, // Don't fill the area under the line
            borderColor: 'rgb(75, 192, 192)', // Color of the line
            tension: 0.1, // Smoothness of the line
          },
          {
            label: 'Last month', // Label for the second line
            data: graphData.lastMonth, // Y-axis data points for Dataset 2
            fill: false, // Don't fill the area under the line
            borderColor: 'rgb(255, 99, 132)', // Color of the line
            tension: 0.1, // Smoothness of the line
          },
        ],
      };
      const options = {
        responsive: true,
        width:"100%",
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
                color: isDark ? "white": "dark"
            }
          },
          tooltip: {
            mode: 'index' as const, 
            intersect: false,
            
          },
        },
        scales: {
          x: {
            title: {
              display: true
            },
            ticks:{
                color:"rgb(75, 192, 192)"
            }, grid: {
                color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)', // Grid lines color (light/dark mode)
                borderColor: isDark ? 'white' : 'black', // Border color of grid (optional)
                borderWidth: 1, // Border width
                lineWidth: 1, // Line width of the grid lines
                drawOnChartArea: true, // Draw grid lines in the chart area
            },
          },
          y: {
            title: {
              display: true,
              
             
            },
            ticks:{
                color:"rgb(75, 192, 192)"
            },grid: {
                color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)', // Grid lines color (light/dark mode)
                borderColor: isDark ? 'white' : 'black', // Border color of grid (optional)
                borderWidth: 1, // Border width
                lineWidth: 1, // Line width of the grid lines
                drawOnChartArea: true, // Draw grid lines in the chart area
            },
            beginAtZero: true,
          },
        },
      };
    useEffect(() => {
        const getGraphSummery = async() => {
            const res = await new DashBoard(session.uid).getGraphSummery();
            if(res?.success) {
                setGraphData(res.data as any)
            }
        }
        getGraphSummery()
    },[session])

    const lastMonthTotal = graphData.lastMonth.reduce((t,week) => t+week,0)
    const currentMonthTotal = graphData.currentMonth.reduce((t,week) => t+week,0)

    return (
        <div className="bg-white p-4 rounded-md dark:bg-dark flex-1">
            <div className="flex flex-col font-semibold">
                <h1 className="text-xl dark:text-white">Sales Graph</h1>
                <p className="text-sm text-black/50 dark:text-white/50">graph shows sales in this month and last month</p>
            </div>
            <div className='mt-6 flex justify-center items-center flex-col'>
                <div className='max-h-[300px] w-full flex justify-center items-center'>
                    <Line data={data} options={options}/>
                </div>
                <div className='flex items-center  text-sm font-semibold px-6 gap-3 text-dark dark:text-white'>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='h-[2px] bg-accent w-[20px]' />
                            <p className='text-black/50 dark:text-white/50'>Last month</p>
                        </div>
                        <p>${lastMonthTotal.toFixed(2)}</p>
                    </div>
                    <span className=' self-start text-black/50 dark:text-white/50'>|</span>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='h-[2px] bg-green-400 w-[20px]' />
                            <p className='text-black/50 dark:text-white/50'>This month</p>
                        </div>
                        <p>${currentMonthTotal.toFixed(2)}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}