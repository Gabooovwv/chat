export default class Chat
{
    constructor(socket)
    {
        this.sendButton      = document.querySelector('#sendButton');
        this.guestNameField  = document.querySelector('#guestName');
        this.textArea        = document.querySelector('#textArea');
        this.inputField      = document.querySelector('#message');
        this.socketIO        = socket;
        this.guestName       = this.guestNameField.value;

        this.insertMessageToHtml = this.insertMessageToHtml.bind(this);

        this.textAreaSize();
        this.event();
    }

    event()
    {
        this.inputField.addEventListener('keydown', e => {
            if (e.which === 13) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.guestNameField.addEventListener('keyup', () => {
            this.guestName = this.guestNameField.value;
        });

        this.sendButton.addEventListener('click', e => {
            e.preventDefault();
            this.sendMessage();
        });

        window.onresize = this.textAreaSize;
    }

    insertMessageToHtml(who, text)
    {
        const className = (who === 'me') ? 'right' : 'left';

        this.textArea.innerHTML += `<li class="${className}">${text}</li>`;
        this.textArea.scrollTop = this.textArea.scrollHeight;
    }

    sendMessage()
    {
        const message = this.inputField.value;

        if (message !== '') {
            this.socketIO.emit('message', {user: this.guestName, message});
            this.insertMessageToHtml('me', `<strong>${this.guestName}: </strong>${message}`);
            this.inputField.value = '';
        }
    }

    textAreaSize()
    {
        this.textArea.style.height = window.innerHeight - 100 + 'px';
    }
}