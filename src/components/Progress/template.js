import { calculateStrokeDashArray } from './helpers/calculateStrokeDashArray.js';
import { PROGRESS_RADIUS } from './helpers/consts.js';
export const getTemplate = (value) => {
  return `
      <div class="progress__container" id="id-progress-container">
        <svg class="progress__container_svg" width="120" height="120">
            <circle
            class="progress__circle background"
            stroke="#F0F3F6"
            stroke-width="10"
            cx="60"
            cy="60"
            r="55"
            fill="transparent"
            />  
            <circle
            id="id-circle"
            class="progress__circle"
            stroke="#255AF1"
            stroke-width="10"
            cx="60"
            cy="60"
            r="55"
            fill="transparent"
            stroke-dasharray="${calculateStrokeDashArray(
              value,
              PROGRESS_RADIUS
            )}"
          />
        </svg>
      </div>
    `;
};
