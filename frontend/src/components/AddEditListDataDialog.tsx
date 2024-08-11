import { Button, Form, Modal } from "react-bootstrap";
import { ListData } from "../models/listdata";
import { useForm } from "react-hook-form";
import { ListDataInput } from "../network/listdatas_api";
import * as ListDataApi from "../network/listdatas_api";
import TextInputField from "./form/TextInputField";

interface AddEditListDataDIalogProps {
  //creating this interface just makes it more cleaner
  ListdataToEdit?: ListData;
  onDismiss: () => void;
  onListDataSaved: (Listdata: ListData) => void;
}

const AddEditListDataDialog = ({
  ListdataToEdit,
  onDismiss,
  onListDataSaved,
}: AddEditListDataDIalogProps) => {
  //destructing once again so we can use ondismiss directly in the code

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListDataInput>({
    defaultValues: {                //show these default values if the List is being edited and already has some
      titel: ListdataToEdit?.titel || "",
      text: ListdataToEdit?.text || "",
    },
  });

  async function onSubmit(input: ListDataInput) {
    try {
      let ListdataResponse: ListData;
      if (ListdataToEdit) {
        ListdataResponse = await ListDataApi.updateListData(
          ListdataToEdit._id,
          input
        );
      } else {
        ListdataResponse = await ListDataApi.createListData(input);
      }

      onListDataSaved(ListdataResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {ListdataToEdit ? "Edit Listdata" : "Add Listdata"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditListDataForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField 
          name="titel"
          label="titel"
          type="text"
          placeholder="titel"
          register={register}
          registerOptions={{ required: "Required"}}
          error={errors.titel}
          />
          <TextInputField
          name="text"
          label="text Zahl?"
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
          form="addEditListDataForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
// modal show passes as true, closebutton creates the little X
export default AddEditListDataDialog;
