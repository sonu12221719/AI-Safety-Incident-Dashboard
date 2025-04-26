import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ReportForm = ({ addIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof addIncident !== 'function') {
      toast.error('Error: addIncident is not a function');
      return;
    }

    if (title.trim() === '' || description.trim() === '' || severity.trim() === '') {
      toast.error('Please fill all fields properly.');
      return;
    }

    const newIncident = {
      id: Date.now(),
      title,
      description,
      severity,
    };

    addIncident(newIncident);
    toast.success('New incident submitted successfully!');

    setTitle('');
    setDescription('');
    setSeverity('');
  };

  return (
    <div className="report-form">
      <h2>Report New Incident</h2>

      <input
        className="input-field"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="input-field"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <select
        className="input-field"
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
      >
        <option value="" disabled>Select Severity</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button className="btn-submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReportForm;
