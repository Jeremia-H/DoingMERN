import { Button, Form, Modal } from "react-bootstrap";
import { SensorData } from "../models/sensordata";
import { useForm } from "react-hook-form";
import { SensorDataInput } from "../network/sensordatas_api";
import * as SensorDataApi from "../network/sensordatas_api";

interface AddSensorDataDIalogProps {      //creating this interface just makes it more cleaner
    onDismiss: () => void,
    onSensorDataSaved:(sensordata: SensorData) => void,
}

const AddSensorDataDialog = ({onDismiss, onSensorDataSaved}: AddSensorDataDIalogProps) => {      //destructing once again so we can use ondismiss directly in the code


    const { register, handleSubmit, formState: {errors, isSubmitting } } = useForm<SensorDataInput>();

    async function onSubmit(input: SensorDataInput) {
        try {
            const sensordataResponse = await SensorDataApi.createSensorData(input);
            onSensorDataSaved(sensordataResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }


    return ( 
        <Modal show onHide={onDismiss}>        
            <Modal.Header closeButton>
            <Modal.Title>
                Add SensorData
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addSensorDataForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>SensorName</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Sensor?"
                        isInvalid={!!errors.sensorname}
                        {...register("sensorname", { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.sensorname?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Grad Zahl?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder="Hier kann man was reinschreiben !"
                            {...register("grad")}
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer> {/*The Footer is disconnected from the Body, so we have to connect it, the type="submit" is pretty much an onclick listener and sends the data we entered in the fields*/}
                <Button
                type="submit"
                form="addSensorDataForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 // modal show passes as true, closebutton creates the little X
export default AddSensorDataDialog;