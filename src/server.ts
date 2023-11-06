import { App } from './app';
import { Database } from './database/database';
import dotenv from 'dotenv';

const startServer = async () => {
    dotenv.config();
    await Database.initialiseConnection();

    const app = new App().express;
    app.listen(app.get('port'), ()=>{
        console.log('Server on port ' + app.get('port'));
    })
}

startServer();