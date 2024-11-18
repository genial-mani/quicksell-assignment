import React from "react";
import "./card.css";
import profile from '../../assets/icons_FEtask/profile.svg'
import nopriority from '../../assets/icons_FEtask/No-priority.svg';
import urgent  from '../../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import high from '../../assets/icons_FEtask/Img - High Priority.svg';
import medium from '../../assets/icons_FEtask/Img - Medium Priority.svg';
import low from '../../assets/icons_FEtask/Img - Low Priority.svg';

const Card = ({group, ticket}) => {

  // icon management technique
  const statusIcons = {
    0: nopriority,
    4: urgent,
    3: high,
    2: medium,
    1: low, 
  };
  const statusIcon = statusIcons[ticket?.priority];


  return (
    <div className="card">
      <div className="card-inside">
        <p>{ticket?.id}</p>
        <h2>{ticket?.title?.slice(0,40) + '...'}</h2> 
        <div className="card-in-last">
          <div className="status"><img src={statusIcon} alt="" /></div>
          <div className="feature"><div className="dummy-icon"></div><p>{ticket?.tag[0]}</p></div>
        </div>
      </div>
      {group !== 'User' && <div className="profile"><img src={profile} alt="" /></div>}
    </div>
  );
};

export default Card;
