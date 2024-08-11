import styles from "../styles/listData.module.css";
import { Card } from "react-bootstrap";
import { ListData as listDataModel } from "../models/listdata";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface listDataProps {
  // creating an interface with our model that we created, so we can use the data from the model in the card
  listdataInsideProps: listDataModel;
  className?: string;
  onDeletelistDataClicked: (listData: listDataModel) => void;
  onlistDataClicked: (listData: listDataModel) => void;
}

const listData = ({
  listdataInsideProps,
  className,
  onDeletelistDataClicked,
  onlistDataClicked,
}: listDataProps) => {
  //Destructoring so we can just use the Props directly instead of always having to write listDataProps.listdata for example
  const { titel, text, createdAt, updateAt } = listdataInsideProps; // Further Destructoring of the listdata

  let createdUpdatedText: string; // we need this for updating notes
  if (updateAt > createdAt) { //just logic if we display the update date or the created date
    createdUpdatedText = "Updated: " + formatDate(updateAt);
  } else {
    createdUpdatedText = "Updated: " + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.listdataCard} ${className}`}
      onClick={() => onlistDataClicked(listdataInsideProps)} //this callsback to app.tsx
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title>
          {titel}
          <MdDelete //this is an automatic trashbin icon from react-icons/md
            className="text-muted ms-auto"
            onClick={(e) => { //by defining e we can use it
              onDeletelistDataClicked(listdataInsideProps); //this callsback to app.tsx
              e.stopPropagation(); //this stops the click from going "through" the note
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default listData;
