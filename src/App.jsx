import axios from "axios";
import cheerio from "cheerio";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const url = "api/jobs/search/?keywords=angular&origin=SWITCH_SEARCH_VERTICAL";

  axios
    .get(url)
    .then(function (response) {
      const htmlLoaded = cheerio.load(response.data);
      let links = htmlLoaded("a");
      links = Object.values(links)
        .map((item) => {
          return item.attribs?.href;
        })
        .filter((item) => {
          let temp = item?.split("/");
          return temp?.includes("jobs");
        });
      // const linksList = links["0"].attribs.href;
      console.log({
        links: links,
        // linksList: linksList,
      });

      const wikiUrls = [];
      for (let i = 0; i < 46; i++) {
        wikiUrls.push(
          htmlLoaded(
            ".ember-view job-card-container__link job-card-list__title",
            htmlLoaded.html()
          )[i]
        );
      }
      // console.log(wikiUrls);
    })
    .catch(function (err) {
      console.log("Deu erro");
      console.log({
        err: err,
      });
    });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
