import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

import Navigation from "./Navigation";

// eslint-disable-next-line no-unused-vars
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {

  return (
      <div>
          <Provider store={store} >
          <Navigation />
          </Provider>
      </div>
        );
}

export default App;
