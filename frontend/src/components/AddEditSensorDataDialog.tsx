import { Button, Form, Modal } from "react-bootstrap";
import { SensorData } from "../models/sensordata";
import { useForm } from "react-hook-form";
import { SensorDataInput } from "../network/sensordatas_api";
import * as SensorDataApi from "../network/sensordatas_api";

interface AddEditSensorDataDIalogProps {
  //creating this interface just makes it more cleaner
  sensordataToEdit?: SensorData;
  onDismiss: () => void;
  onSensorDataSaved: (sensordata: SensorData) => void;
}

const AddEditSensorDataDialog = ({
  sensordataToEdit,
  onDismiss,
  onSensorDataSaved,
}: AddEditSensorDataDIalogProps) => {
  //destructing once again so we can use ondismiss directly in the code

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SensorDataInput>({
    defaultValues: {                //show these default values if the sensor is being edited and already has some
      sensorname: sensordataToEdit?.sensorname || "",
      grad: sensordataToEdit?.grad || "",
    },
  });

  async function onSubmit(input: SensorDataInput) {
    try {
      let sensordataResponse: SensorData;
      if (sensordataToEdit) {
        sensordataResponse = await SensorDataApi.updateSensorData(
          sensordataToEdit._id,
          input
        );
      } else {
        sensordataResponse = await SensorDataApi.createSensorData(input);
      }

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
          {sensordataToEdit ? "Edit Sensordata" : "Add Sensordata"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditSensorDataForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>SensorName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sensor?"
              isInvalid={!!errors.sensorname}
              {...register("sensorname", { required: "Required" })}
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

      <Modal.Footer>
        {" "}
        {/*The Footer is disconnected from the Body, so we have to connect it, the type="submit" is pretty much an onclick listener and sends the data we entered in the fields*/}
        <Button
          type="submit"
          form="addEditSensorDataForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
// modal show passes as true, closebutton creates the little X
export default AddEditSensorDataDialog;
