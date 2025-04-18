'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  correct: number;
  incorrect: number;
};

export default function PieChart({ correct, incorrect }: PieChartProps) {
  const data = {
    labels: ['Correct', 'Incorrect'],
    
    datasets: [
      {
        label: 'Answers',
        data: [correct, incorrect],
        backgroundColor: ['#4ADE80', '#F87171'],
        borderWidth: 1,
        
      },
    ],
  };

  return (
    <div className="w-80 h-80">
      <Pie data={data} />
    </div>
  );
}
