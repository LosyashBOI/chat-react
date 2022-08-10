function Bottom() {
  return (
    <div className="chat__bottom">
      <form className="chat__form flex">
        <input className="input input_message" type="text" placeholder="сообщение..." />
        <input className="btn btn_chat btn_message-submit" type="submit" value="->" />
      </form>
    </div>
  );
}

export default Bottom;
