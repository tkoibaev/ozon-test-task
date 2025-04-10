export const getTemplate = () => {
  return `
        <div class="controls">
          <div class="controller">
            <input
              autocomplete="off"
              id="input-value__text"
              class="controller__input"
              type="number"
              placeholder = "Value"
            />
            <span class="controller__title">Value</span>
          </div>
          <div class="controller">
            <input placeholder = "Animation" class="controller__toggle_input" type="checkbox" name="switch" id="id-animation-toggle">
            <label class="controller__toggle_label" for="id-animation-toggle"></label>
            <span class="controller__title">Animate</span>
          </div>
          <div class="controller">
            <input placeholder = "Visibility" class="controller__toggle_input" type="checkbox" name="switch1" id="id-visibility-toggle">
            <label class="controller__toggle_label" for="id-visibility-toggle"></label>
            <span class="controller__title">Hide</span>
          </div>
        </div>
    `;
};
