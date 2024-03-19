// BuildingSelectionPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const BuildingSelectionPage: React.FC = () => {
  return (
    <div>
      <h1>Select Building</h1>
      <ul>
        <li>
          <Link to="/room-booking/lecture-hall">Lecture Hall</Link>
        </li>
        <li>
          <Link to="/room-booking/admin-building">Admin Building</Link>
        </li>
        <li>
          <Link to="/room-booking/academic-cluster-1">Academic Cluster 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default BuildingSelectionPage;
