import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditListDataDialog from "./AddEditListDataDialog";
import ListDataComponent from "./ListData";
import { ListData as ListDataModel } from "../models/listdata"; // Alias to avoid confusion
import * as listDatasApi from "../network/listdatas_api";
import styles from "../styles/listDataPage.module.css";
import stylesUtils from "../styles/utils.module.css";

const ListDatasPageLoggedInView = () => {
  const [listDatas, setListDatas] = useState<ListDataModel[]>([]); // Initialize with an empty array and specify the type
  const [listDatasLoading, setListDatasLoading] = useState(true); // For progress bar of loading data
  const [showListDatasLoadingError, setShowListDatasLoadingError] = useState(false); // For progress bar of loading data

  const [showAddListDataDialog, setShowAddListDataDialog] = useState(false);
  const [listDataToEdit, setListDataToEdit] = useState<ListDataModel | null>(null); // Type is either the model or null, initialized with null

  useEffect(() => {
    // With useEffect we can setup a function that should run outside of the site rendering, so it does not run every time we render
    async function loadListDatas() {
      // We need to use an async function inside of the useEffect function because that's just how it works
      try {
        setShowListDatasLoadingError(false);
        setListDatasLoading(true);
        const listDatas = await listDatasApi.fetchListDatas();
        setListDatas(listDatas);
      } catch (error) {
        console.error(error);
        setShowListDatasLoadingError(true);
      } finally {
        setListDatasLoading(false);
      }
    }
    loadListDatas(); // Don't forget to call the function because we had to put it inside of another function
  }, []); // We pass this array because this makes it so the useEffect only runs once on site load
  
  async function deleteListData(listData: ListDataModel) {
    try {
      await listDatasApi.deleteListData(listData._id); // Call the API function to delete on backend
      setListDatas(
        listDatas.filter(
          (existingListData) => existingListData._id !== listData._id // This updates our frontend
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  
  const listDataGrid = (
<Row xs={1} md={2} xl={3} className={`g-4 ${styles.listDataGrid}`}>
  {/* This changes the layout for screen-size and also applies the bootstrap g-4 styling */}
  {listDatas.map(
    (
      listData // We map the listData we got in our function to the Component we created (ListData.tsx)
    ) => (
      <Col key={listData._id}>
        <ListDataComponent
          listdataInsideProps={listData}
          className={styles.listData}
          onlistDataClicked={setListDataToEdit} // Is set when the callback from ListData.tsx happens
          onDeletelistDataClicked={deleteListData}
        />
      </Col> // We also create a key, this should be unique, so we use the unique ID MongoDB gives it
    )
  )}
</Row>
  );

return (
  <>
    <Button
      className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.FlexCenter}`}
      onClick={() => setShowAddListDataDialog(true)}
    >
      <FaPlus />
      Add new list data
    </Button>
    {listDatasLoading && <Spinner variant="primary" />}
    {showListDatasLoadingError && (
      <p>Something went wrong. Please refresh.</p>
    )}
    {!listDatasLoading && !showListDatasLoadingError && (
      <>
        {listDatas.length > 0 ? (
          listDataGrid
        ) : (
          <p>There is no list data.</p>
        )}
      </>
    )}
    {showAddListDataDialog && (
      <AddEditListDataDialog
        onDismiss={() => setShowAddListDataDialog(false)}
        onListDataSaved={(newListData) => {
          setListDatas([...listDatas, newListData]);
          setShowAddListDataDialog(false);
        }}
      />
    )}
    {listDataToEdit && (
      <AddEditListDataDialog
      ListdataToEdit={listDataToEdit}
        onDismiss={() => setListDataToEdit(null)}
        onListDataSaved={(updatedListData) => {
          setListDatas(
            listDatas.map((existingListData) =>
              existingListData._id === updatedListData._id
                ? updatedListData
                : existingListData
            )
          );
          setListDataToEdit(null);
        }}
      />
    )}
  </>
);
};

export default ListDatasPageLoggedInView;
