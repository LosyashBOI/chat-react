function Output() {
  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        <template className="template-message">
          <p className="message__text">
            {/*<span className="message__author">Я:</span>*/}
          </p>
          <time className="message__time"></time>
        </template>
      </div>
    </div>
  );
}

export default Output;
