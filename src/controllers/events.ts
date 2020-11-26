import * as express from 'express';
import * as mysql from 'mysql';
import console = require('console');
import * as moment from 'moment';

export const eventsController = express.Router();
export const timelineController = express.Router();

const connection = mysql.createConnection({
  host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'test-read',
  password: 'xnxPp6QfZbCYkY8',
  database: 'birdietest',
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log('*************************************************');
  console.log('**                DB connected                 **');
  console.log('*************************************************');
});

type Patient = {
  care_recipient_id: string;
  payload: string;
};

type observation = {
  id: string;
  visit_id: string;
  timestamp: string;
  event_type?: string;
  caregiver_id?: string;
  task_instance_id?: string;
  care_recipient_id?: string;
  task_definition_description?: string;
  task_schedule_id?: string;
  task_schedule_note?: string;
  task_definition_id?: string;
};

eventsController.get('/recevingcare', (_, res) => {
  connection.query(
    'SELECT distinct care_recipient_id FROM events',
    async (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        const receving_care_list = await results.map(
          (patient: Patient) => patient.care_recipient_id
        );
        return res.status(200).send(receving_care_list);
      }
    }
  );
});

timelineController.get('/recevingcare/:pateintId/:dates', (req, res) => {
  connection.query(
    `SELECT payload FROM events WHERE care_recipient_id = '${req.params.pateintId}' AND (timestamp between '${req.params.dates}T00:00:00.000Z' and '${req.params.dates}T23:59:59.000Z') ORDER BY timestamp;`,
    async (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        const parsedData = await results.map((each: Patient) =>
          JSON.parse(each.payload)
        );
        // Format Date
        const timelineData: [] = await parsedData.map((item: observation) => {
          const obj: observation = Object.assign({}, item);
          obj.timestamp = moment.utc(new Date(obj.timestamp)).format('HH:mm');
          return obj;
        });

        return res.status(200).send(timelineData);
      }
    }
  );
});
