import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3000/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/event-stream',
        }
      }
    )

    const reader = response.body?.pipeThrough(
      new TextDecoderStream()
    ).getReader()

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader!.read()
      if (done) break;

      console.log("Received: ", value)
      setValue(prev => prev + value)
    }
  }

  return (
    <main>
      <p>Streaming response: </p>
      <br />

      <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
      <button onClick={handleClick}>
        Submit
      </button>
    </main>
  );
}