// src/pages/PromoterPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '../components/Table';

import '../styles/student.css';
//import Footer from '../components/Footer';

const StudentPage = ({ username, onLogout, studentData, onUpdate }) => {
  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <div className="student-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Archiwum prac dyplomowych</h1>
      <div className="tables">
        <div className="left-table">
          <Table
            headers={['Tytuł', 'Status']}
            data={studentData}
            onRowClick={setSelectedWork}
          />
        </div>
        <div className="right-table">
          {selectedWork ? (
            <Table
              headers={['Pole', 'Wartość']}
              data={Object.entries(selectedWork).map(([key, value]) => ({
                key,
                value,
              }))}
            />
          ) : (
            <p>Wybierz pracę, aby zobaczyć szczegóły</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;