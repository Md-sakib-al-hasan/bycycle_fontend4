
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetAllSaleDetialsQuery } from '../../../redux/features/user/userApi';

// Register the components needed for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

  

const ChartComponent = () => {
  const {data:SalesData} = useGetAllSaleDetialsQuery([{name:"sort",value:"createdAt"},{name:"limit",value:7}],{ pollingInterval: 5 * 60 * 60 * 1000 })
  const dayNames = SalesData?.data?.result.map((item: { dayName: string }) => item.dayName);
  const percentages = SalesData?.data?.result.map((item: { salePercentage: number }) => item.salePercentage);
  
  const data = {
    labels: dayNames,
    datasets: [
      {
        label: 'Sales',
        data: percentages,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };



  return <Line data={data}  />;
};

export default ChartComponent;
