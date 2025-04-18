'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Correct', 'Wrong'],
  datasets: [
    {
      label: 'Answers',
      data: [8, 2], // You can dynamically replace this
      backgroundColor: ['#00C49F', '#FF8042'],
      borderWidth: 1,
    },
  ],
};

export default function ResultChart() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-80 h-80">
        <Pie data={data} />
      </div>
    </div>
  );
}
