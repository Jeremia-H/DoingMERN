import { Container } from "react-bootstrap";
import SensorDatasPageLoggedInView from "../components/SensorDatasPageLoggedInView";
import SensorDatasPageLoggedOutView from "../components/SensorDatasPageLoggedOutView";
import styles from "../styles/SensorDataPage.module.css";
import { User } from "../models/user";


interface SensorDataPageProps {
    loggedInUser: User | null,
}

const  SensorDataPage = ({ loggedInUser }: SensorDataPageProps) => {
    return ( 
        <Container className={styles.sensordatasPage}>
        <>
        {loggedInUser
        ? <SensorDatasPageLoggedInView/>
        : <SensorDatasPageLoggedOutView/>
        }
        </>
        
      </Container>
     );
}
 
export default  SensorDataPage;