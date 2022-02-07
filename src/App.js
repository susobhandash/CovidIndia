// import logo from './logo.svg';
import './App.css';
import {
  useEffect,
  useState
} from 'react';

function App({ prop }) {
  const [dailyData, setDailyData] = useState([]);
  // useEffect(() => {
  //   fetch('https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json?timestamp=1644249600')
  //       .then(response => response.json())
  //       .then(data => console.log(data));
  // }, [prop, state]);

  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000);

    async function fetchDailyData() {
      const response = await fetch('https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json?timestamp=' + timestamp);
      const fetchedDailyData = await response.json(response);
      setDailyData(fetchedDailyData);
      console.log(fetchedDailyData);
    }
    fetchDailyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <GetGridHeader />
      <div className='grid'>
        {
          (dailyData && dailyData.vacc_st_data) ? (dailyData.vacc_st_data.map(data => 
            <div className='grid-row'>
              <span className='state-name'>{data.st_name}</span>
              <span>{data.dose1}</span>
              <span>{data.dose2}</span>
              <span>{data.dose1_15_18}</span>
              <span>{data.dose2_15_18}</span>
              <span>{data.total_doses}</span>
            </div>
          )) : (<div>No Data</div>)
        }
      </div>
    </div>
  );
}

function GetGridHeader() {
  return (
    <div className='grid grid-header'>
      <div className='grid-row'>
        <span className='state-name'>State Name</span>
        <span>Dose 1</span>
        <span>Dose 2</span>
        <span>Dose 1 (15-18)</span>
        <span>Dose 2 (15-18)</span>
        <span>Total Doses</span>
      </div>
    </div>
  );
}

export default App;