import React, { useEffect, useState } from 'react';
import { SensorData as SensorDataModel} from './models/sensordata';                                    //alias so it does nto get so confusing
import  SensorDataComponent from './components/SensorData';

function App() {
  const[sensordata, setSensorData] = useState<SensorDataModel[]>([]);                                  //We make an array for the useState function and thenn tell it that it should be an empty array and also that sensordata is supposed to be of the datatype of our model as an array

  useEffect(() => {                                                                                    // with use effect we can setup a function that should run outside of the site rendering, so it does not run every time we render
    async function loadSensordatas() {                                                                 //we need to use an async function inside of the useEffect function because thats just how it works
    try {
      const response = await fetch("http://localhost:5000/api/sensordata", { method: "GET"});          //this is the link we setup in the backend to get all of our sensordata, so we use a get request
      const sensordatas = await response.json();                                                       // we then parse the response as json into the sensordatas const and give that to the setSensorData function we created outside of this
      setSensorData(sensordatas);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    }
    loadSensordatas();                                                                                 // dont forget to call the function because we had to put it inside of another function
  }, []);                                                                                              //we pass this array because this makes it so the useEffect only runs once

  return (
    <div>
      {sensordata.map(sensordata => (                                                                  //we map the sensordata we got in our function up here to the Component we created (SensorData.tsx)
        <SensorDataComponent sensordataInsideProps={sensordata} key={sensordata._id}/>                 // since we made an interface in the component and told that it should use the model as base, we can now just pass the sensordata we got here ( which is the same model) 1 to 1 over.
                                                                                                       //and then we also create a key, this should be unique, so we just use the unique ID mongodb gives it
      ))}
    </div>
  );
}

export default App;
