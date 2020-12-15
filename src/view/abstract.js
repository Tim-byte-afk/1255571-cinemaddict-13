import {createElement} from "../utils";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Нельзя сотворить здесь.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Абстрактный метод не реализован: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
