import { ApexOptions } from "apexcharts";

interface IChart {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  options: ApexOptions;
}

const DAYS_COUNT = 30;

const getUSD = () => {
  const getRandom = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const res = Array(DAYS_COUNT).fill('').map(() => getRandom(465, 480))
  return res;
}

const getDays = () => {
  const days = Array(DAYS_COUNT).fill('').map((_: string, i: number) => {
    const day = new Date();
    day.setDate(i + 1);
    return day.toISOString();
  })

  return days;
}

export const lineChart: IChart = {
  series: [{
    name: 'покупка',
    data: getUSD()
  }, {
    name: 'продажа',
    data: getUSD()
  }],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: getDays(),
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
};

export const barChart: IChart = {
  series: [{
    name: 'продажи',
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#233D82'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Алматы', 'Астана', 'Караганда', 'Атырау', 'Актобе', 'Актау', 'Кызылорда', 'Шымкент'],
    }
  },
};

export const columnChart: IChart = {
  series: [{
    name: 'закрытые',
    data: [44, 55, 57, 56]
  }, {
    name: 'новые',
    data: [76, 85, 101, 98]
  }, {
    name: 'текущие',
    data: [35, 41, 36, 26]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#D73C4A', '#0016BE', '#E7BE34'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['кв I', 'кв II', 'кв III', 'кв IV'],
    },
    fill: {
      opacity: 1
    },
  },
};


export const radialChart: IChart = {
  series: [63],
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    colors: ['#233D82'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '63%',
        }
      },
    },
    labels: ['▲ 2%'],
  },
};