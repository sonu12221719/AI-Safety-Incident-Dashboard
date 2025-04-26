import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Filters from './components/Filters';
import IncidentList from './components/IncidentList';
import ReportForm from './components/ReportForm';
import SeverityChart from './components/SeverityChart';

const App = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [sortOrder, setSortOrder] = useState('Low to High');
  const [expandedIds, setExpandedIds] = useState({});
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      date: "15/03/2025",
      severity: "Medium",
      description: "Algorithm consistently favored certain demographics and was found to be biased."
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      date: "01/04/2025",
      severity: "High",
      description: "LLM provided incorrect safety procedure information and was found to be hallucinating."
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      date: "20/03/2025",
      severity: "Low",
      description: "Chatbot inadvertently exposed non-sensitive user metadata and was found to be leaking data."
    }
  ]);
  

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addIncident = (newIncident) => {
    const incidentWithDate = {
      ...newIncident,
      date: new Date().toLocaleDateString('en-GB')
    };
    setIncidents(prev => [...prev, incidentWithDate]);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (selectedSeverity === 'All') return true;
    return incident.severity === selectedSeverity;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const severityOrder = { Low: 1, Medium: 2, High: 3 };
    if (sortOrder === 'Low to High') {
      return severityOrder[a.severity] - severityOrder[b.severity];
    } else {
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
  });

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>AI INCIDENT SAFETY DASHBOARD</h1>
      <div className="main-content">
        <div className="left-section">
          <Filters
            selectedSeverity={selectedSeverity}
            setSelectedSeverity={setSelectedSeverity}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <IncidentList
            incidents={sortedIncidents}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
          />
        </div>
        <div className="right-section">
          <SeverityChart incidents={incidents} />
          <ReportForm addIncident={addIncident} />
        </div>
      </div>
    </div>
  );
};

export default App;
