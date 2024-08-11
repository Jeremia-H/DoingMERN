import { Container } from "react-bootstrap";
import ListDatasPageLoggedInView from "../components/ListDatasPageLoggedInView";
import ListDatasPageLoggedOutView from "../components/ListDatasPageLoggedOutView";
import styles from "../styles/listDataPage.module.css";
import { User } from "../models/user";


interface listDataPageProps {
    loggedInUser: User | null,
}

const  listDataPage = ({ loggedInUser }: listDataPageProps) => {
    return ( 
        <Container className={styles.listdatasPage}>
        <>
        {loggedInUser
        ? <ListDatasPageLoggedInView/>
        : <ListDatasPageLoggedOutView/>
        }
        </>
        
      </Container>
     );
}
 
export default  listDataPage;