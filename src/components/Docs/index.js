import React, { useEffect, useState } from "react";
import "./index.css";

function Docs(props) {
  const [docs, setDocs] = useState({ status: "BAD" });

  async function getData() {
    try {
      const res = await fetch(`data.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setDocs(data);
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const docsData = () => {
    return docs?.basic_syntax.map((doc, indx) => {
      return (
        <div key={indx}>
          <h2>{doc?.name}:</h2>
          <p>{doc?.description}</p>
          {doc?.examples.map((example, index) => (
            <div className="example-container" key={"ex-" + index}>
              <h4 className="example-heading">Example {index + 1}:</h4>
              {example?.description && <p>{example?.description}</p>}
              <h5 className="code-title">- markdown:</h5>
              <code>{example?.markdown}</code>
              <h5 className="code-title">- HTML:</h5>
              <code>{example?.html}</code>
            </div>
          ))}
          {doc?.["additional_examples"].map((example, index) => (
            <div className="example-container" key={"add-" + index}>
              <h4 className="example-heading">{example?.name}</h4>
              {example?.description && <p>{example?.description}</p>}
              <h5 className="code-title">- markdown:</h5>
              <code>{example?.markdown}</code>
              <h5 className="code-title">- HTML:</h5>
              <code>{example?.html}</code>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="docs-container">
      {<>{docs.status === "OK" && docsData()}</>}
    </div>
  );
}

export default Docs;
