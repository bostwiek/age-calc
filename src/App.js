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

returns exact number of days, weeks, months, years, and fun facts
fun facts = [who was born that day, what songs were released, what famous news happened within certain time]

input needs = [birth date, switch for dd/mm/yyyy and mm/dd/yyyy determined from IP address]

You were born [days] ago.

[weeks] [months] [years]

start on 06 / 15 / 1990

language support

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
    years: 0
  });
  
  const setAge = () => {

    // setCurrentDate(new Date());

    let seconds = currentDate.getSeconds() - date.getSeconds(),
        minutes = currentDate.getMinutes() - date.getMinutes(),
        hours = currentDate.getHours() - date.getHours(),
        days = currentDate.getDate() - date.getDate(),
        months = currentDate.getMonth() - date.getMonth(),
        years = currentDate.getFullYear() - date.getFullYear();

    if(days < 0) {
      let monthTotal = 0;
      // add # of days in month of birthday to negative number to find rollover value
      // mess below determines number of days in current month
      switch(date.getMonth()) {
        case "1": // feb
          monthTotal = date.getFullYear() % 4 == 0 ? 29 : 28;
          break;
        case "0": // jan, mar, may, jul, aug, oct, dec
        case "2":
        case "4":
        case "6":
        case "7":
        case "9":
        case "11":
          monthTotal = 31;
          break;
        case "3": // apr, jun, sept, nov
        case "5":
        case "8":
        case "10":
          monthTotal = 30;
          break;
        default: // shouldn't ever hit default...
          monthTotal = 30
          break;
      }
      days += monthTotal;
      months--;
    }

    if(months < 0) {
      months += 12;
      years--;
    }

    setAgeObj({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      months: months,
      years: years
    });
  }

  // setTimeout(setAge, 1000);
  
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

          from {date.toUTCString()} to {currentDate.toUTCString()}
          <br />
          You are {ageObj.years} years,
          <br />
          {ageObj.months} months,
          <br />
          {ageObj.days} days,
          <br />
          {ageObj.hours} hours ,
          <br />
          {ageObj.minutes} minutes,
          <br />
          and {ageObj.seconds} seconds old
          
        </p>
        <p>
          
        </p>
      </Container>
    </Container>
  );
}


export default App;
