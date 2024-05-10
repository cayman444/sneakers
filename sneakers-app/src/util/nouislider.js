import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const slider = document.querySelector('.filter-inputs__slider');
const inputMin = document.querySelector('.item-inputs__min');
const inputMax = document.querySelector('.item-inputs__max');
const btnReset = document.querySelector('.filter-item__reset');
const inputsMinMax = [inputMin, inputMax];
const price = {
  min: 1850,
  max: 25768,
};

noUiSlider.create(slider, {
  start: [price.min, price.max],
  connect: true,
  range: {
    min: price.min,
    max: price.max,
  },
  margin: 100,
  step: 1,
});

slider.noUiSlider.on('update', (values, handle) => {
  inputsMinMax[handle].value = parseInt(values[handle], 10);
});

inputMin.addEventListener('change', (e) => {
  slider.noUiSlider.set([e.target.value, null]);
});

inputMax.addEventListener('change', (e) => {
  slider.noUiSlider.set([null, e.target.value]);
});

btnReset.addEventListener('click', () => {
  slider.noUiSlider.set([price.min, price.max]);
});
