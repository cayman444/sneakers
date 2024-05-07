const accordion = document.querySelector('.question-accordion');

function accordionToggle(e: Event) {
  const target = e.target as HTMLElement;
  const currentItem = target.closest('.accordion-item');
  const currentText = currentItem?.querySelector('.accordion-item__text') as HTMLElement;

  if (currentItem) {
    currentItem.classList.toggle('active');
    currentText.style.maxHeight = currentItem.classList.contains('active') ? `${currentText.scrollHeight}px` : '0';
  }
}

accordion?.addEventListener('click', accordionToggle);
