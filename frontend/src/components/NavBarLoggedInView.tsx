import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as listDataApi from "../network/listdatas_api";


interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {

    async function logout() {       //this the function we call when we click the button
        try {
            await listDataApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log out</Button>
        </>
     );
}
 
export default NavBarLoggedInView;