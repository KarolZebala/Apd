// src/pages/PromoterPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '../components/Table';

import '../styles/promoter.css';

const PromoterPage = ({ username, onLogout, promoterData = { promotions: [], reviews: [] }, onUpdate }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [view, setView] = useState('promotions'); // 'promotions' or 'reviews'
  const [localPromoterData, setLocalPromoterData] = useState({
    promotions: [],
    reviews: [],
  });

  const navigate = useNavigate();


  useEffect(() => {
    // Ustaw przykładowe dane w przypadku braku danych z backendu
    if (!promoterData.promotions.length) {
      setLocalPromoterData((prevData) => ({
        ...prevData,
        promotions: [
          { title: 'test_1', status: 'Lorem Ipsum' },
          { title: 'test_2', status: 'Lorem Ipsum' },
        ],
      }));
    } else {
      setLocalPromoterData((prevData) => ({
        ...prevData,
        promotions: promoterData.promotions,
      }));
    }

    if (!promoterData.reviews.length) {
      setLocalPromoterData((prevData) => ({
        ...prevData,
        reviews: [
          { title: 'test_1', status: 'Lorem Ipsum' },
          { title: 'test_2', status: 'Lorem Ipsum' },
        ],
      }));
    } else {
      setLocalPromoterData((prevData) => ({
        ...prevData,
        reviews: promoterData.reviews,
      }));
    }
  }, [promoterData]);

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Archiwum prac dyplomowych</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${view === 'promotions' ? 'active' : ''}`}
          onClick={() => setView('promotions')}
        >
          Moje Promocje
        </button>
        <button
          className={`toggle-button ${view === 'reviews' ? 'active' : ''}`}
          onClick={() => setView('reviews')}
        >
          Moje Recenzje
        </button>
      </div>
      {view === 'promotions' ? (
        <div className="tables">
          <div className="left-table">
            <Table
              headers={['Tytuł', 'Status']}
              data={localPromoterData.promotions}
              onRowClick={setSelectedWork}
            />
          </div>
          <div className="right-table">
            {selectedWork ? (
              <Table
                headers={['Pole', 'Wartość']}
                data={Object.entries(selectedWork).map(([key, value]) => ({ key, value }))}
              />
            ) : (
              <p>Wybierz pracę, aby zobaczyć szczegóły</p>
            )}
          </div>
        </div>
      ) : (
        <div className="tables">
          <div className="left-table">
            <Table
              headers={['Tytuł', 'Status']}
              data={localPromoterData.reviews}
              onRowClick={setSelectedWork}
            />
          </div>
          <div className="right-table">
            {selectedWork ? (
              <Table
                headers={['Pole', 'Wartość']}
                data={Object.entries(selectedWork).map(([key, value]) => ({ key, value }))}
              />
            ) : (
              <p>Wybierz pracę, aby zobaczyć szczegóły</p>
            )}
          </div>
        </div>
      )}

      <button type="button" onClick={() => navigate("/create-diploma")} className='add-diploma-button' >
        Add Diploma
      </button>

      <Footer />
    </div>
  );
};

export default PromoterPage;
