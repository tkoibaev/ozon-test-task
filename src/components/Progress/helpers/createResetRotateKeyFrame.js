/**
 * Функция вычисляет на сколько градусов повернулся элемент относительно начального положения
 * @param {HTMLElement} element
 * @returns {number}
 */
const getCurrentRotation = (element) => {
  const style = window.getComputedStyle(element);
  const transform = style.getPropertyValue('transform');

  const values = transform.split('(')[1].split(')')[0].split(',');
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);

  let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle;
};

/**
 * Функция возвращает keyframe правило для анимации вращения в виде строки
 * @param {HTMLElement} element
 * @returns {string}
 */
export const createResetRotate = (element) => {
  return `
        @keyframes resetRotate {
            from {
                transform: rotate(${getCurrentRotation(element)}deg);
            }
            to {
                transform: rotate(0deg);
            }
        }
        `;
};
