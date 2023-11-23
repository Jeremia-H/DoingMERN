import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import styles from "./styles/SensorDataPage.module.css";
import { User } from "./models/user";
import * as SensorDataApi from "./network/sensordatas_api";
import SensorDatasPageLoggedInView from "./components/SensorDatasPageLoggedInView";
import SensorDatasPageLoggedOutView from "./components/SensorDatasPageLoggedOutView";


function App() {

  const[loggedInUser, setLoggedInUser] = useState<User|null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginpModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await SensorDataApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccesfull={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />
      <Container className={styles.sensordatasPage}>
        <>
        {loggedInUser
        ? <SensorDatasPageLoggedInView/>
        : <SensorDatasPageLoggedOutView/>
        }
        </>
        
      </Container>
      {showSignUpModal && 
          <SignUpModal onDismiss={() => setShowSignUpModal(false)} 
          onSignUpSuccessful={(user)  => {
          setLoggedInUser(user);
          setShowSignUpModal(false);
        }} />
        }
        {showLoginpModal && 
          <LoginModal onDismiss={() => setShowLoginModal(false)} 
          onLoginSuccessful={(user)  => {
          setLoggedInUser(user);
          setShowLoginModal(false);
        }}
        />
      }
    </div>
  );
}

export default App;
