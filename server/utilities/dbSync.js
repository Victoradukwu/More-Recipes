import 'chai';
import 'mocha';
import models from '../models';

const dbSync = {
  
  clearDb() {
    before((done) => {
      models.sequelize.sync({ force: true }).then(() => {
        done(null);
      }).catch((error) => {
        done(error);
      });
    });
  }
};

export default dbSync;
