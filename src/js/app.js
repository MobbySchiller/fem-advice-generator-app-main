import '../sass/main.scss';

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

        return fetch('https://api.adviceslip.com/advice')
            .then(resp => resp.json())
            .then(data => {
                this.drawedId = data.slip.id;
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
        console.log(size);
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