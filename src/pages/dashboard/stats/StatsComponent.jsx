import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import AluminiService from "../../../services/Alumini.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsComponent = () => {
  const [critere, setCritere] = useState("promotion");
  const [data, setData] = useState(null);

  //: 'critére du groupement chommage stat : [diplome  / promotion / technologie]' }

  const [critereCh, setCritereCh] = useState("promotion");
  const [dataCh, setDataCh] = useState(null);

  useEffect(() => {
    setData(null);
    fetchStatsData();
  }, [critere]);

  useEffect(() => {
    setDataCh(null);
    fetchStatsChData();
  }, [critereCh]);

  const fetchStatsChData = async () => {
    try {
      AluminiService.getAluminiChommageStats(
        critereCh,
        (response) => {
          console.log(response);
          setDataCh(response);
        },
        (error) => {
          toast.error(error);
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchStatsData = async () => {
    try {
      AluminiService.getAluminiStats(
        critere,
        (response) => {
          console.log(response);
          setData(response);
        },
        (error) => {
          toast.error(error);
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Nombre Aluminie par promotion par ${critere}`,
      },
    },
  };

  //alumini stats such as societe pays
  const renderChart = () => {
    if (!data) {
      return null;
    }

    const promotions = Array.from(
      new Set(data.flatMap((item) => item.promotions.map((p) => p.promotion)))
    );

    const chartData = {
      labels: data.map((item) => item[critere]),
      datasets: promotions.map((promotion) => ({
        label: "Promotion : " + promotion,
        data: data.map((item) => {
          const promotionData = item.promotions.find(
            (p) => p.promotion === promotion
          );
          return promotionData ? promotionData.count : 0;
        }),
        backgroundColor: getRandomColor(),
      })),
    };

    return <Bar data-test="StatChart" options={options} data={chartData} />;
  };

  //alumini chommage stats
  const renderChartCh = () => {
    if (!dataCh) {
      return null;
    }

    const chartData = {
      labels: dataCh.map((item) => item._id),
      datasets: [
        {
          label: "Average Years of Chômage",
          data: dataCh.map((item) => item.averageYearNumer),
          backgroundColor: getRandomColor(),
        },
      ],
    };

    return (
      <Bar data-test="chommageChart" options={optionsCh} data={chartData} />
    );
  };

  const optionsCh = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Statistique Chômage (${critereCh})`,
      },
    },
  };

  return (
    <div>
      <h2>Alumni Statistics</h2>
      <select data-cy="critere-select" value={critere} onChange={(e) => setCritere(e.target.value)}>
        {/* <option value="promotion">Promotion</option> */}
        <option value="societe">Societe</option>
        <option value="pays">Pays</option>
      </select>
      {renderChart()}
      <h2>Chommage Statistics</h2>

      <select data-cy="critereCh-select" value={critereCh} onChange={(e) => setCritereCh(e.target.value)}>
        <option value="promotion">Promotion</option>
        <option value="diplome">Diplome</option>
        {/* <option value="technologie">Technologie</option> */}
      </select>
      {renderChartCh()}
    </div>
  );
};

export default StatsComponent;
