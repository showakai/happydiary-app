import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { theme } from "../theme/theme";
import { DailyContents } from "../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarType{
    monthlyDailyContents:DailyContents[];
}



export const BarChart = ({monthlyDailyContents}:BarType) => {
  
    const categoryCount = () => {
        const categories = monthlyDailyContents.reduce((acc, item) => {
            if(item.category){
                acc[item.category] = (acc[item.category] || 0) +1
            }
            return acc
        }, {} as Record<string, number>)
        return categories
    }
  
    const categoryData = categoryCount()
  const options : ChartOptions<'bar'>= {
    layout:{
        padding:{
            top:0,
            bottom:0
        }},
    plugins: {
      title: {
        display: false,
      },
      legend:{
        labels:{
            boxWidth:8,
            boxHeight:8,
            usePointStyle:true,
            pointStyle:"circle",
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    

    scales: {
        
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        stacked: true,
      },
      y: {
        beginAtZero:true,
        
        min:0,
        ticks: {
            
          display: false,
        },
        grid: {
          display: false,

        },
        stacked: true,
      },
    },


  };

const labels = ["最高"]


  const data = {
    labels,
    datasets: [
      {
        label: "最高",
        data: [categoryData["最高"]],
        backgroundColor:theme.palette.error.main,
        barThickness:13,

    borderRadius: 5, // すべての角を丸める
        categoryPercentage: 1.0, // カテゴリの隙間をなくす

    

      },
      {
        label: "いいこと",
        data: [categoryData["良い"]],
        backgroundColor:theme.palette.pink.main,
 
                barThickness:13,

        
            borderRadius: 5, // すべての角を丸める
                categoryPercentage: 1.0, // カテゴリの隙間をなくす

      },
      {
        label: "ちょっといいこと",
        data: [categoryData["ちょっと良い"]],
        backgroundColor: theme.palette.secondary.main,

        
                barThickness:13,

            borderRadius: 5, // すべての角を丸める
                categoryPercentage: 1.0, // カテゴリの隙間をなくす

      },
    ],
  };

  //合計個数
    // const total = data.datasets.reduce((sum, dataset) => {
    //     return sum + dataset.data[0]
    // }, 0)


  return (
    <Box
      sx={{
        height: {
          xs: "60px",
          sm: "80px",
        },
        width: "100%",
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
};
