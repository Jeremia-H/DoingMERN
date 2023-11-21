import styles from "../styles/SensorData.module.css";
import { Card } from "react-bootstrap";
import { SensorData as SensorDataModel } from "../models/sensordata";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface SensorDataProps {
  // creating an interface with our model that we created, so we can use the data from the model in the card
  sensordataInsideProps: SensorDataModel;
  className?: string;
  onDeleteSensorDataClicked: (SensorData: SensorDataModel) => void;
  onSensorDataClicked: (SensorData: SensorDataModel) => void;
}

const SensorData = ({
  sensordataInsideProps,
  className,
  onDeleteSensorDataClicked,
  onSensorDataClicked,
}: SensorDataProps) => {
  //Destructoring so we can just use the Props directly instead of always having to write SensorDataProps.sensordata for example
  const { sensorname, grad, createdAt, updateAt } = sensordataInsideProps; // Further Destructoring of the sensordata

  let createdUpdatedText: string; // we need this for updating notes
  if (updateAt > createdAt) { //just logic if we display the update date or the created date
    createdUpdatedText = "Updated: " + formatDate(updateAt);
  } else {
    createdUpdatedText = "Updated: " + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.sensordataCard} ${className}`}
      onClick={() => onSensorDataClicked(sensordataInsideProps)} //this callsback to app.tsx
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title>
          {sensorname}
          <MdDelete //this is an automatic trashbin icon from react-icons/md
            className="text-muted ms-auto"
            onClick={(e) => { //by defining e we can use it
              onDeleteSensorDataClicked(sensordataInsideProps); //this callsback to app.tsx
              e.stopPropagation(); //this stops the click from going "through" the note
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{grad}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default SensorData;
