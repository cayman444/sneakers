import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../scss/tooltip.scss';

tippy('.content-item__tooltip', {
  content:
    'Адрес и телефон для корреспонденции, инвесторов. Вопросы о доставке, качестве обслуживания и товара просьба задавать в отдел продаж',
  maxWidth: 426,
  // eslint-disable-next-line no-magic-numbers
  offset: [190, 10],
});
