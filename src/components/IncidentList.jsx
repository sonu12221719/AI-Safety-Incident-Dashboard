import React from 'react';

const IncidentList = ({ incidents, expandedIds, toggleExpand }) => {
  return (
    <div className="incident-list">
      {(!incidents || incidents.length === 0) ? (
        <p>No incidents to display.</p>
      ) : (
        incidents.map((incident) => (
          <div className={`incident-card ${incident.severity.toLowerCase()}`} key={incident.id}>
            <h3>{incident.title}</h3>
            <p className="date"><span>Date: </span>{incident.date}</p>
            <div className="severity-div">{incident.severity}</div>

            <p className="description">
              {expandedIds[incident.id]
                ? incident.description
                : `${incident.description.slice(0, 100)}...`}
              {" "}
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpand(incident.id);
                }}
                className="view-link"
              >
                {expandedIds[incident.id] ? 'Hide Details' : 'View Details'}
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default IncidentList;
