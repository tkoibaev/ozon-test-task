import { getTemplate } from './template.js';
import Progress from '../Progress/Progress.js';
import { Controllers } from '../Controllers/Controllers.js';

/**
 * Компонент блока отображения и управления, контроллирует компонент отрисовки
 * Progress и компонент элементов управления
 */
export class App {
  #parent;
  #initialPercentValue;

  /**
   * Создает экземпляр класса App.
   * @param {HTMLElement} parent - Родительский элемент для рендеринга компонента, в него будет
   * встраиваться App
   * @param {number} initialPercentValue - Начальное значение прогресса (по умолчанию
   * 0)
   */
  constructor(parent, initialPercentValue = 0) {
    this.#parent = parent;
    this.#initialPercentValue = initialPercentValue;
  }

  /**
   * Создает и рендерит контроллеры для управления прогрессом.
   * @param {HTMLElement} parent - Родительский элемент для блока контроллеров
   * @param {Progress} progressForControlling - Экземпляр Progress над которым будет
   * происходить управление
   * @returns {void}
   */
  #renderControllers(parent, progressForControlling) {
    const controllers = new Controllers(
      parent,
      progressForControlling,
      this.#initialPercentValue
    );
    controllers.render();
  }

  /**
   * Создает и рендерит компонент прогресс-бара.
   * @param {HTMLElement} parent - Родительский элемент для прогресс-бара
   * @returns {Progress} Экземпляр класса Progress
   */
  #renderProgress(parent) {
    const progress = new Progress(parent, this.#initialPercentValue);
    progress.render();
    return progress;
  }

  /**
   * Рендерит шаблон компонента в родительский элемент и вызывает функции рендера прогресс-бара и управления
   * @returns {void}
   */
  render() {
    this.#parent.innerHTML = getTemplate();

    const progressContainer = document.getElementById('id-donut-container');
    const controllerContainer = document.getElementById('id-controllers');

    const progress = this.#renderProgress(progressContainer);
    this.#renderControllers(controllerContainer, progress);
  }
}
