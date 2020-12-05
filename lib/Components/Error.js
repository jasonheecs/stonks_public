const Error = ({ error, sendRequest }) => (
  <div>
    <h3>
      Well, fuck... shit... this wasn't suppose to happen!.. {error.toString()}
    </h3>
    <button onClick={sendRequest} id="try-again">
      try again?
    </button>
  </div>
);

export default Error;
