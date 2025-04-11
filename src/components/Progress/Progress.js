import { getTemplate } from './template.js';
import { calculateStrokeDashArray } from './helpers/calculateStrokeDashArray.js';
import { createResetRotate } from './helpers/createResetRotate.js';
import {
  PROGRESS_RADIUS,
  INITIAL_PROGRESS_VALUE,
} from '../../utiles/consts.js';

/**
 * Компонент прогресс-бар
 */
export class Progress {
  #parent;
  /**
   *  Элемент представляющий синюю (заполненную) часть прогресс-бара из DOM.
   * @type {HTMLElement}
   *
   */
  #circle;
  #initialValue;
  #rotationStyle;
  /**
   *
   * @param {HTMLElement} parent - Родительский элемент для рендеринга компонента, в него будет
   * встраиваться компонент
   * @param {number} initialValue - Начальное значение для отображения в прогресс-баре
   */
  constructor(parent, initialValue = INITIAL_PROGRESS_VALUE) {
    this.#parent = parent;
    this.#initialValue = initialValue;

    this.#rotationStyle = document.createElement('style');
    document.head.appendChild(this.#rotationStyle);
  }

  /**
   * API-метод. Обновление визуализируемого значения
   * @param {number} value - новое значение, которое будет визуализировать прогресс-бар
   */
  updatePercentage(value) {
    this.#circle.style.strokeDasharray = `${calculateStrokeDashArray(
      value,
      PROGRESS_RADIUS ?? 55
    )}`;
  }

  /**
   * API-метод. Обновление видимости прогресс-бара
   * @returns {void}
   */
  updateVisibility() {
    const container = document.getElementById('progress-container');
    container.classList.toggle('hidden');
  }

  /**
   * API-метод. Переключение анимации прогресс-бара
   * @returns {void}
   */
  updateAnimation(isAnimated) {
    if (isAnimated) {
      this.#circle.classList.add('animated');
      this.#circle.classList.remove('returning');
    } else {
      // Позволяет плавно сбрасывать анимацию - элемент "откатывается" в изначальное положение (подробнее в ридми)
      this.#rotationStyle.textContent = createResetRotate(this.#circle);
      this.#circle.classList.remove('animated');
      this.#circle.classList.add('returning');
    }
  }

  render() {
    this.#parent.innerHTML = getTemplate(this.#initialValue);
    this.#circle = document.getElementById('circle');
  }
}

export default Progress;
