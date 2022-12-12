emailjs.init('vZsFxCT6xy6xgwDYI')
const btn = document.getElementById('email-send-button');

document.getElementById('feedback-message-form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_fcv9eyl';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });