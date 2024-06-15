const accordion = document.querySelector('.question-accordion');

function accordionToggle(e: Event) {
  const target = <HTMLElement>e.target;
  if (!target.closest('.accordion-item__button')) return;
  const currentItem = target.closest('.accordion-item');
  const currentText = <HTMLElement>currentItem?.querySelector('.accordion-item__text');

  if (currentItem) {
    currentItem.classList.toggle('active');
    currentText.style.maxHeight = currentItem.classList.contains('active') ? `${currentText.scrollHeight}px` : '0';
  }
}

function checkActive() {
  const accordionItems = <NodeListOf<Element>>accordion?.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    if (item.classList.contains('active')) {
      const currentText = <HTMLElement>item?.querySelector('.accordion-item__text');
      currentText.style.maxHeight = `${currentText.scrollHeight}px`;
    }
  });
}

function accordionOrderCheck(e: Event) {
  const target = <HTMLElement>e.target;
  if (!target.closest('.order-content__compound')) return;
  const parentOrderAcc = <HTMLElement>target.parentElement;
  const orderProducts = <HTMLElement>parentOrderAcc.querySelector('.order-content__products');
  if (parentOrderAcc) {
    parentOrderAcc.classList.toggle('active');
    orderProducts.style.maxHeight = parentOrderAcc.classList.contains('active') ? `160px` : '0';
  }
}

export default function clickOrder() {
  const accordionOrder = document.querySelectorAll('.order-content__about');
  accordionOrder.forEach((order) => order.addEventListener('click', accordionOrderCheck));
}
clickOrder();

document.addEventListener('DOMContentLoaded', checkActive);
accordion?.addEventListener('click', accordionToggle);
