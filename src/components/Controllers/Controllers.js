import { getTemplate } from './template.js';
import { debounce } from '../../utiles/debounce.js';
import { INITIAL_PROGRESS_VALUE } from '../../utiles/consts.js';

/**
 * Компонент для управления прогресс-баром
 */
export class Controllers {
  #progressForControlling;
  #parentContainer;
  #initialProgressValue;

  // Возможно стоит доставать элементы в нужных слушателях, а не выносить в поля класса?
  #inputElement;
  #animationSwitch;
  #visibilitySwitch;

  /**
   *
   * @param {HTMLElement} parentContainer - Родительский элемент для рендеринга компонента,
   * в него будет встраиваться компонент
   * @param {Progress} progressForControlling - экземпляр класса Progress, который будет контроллироваться
   * @param {number} initialProgressValue - Начальное значение для поля ввода
   */
  constructor(parentContainer, progressForControlling, initialProgressValue) {
    this.#parentContainer = parentContainer;
    this.#progressForControlling = progressForControlling;
    this.#initialProgressValue = initialProgressValue;
  }

  /**
   * Метод для валидации поля ввода.
   * Если введеное значение будет больше 100, значение автоматически установится 100.
   * Если введеное значение будет меньше 0, значение автоматически установится 0.
   * Если первый из нескольких символов 0, то он автоматически удаляется.
   * @returns {void}
   */
  #validateInputValue() {
    const value = this.#inputElement.value;

    if (value.startsWith('0') && value.length > 1) {
      this.#inputElement.value = value.substring(1);
      return;
    }
    if (value > 100) {
      this.#inputElement.value = 100;
      return;
    }
    if (value < 0 || value.length === 0) {
      this.#inputElement.value = 0;
      return;
    }
  }

  /**
   * Слушатель поля ввода. Дебаунс установлен, чтобы прогресс-бар не
   * "прыгал" во время ввода
   */
  #listenValueInput() {
    this.#inputElement.addEventListener('input', (event) => {
      this.#validateInputValue();
      debounce(
        () =>
          this.#progressForControlling.updatePercentage(
            this.#inputElement.value
          ),
        200
      )();
    });
  }

  /**
   * Слушатель переключателя анимации
   */
  #listenAnimationToggle() {
    this.#animationSwitch.addEventListener('change', (event) => {
      this.#progressForControlling.updateAnimation(event.target.checked);
    });
  }

  /**
   * Слушатель переключателя видимости
   */
  #listenVisibilityToggle() {
    this.#visibilitySwitch.addEventListener('change', (event) => {
      this.#progressForControlling.updateVisibility(event.target.checked);
    });
  }

  #includeListeners() {
    this.#listenValueInput();
    this.#listenAnimationToggle();
    this.#listenVisibilityToggle();
  }

  #setControlItems() {
    this.#inputElement = document.getElementById('input-value__text');
    this.#inputElement.value = this.#initialProgressValue;
    this.#animationSwitch = document.getElementById('id-animation-toggle');
    this.#visibilitySwitch = document.getElementById('id-visibility-toggle');
  }

  /**
   * Рендерим компонент, получаем элементы управления и навешиваем на них слушатели
   */
  render() {
    this.#parentContainer.innerHTML = getTemplate();

    this.#setControlItems();
    this.#includeListeners();
  }
}
