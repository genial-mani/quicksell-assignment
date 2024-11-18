import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ColumnCard from './components/columnCard/ColumnCard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Using Local Storage for Grouping and Ordering states
  const [selectedGrouping, setSelectedGrouping] = useState(() => {
    return localStorage.getItem('selectedGrouping') || 'Status';
  });
  const [selectedOrdering, setSelectedOrdering] = useState(() => {
    return localStorage.getItem('selectedOrdering') || 'Priority';
  });

  const status = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
  const priority = { 0: 'No priority',  4: 'Urgent',3: 'High', 2: 'Medium', 1: 'Low' };

  // Fetching tickets and users data
  useEffect(() => {
    const fetchDetails = async () => {
      const url = process.env.REACT_APP_API_URL;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          setTickets(data?.tickets || []);
          setUsers(data?.users || []);
          console.log('Fetched Data:', data?.tickets, data?.users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDetails();
  }, []);

  // Update local storage whenever grouping or ordering changes
  useEffect(() => {
    localStorage.setItem('selectedGrouping', selectedGrouping);
  }, [selectedGrouping]);

  useEffect(() => {
    localStorage.setItem('selectedOrdering', selectedOrdering);
  }, [selectedOrdering]);

 // Group and Order tickets based on selected grouping and ordering
const getGroupedTickets = () => {
  const orderTickets = (tickets) => {
    if (selectedOrdering === 'Priority') {
      // Sort by priority in descending order (low -> urgent)
      return tickets.sort((a, b) => a.priority - b.priority);
    } else if (selectedOrdering === 'Title') {
      // Sort alphabetically by ticket title
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  if (selectedGrouping === 'User') {
    const groupedByUser = users.map((user) => ({
      title: user.name,
      tickets: orderTickets(tickets.filter((ticket) => ticket.userId === user.id)), // filtering the tickets based on the userId
    }));
    return groupedByUser;
  } else if (selectedGrouping === 'Status') {
    const groupedByStatus = status.map((status) => ({
      title: status,
      tickets: orderTickets(tickets.filter((ticket) => ticket.status === status)),
    }));
    return groupedByStatus;
  } else if (selectedGrouping === 'Priority') {
    const groupedByPriority = Object.keys(priority).map((priorityKey) => ({
      title: priority[priorityKey],
      tickets: orderTickets(
        tickets.filter((ticket) => ticket.priority === parseInt(priorityKey))
      ),
    }));
    return groupedByPriority;
  }
  return [];
};


  const groupedTickets = getGroupedTickets();

  return (
    <div className="App">
      <Navbar
        selectedGrouping={selectedGrouping}
        setSelectedGrouping={setSelectedGrouping}
        selectedOrdering={selectedOrdering}
        setSelectedOrdering={setSelectedOrdering}
      />
      <div className="panel">
        {groupedTickets.map((group, index) => (
          <ColumnCard key={index} group={selectedGrouping} title={group.title} tickets={group.tickets} />
        ))}
      </div>
    </div>
  );
}

export default App;
