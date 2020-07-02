import 'reflect-metadata'
import { createApp }   from './App';
import { container }   from './container';

// create server
const App = createApp(container);

const PORT = 8888;
App.set('json spaces', 2)

App.listen( PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
} );
