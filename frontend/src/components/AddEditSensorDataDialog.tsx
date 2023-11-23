import { Button, Form, Modal } from "react-bootstrap";
import { SensorData } from "../models/sensordata";
import { useForm } from "react-hook-form";
import { SensorDataInput } from "../network/sensordatas_api";
import * as SensorDataApi from "../network/sensordatas_api";
import TextInputField from "./form/TextInputField";

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
          <TextInputField 
          name="title"
          label="Title"
          type="text"
          placeholder="Title"
          register={register}
          registerOptions={{ required: "Required"}}
          error={errors.sensorname}
          />
          <TextInputField
          name="grad"
          label="Grad Zahl?"
          as="textarea"
          rows={5}
          placeholder="Text"
          register={register}
          />
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
