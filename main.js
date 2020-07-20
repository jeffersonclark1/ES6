import api from './api';

class App{

    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository');
        this.listEl = document.getElementById('repo-list')

        this.registerHandles();
    }

    registerHandles(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0)
            return; 

        const response = await api.get(`/repos/${repoInput}`);
        console.log(response);

        this.repositories.push({
            name: '',
            description: '',
            avatar_url: '',
            html_url: '',
        });

        this.render();

        console.log(this.repositories);

    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItem = document.createElement('li');
            listItem.appendChild(imgEl);
            listItem.appendChild(titleEl);
            listItem.appendChild(descriptionEl);
            listItem.appendChild(linkEl);

            this.appendChild(this.listEl);
        });

    }

}

new App;

