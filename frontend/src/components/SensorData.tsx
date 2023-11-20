import styles from "../styles/SensorData.module.css"
import { Card} from "react-bootstrap";
import { SensorData as SensorDataModel } from "../models/sensordata";
import { formatDate } from "../utils/formatDate";

interface SensorDataProps {                                             // creating an interface with our model that we created, so we can use the data from the model in the card
    sensordataInsideProps: SensorDataModel,
    className?: string,
}

const SensorData = ({ sensordataInsideProps, className} : SensorDataProps) => {               //Destructoring so we can just use the sensordata direcly out of the Props instead of always having to write SensorDataProps.sensordata for example
    const {
        sensorname,
        grad,
        createdAt,
        updateAt,
    } = sensordataInsideProps                                                       //Destructoring so we can just use the sensordata direcly out of the Props instead of always having to write sensordata.sensorname for example

    let createdUpdatedText: string;
    if (updateAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updateAt);
    } else {
        createdUpdatedText = "Updated: " + formatDate(createdAt);
    }
    return (
        <Card className={`${styles.sensordataCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {sensorname}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {grad}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                    {createdUpdatedText}
                </Card.Footer>
        </Card>
    )
}

export default SensorData;