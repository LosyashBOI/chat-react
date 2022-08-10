function Modals() {
  return (
    <div className="modal">
      <div className="modal__element modal__element_settings">
        <div className="modal__top flex">
          <h2 className="modal__title">Настройки</h2>
          <button className="btn btn_close-modal">+</button>
        </div>
        <p className="chat-name">Имя в чате</p>
        <form className="settings__form flex">
          <input className="input input_settings" type="text" placeholder="Стив" />
          <input className="btn btn_chat btn_settings-submit" type="submit" value="->" />
        </form>
      </div>
      <div className="modal__element modal__element_authorization">
        <div className="modal__top flex">
          <h2 className="modal__title">Авторизация</h2>
          <button className="btn btn_close-modal">+</button>
        </div>
        <h3 className="form-title">Почта:</h3>
        <form className="authorization__form">
          <input className="input input_authorization" type="email" />
          <input
            className="btn btn_chat btn_authorization-submit"
            type="submit"
            value="Получить код"
          />
        </form>
      </div>
      <div className="modal__element modal__element_confirmation">
        <div className="modal__top flex">
          <h2 className="modal__title">Подтверждение</h2>
          <button className="btn btn_close-modal">+</button>
        </div>
        <h3 className="form-title">Код:</h3>
        <form className="confirmation__form">
          <input className="input input_confirmation" type="text" />
          <input
            className="btn btn_chat btn_confirmation-submit"
            type="submit"
            value="Войти"
          />
        </form>
      </div>
    </div>
  );
}

export default Modals;
