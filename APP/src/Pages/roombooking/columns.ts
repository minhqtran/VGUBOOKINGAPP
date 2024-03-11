// columns.ts

import { useMemo } from 'react';

const generateDates = () => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toDateString()); // Convert date to string for simplicity
  }

  return dates;
};

const columns = useMemo(() => {
  const dates = generateDates();

  const dateColumns = dates.map((date) => ({
    Header: date,
    accessor: date, // Assuming your data has properties corresponding to the dates
  }));

  const otherColumns = [
    // Define other columns as needed
    {
      Header: 'Room Name',
      accessor: 'roomName',
    },
    {
      Header: 'Capacity',
      accessor: 'capacity',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];

  return [...otherColumns, ...dateColumns];
}, []);

export default columns;
