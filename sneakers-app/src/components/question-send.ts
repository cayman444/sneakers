class Question {
  async questionSend(e: SubmitEvent) {
    e.preventDefault();
    const form = <HTMLFormElement>e.target;
    const question = new FormData(form);
    const userName = question.get('username');
    const phone = question.get('phone');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    try {
      const res = await fetch('http://localhost:3000/question/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, phone, date: formattedDate }),
      });

      if (res.ok) {
        // eslint-disable-next-line no-alert
        alert('Отправлено');
        form.reset();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Question();
