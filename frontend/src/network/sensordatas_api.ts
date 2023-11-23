import { SensorData } from "../models/sensordata";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users", { method: "GET"})
  return response.json();
  
}

export interface SignUpCredentials {
  username: string,
  email: string,
  password: string,
}

export async function signUp(credentials: SignUpCredentials ): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(credentials),
  })
  return response.json();
}

export interface LoginCredentials {
  username: string,
  password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/logout",
  {
    method: "POST",
  });
  return response.json();
}


export async function fetchSensorDatas(): Promise<SensorData[]> {
  const response = await fetchData("http://localhost:5000/api/sensordata", {
    method: "GET",
  }); //this is the link we setup in the backend to get all of our sensordata, so we use a get request
  return response.json(); // we then parse the response as json into the sensordatas const and give that to the setSensorData function we created outside of this
}
export interface SensorDataInput {
  sensorname: string;
  grad: string;
}

export async function createSensorData(
  sensordata: SensorDataInput
): Promise<SensorData> {
  const response = await fetchData("http://localhost:5000/api/sensordata", {
    method: "POST", //because we want to send data
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(sensordata), //we can only send strings back and forth between server and frontend
  });

  return response.json();
}
export async function updateSensorData(
  sensordataID: string,
  sensordata: SensorDataInput
): Promise<SensorData> {
  const response = await fetchData(
    "http://localhost:5000/api/sensordata/" + sensordataID,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", //this tells our backend we are sending a json
      },
      body: JSON.stringify(sensordata), //we can only send strings back and forth between server and frontend
    }
  );
  return response.json();
}

export async function deleteSensorData(sensordataID: string) {
  await fetchData("http://localhost:5000/api/sensordata/" + sensordataID, {
    method: "DELETE",
  });
}
