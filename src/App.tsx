import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { initializeModel, processImage } from "./background-removal";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input
        type="file"
        value=""
        onChange={async (e) => {
          const file = e.currentTarget.files?.[0];
          console.time("Init");
          await initializeModel();
          console.timeEnd("Init");
          if (!file) return;
          document.body.appendChild(
            Object.assign(document.createElement("img"), {
              src: URL.createObjectURL(file),
              width: "200",
            })
          );
          console.time("Process");
          const newFile = await processImage(file);
          console.timeEnd("Process");
          document.body.appendChild(
            Object.assign(document.createElement("img"), {
              src: URL.createObjectURL(newFile),
              width: "200",
            })
          );
        }}
      />
    </>
  );
}

export default App;
