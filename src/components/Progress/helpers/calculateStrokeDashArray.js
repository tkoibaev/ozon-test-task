/**
 *
 * @param {number} percentage - Значение заполненности(%)
 * @param {number} radius - Радиус окружности
 * @returns {string} - Присваивается свойству strokeDasharray для circle, который отвечает за закрашенную часть прогресс-бара.
 * Возвращает 2 значения - длина закрашенной части и полная длина окружности
 */

export const calculateStrokeDashArray = (percentage, radius) => {
  const circumference = 2 * Math.PI * radius; // длина окружности

  return `
      ${(circumference * percentage) / 100} ${circumference}
    `;
};
