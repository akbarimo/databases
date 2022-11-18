const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'momo',
    password: 'BosphorusBaklava69',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();

    dbConnection.query(`delete from ${'Messages'} where message_id > 0;`, done);
    dbConnection.query(`delete from ${'Users'} where user_id > 0;`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    axios.post(`${API_URL}/users`, { username, message })
      .then(() => {
        return axios.post(`${API_URL}/messages`, { username, message });
      })
      .then(() => {
        axios.get(`${API_URL}/messages`, {username, message})
          .then((response) => {
            const messageLog = response.data;
            expect(messageLog[0].message).toEqual(message);
            done();
          });
      });
  });

  it('Should insert all messages posted to the DB', (done) => {
    const username = 'Willy Shakes';
    const message = 'Out, out, brief candle...';
    axios.post(`${API_URL}/users`, { username, message })
      .then(() => {
        return axios.post(`${API_URL}/messages`, { username, message });
      })
      .then(() => {
        axios.get(`${API_URL}/messages`, {username, message})
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            const queryString = 'SELECT * FROM Messages';
            const queryArgs = [];

            dbConnection.query(queryString, queryArgs, (err, results) => {
              if (err) {
                throw new Error(err);
              }
              expect(results.length).toEqual(2);
              expect(results[1].message).toEqual(message);
              done();
            });
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

