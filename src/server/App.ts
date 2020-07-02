import * as bodyParser            from 'body-parser';
import { Container }              from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

export let AppContainer: Container;

export function createApp(container: Container) {
    AppContainer = container;
    let server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });


    return server.build();
}
