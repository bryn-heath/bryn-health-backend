import app from '../src/application'
import * as request from 'supertest';
import "jest";

// I'm strictly testing correct paths and expected outputs

const carees: string[] = [
  "df50cac5-293c-490d-a06c-ee26796f850d",
  "e3e2bff8-d318-4760-beea-841a75f00227",
  "ad3512a6-91b1-4d7d-a005-6f8764dd0111"
]

 describe('Test the first section of the API - /receving_care for UI to select and equal the 3 patients', () => {
  it('API Fetch 3 receving care ids', async () => {
    await request(app)
      .get('/recevingcare')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toHaveLength(3)
        expect(res.body).toEqual(carees)
      });
  })
});

describe('Fecth a timeline of data', () => {
  it('takes url', async () => {
    await request(app)
      .get('/recevingcare/df50cac5-293c-490d-a06c-ee26796f850d/2019-05-02')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toHaveLength(92)
      });
  })
});