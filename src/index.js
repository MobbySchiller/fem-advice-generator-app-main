import './sass/main.scss';

class App {
    constructor() {
        this.id = document.getElementById('id');
        this.advice = document.getElementById('advice');
        this.button = document.getElementById('button');
        this.divider = {
            mobile: document.getElementById('mobile'),
            desktop: document.getElementById('desktop')
        };
        this.flag = true;
        this.init();
    }

    init() {
        this.getData();
        this.button.addEventListener('click', () => {
            this.getData();
        });
        window.addEventListener('resize', () => {
            this.getSize();
            this.changeDivider(this.flag);
        });
    }

    getData() {
        const adviceId = Math.floor(Math.random() * 224);
        return fetch(`https://api.adviceslip.com/advice/${adviceId}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.slip.id, data.slip.advice)
                this.changeId(data.slip.id);
                this.changeAdvice(data.slip.advice);
            });
    }

    changeId(number) {
        this.id.textContent = number;
    }

    changeAdvice(text) {
        this.advice.textContent = `"${text}"`;
    }

    getSize() {
        if (window.innerWidth > 500) {
            this.flag = true;
        } else {
            this.flag = false;
        }
    }

    changeDivider(size) {
        if (size) {
            this.divider.mobile.classList.add('invisible');
            this.divider.desktop.classList.remove('invisible');
        } else {
            this.divider.mobile.classList.remove('invisible');
            this.divider.desktop.classList.add('invisible');
        }
    }

}

const app = new App();