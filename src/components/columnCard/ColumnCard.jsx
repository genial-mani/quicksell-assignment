import React from "react";
import './columnCard.css';
import dots from '../../assets/icons_FEtask/3 dot menu.svg';
import plus from '../../assets/icons_FEtask/add.svg';
import Card from "../card/Card";
import Backlog from '../../assets/icons_FEtask/Backlog.svg';
import Todo from '../../assets/icons_FEtask/To-do.svg';
import Inprogress from '../../assets/icons_FEtask/in-progress.svg';
import Done from '../../assets/icons_FEtask/Done.svg';
import Canceled from '../../assets/icons_FEtask/Cancelled.svg';
import nopriority from '../../assets/icons_FEtask/No-priority.svg';
import urgent  from '../../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import high from '../../assets/icons_FEtask/Img - High Priority.svg';
import medium from '../../assets/icons_FEtask/Img - Medium Priority.svg';
import low from '../../assets/icons_FEtask/Img - Low Priority.svg';
import profile from '../../assets/icons_FEtask/profile.svg'

const ColumnCard = ({group, title, tickets }) => {
  // Mapping status/title to corresponding icons
  const statusIcons = {
    Backlog: Backlog,
    Todo: Todo,
    'In progress': Inprogress,
    Done: Done,
    Canceled: Canceled,
    'No priority': nopriority,
    Urgent: urgent,
    High: high,
    Medium: medium,
    Low: low, 
  };

  // Get the icon based on the title
  const statusIcon = statusIcons[title] || profile;

  return (
    <div className="column-div">
      <div className="head">
        <div className="dots">
          <img src={statusIcon} alt={title} />
        </div>
        <div className="head-name">
          <p>{title}</p> <p>{tickets?.length}</p>
        </div>
        <div className="dots add">
          <img src={plus} alt="Add" />
        </div>
        <div className="dots menu">
          <img src={dots} alt="Menu" />
        </div>
      </div>
      <div className="cards">
        {tickets?.map((ticket, index) => (
          <Card key={index} group={group} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default ColumnCard;
