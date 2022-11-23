import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css"; 
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css"; 

import React from 'react';
import { Route, Routes } from "react-router-dom";
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, Technology } from "./Tools/data.model";

import List from "./List/List";
import Tech from "./Tech/Tech";
import Error from "./Error/Error";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

//const RETRIEVE_SCRIPT:string = "http://localhost/get";
const RETRIEVE_SCRIPT:string = '/get';

function App() {

  // ---------------------------------------------- event handlers
  const onResponse = (result:JSONData) => {
    setTechnologies(result.technologies);
    console.log(result.technologies);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  // --------------------------------------------- state setup
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="overflow-y-auto min-h-screen p-5 bg-white">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="font-bold text-xl pb-2.5">_Technology Roster</div>

      {(technologies.length > 0) ?
      <Routes>
        <Route
          path="/"
          element={<List technologies={technologies} />}
        />

        <Route
          path="/list"
          element={<List technologies={technologies} />}
        />

        <Route
          path="/tech/:id"
          element={<Tech technologies={technologies} />}
        />

        <Route
          path="/*"
          element={<Error />}
        />
      </Routes>
      : <div>There are no technologies in the database :(</div>}

      <div className="mt-10 mb-2.5">Technology descriptions by <a href="https://wikipedia.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">wikipedia</a></div>
    </div>
  );
}

export default App;
