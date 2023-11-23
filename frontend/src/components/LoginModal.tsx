import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/sensordatas_api";
import * as SensorDataApi from "../network/sensordatas_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";


interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {
    const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm<LoginCredentials>();

    async function onSubmit(credentials:LoginCredentials) { //this function gets handled by handleSubmit
        try {
            const user = await SensorDataApi.login(credentials)
            onLoginSuccessful(user);
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }
    return( // on this is only the elements, that dont do anything on their own
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                    />
                    <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                    />
                    <Button
                    type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Log In
          </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;