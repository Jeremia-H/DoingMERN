import { Button, Form, Modal } from "react-bootstrap";

interface AddNoteDIalogProps {
    onDismiss: () => void,
}

const AddSensorDataDialog = ({onDismiss}: AddNoteDIalogProps) => {
    return ( 
        <Modal show onHide={onDismiss}>        
            <Modal.Header closeButton>
            <Modal.Title>
                Add SensorData
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addSensorDataForm">
                    <Form.Group className="mb-3">
                        <Form.Label>SensorName</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Sensor?"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Grad Zahl?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder="Hier kann man was reinschreiben !"
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer> {/*The Footer is disconnected from the Body, so we have to connect it, the type="submit" is pretty much an onclick listener and sends the data we entered in the fields*/}
                <Button
                type="submit"
                form="addSensorDataForm"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 // modal show passes as true, closebutton creates the little X
export default AddSensorDataDialog;