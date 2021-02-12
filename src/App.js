import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import Datetime from 'react-datetime';
import TimezonePicker from 'react-bootstrap-timezone-picker';

/*

Age calculator

start on 06 / 15 / 1990

language support

Currently date difference is not calculating properly, likely need to grab # of (seconds/minutes) between dates and calculate manually

*/


function App() {
  const [date, setDate] = useState(new Date(1988, 6, 30));
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [ageObj, setAgeObj] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    months: 0,
		years: 0,
		totalSeconds: 0,
    totalMinutes: 0,
    totalHours: 0,
    totalDays: 0,
    totalMonths: 0,
		totalYears: 0,
  });
  
  const setAge = () => {
		let dateDiff = currentDate.getTime() - date.getTime(),
				totalSeconds = dateDiff / 1000,
				totalMinutes = totalSeconds / 60,
				totalHours = totalMinutes / 60,
				totalDays = totalHours / 24,
				totalMonths = totalDays / 30.41666666, // this is not 100% correct
				totalYears = totalMonths / 12,
				years = Math.floor(totalYears),
				months = Math.floor(totalMonths) % 12,
				days = Math.floor(totalDays) % 365, // this is rough since months !=
				hours = Math.floor(totalHours) % 24,
				minutes = Math.floor(totalMinutes) % 60,
				seconds = Math.floor(totalSeconds) % 60;

    setAgeObj({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      months: months,
      years: years,
			totalSeconds: totalSeconds,
			totalMinutes: totalMinutes,
			totalHours: totalHours,
			totalDays: totalDays,
			totalMonths: totalMonths,
			totalYears: totalYears
    });
  }
  
  return (
    <Container fluid className="d-flex justify-content-md-center pt-5 pb-5 flex-column">
      <Container className="">
        
				<h1>Enter your birth date:</h1>
        <Form.Group style={{ maxWidth: '300px' }}>
          <Datetime
            initialValue={date}
            input={false}
            onChange={ selectedDate =>{ setDate(selectedDate['_d']) }}
            placeholder="Birth Date"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time Zone of birth location:</Form.Label>
          <br />
          <TimezonePicker
            absolute = {false}
            defaultValue = "(GMT-07:00) Mountain Time"
           	placeholder = "Select timezone..."
            onChange = {x => console.log(x)}
          />
        </Form.Group>
        <Button onClick={setAge} className="mt-3 mb-3">Calculate</Button>
      </Container>
      <Container>
        <p>
          From {date.toUTCString()} to {currentDate.toUTCString()}
          <br />
					That's a total of...<br />
					{Math.floor(ageObj.years)} years, {Math.floor(ageObj.days)} days, {Math.floor(ageObj.hours)} hours, {Math.floor(ageObj.minutes)} minutes, and {Math.floor(ageObj.seconds)} seconds old.
				</p>
				<p>
					Individually, that's...
					<ul>
						<li>{Math.floor(ageObj.totalDays).toLocaleString()} days</li>						
						<li>{Math.floor(ageObj.totalHours).toLocaleString()} hours</li>
						<li>{Math.floor(ageObj.totalMinutes).toLocaleString()} minutes</li>
						<li>{Math.floor(ageObj.totalSeconds).toLocaleString()} seconds</li>
					</ul>
				</p>
        
      </Container>
    </Container>
  );
}


export default App;
