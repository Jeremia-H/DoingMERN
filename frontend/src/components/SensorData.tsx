import styles from "../styles/SensorData.module.css"
import { Card} from "react-bootstrap";
import { SensorData as SensorDataModel } from "../models/sensordata";

interface SensorDataProps {                                             // creating an interface with our model that we created, so we can use the data from the model in the card
    sensordataInsideProps: SensorDataModel,
}

const SensorData = ({ sensordataInsideProps} : SensorDataProps) => {               //Destructoring so we can just use the sensordata direcly out of the Props instead of always having to write SensorDataProps.sensordata for example
    const {
        sensorname,
        grad,
        createdAt,
        updateAt,
    } = sensordataInsideProps                                                       //Destructoring so we can just use the sensordata direcly out of the Props instead of always having to write sensordata.sensorname for example
    return (
        <Card className={styles.sensordataCard}>
            <Card.Body>
                <Card.Title>
                    {sensorname}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {grad}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SensorData;