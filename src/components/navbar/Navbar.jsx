import React, { useState } from "react";
import "./navbar.css";
import filter from "../../assets/icons_FEtask/Display.svg";
import downArrow from "../../assets/icons_FEtask/down.svg";

const Navbar = ({
  selectedGrouping,
  setSelectedGrouping,
  selectedOrdering,
  setSelectedOrdering,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [groupingOpen, setGroupingOpen] = useState(false);
  const [orderingOpen, setOrderingOpen] = useState(false);

  // Options for Grouping and Ordering
  const groupingOptions = ["Status", "User", "Priority"];
  const orderingOptions = ["Priority", "Title"];

  // Toggle dropdown visibility
  const toggleFilter = () => setFilterOpen(!filterOpen);
  const toggleGrouping = () => setGroupingOpen(!groupingOpen);
  const toggleOrdering = () => setOrderingOpen(!orderingOpen);

  // Handle selection
  const handleGroupingSelect = (option) => {
    setSelectedGrouping(option);
    setGroupingOpen(false);
  };

  const handleOrderingSelect = (option) => {
    setSelectedOrdering(option);
    setOrderingOpen(false);
  };

  return (
    <header className="navbar">
      <div className="filter-div">
        <div className="filter" onClick={toggleFilter}>
          <div className="filter-svg">
            <img src={filter} alt="filter icon" />
          </div>
          <div className="display-name">Display</div>
          <div className="filter-svg">
            <img src={downArrow} alt="filter icon" />
          </div>
        </div>

        {filterOpen && (
          <div className="filter-options">
            <div className="cat">
              {/* Grouping */}
              <p>Grouping</p>
              <div className="cat-select" onClick={toggleGrouping}>
                <p>{selectedGrouping}</p>
                <img src={downArrow} alt="down arrow" className="filter-svg" />
              </div>
              {groupingOpen && (
                <div className="dropdown1">
                  {groupingOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${selectedGrouping === option ? "selected" : ""}`}
                      onClick={() => handleGroupingSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cat">
              {/* Ordering */}
              <p>Ordering</p>
              <div className="cat-select" onClick={toggleOrdering}>
                <p>{selectedOrdering}</p>
                <img src={downArrow} alt="down arrow" className="filter-svg" />
              </div>
              {orderingOpen && (
                <div className="dropdown2">
                  {orderingOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${selectedOrdering === option ? "selected" : ""}`}
                      onClick={() => handleOrderingSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
