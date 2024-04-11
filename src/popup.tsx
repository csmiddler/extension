import React, { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  console.log("---")
  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        this to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
