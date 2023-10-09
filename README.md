Dashboard de Controle de Temperatura
Este é um projeto de dashboard desenvolvido em Angular 2+ para monitorar a temperatura de servidores e chuveiros.

Screenshot

Instalação
Siga estas etapas para configurar o projeto em seu ambiente local:

Pré-requisitos: Certifique-se de que você tenha o Node.js e o Angular CLI instalados em sua máquina. Se não tiver, você pode baixá-los em nodejs.org e angular.io.

Clone o repositório: Use o Git para clonar este repositório em sua máquina local.

bash
Copy code
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
Instale as dependências: Execute o seguinte comando para instalar as dependências do projeto.

bash
Copy code
npm install
Uso
Após concluir a instalação, você pode iniciar o servidor de desenvolvimento local com o Angular CLI. Isso permitirá que você visualize o dashboard em seu navegador.

bash
Copy code
ng serve
Acesse o dashboard em seu navegador em http://localhost:4200.

Funcionalidades
Gráfico de Temperatura: Visualize a temperatura dos servidores e chuveiros em tempo real por meio de um gráfico interativo.

Controle de Temperatura: Controle a temperatura dos servidores e chuveiros diretamente através do dashboard.

Contribuições
Sinta-se à vontade para contribuir para este projeto. Abra um "Pull Request" com suas melhorias, correções de bugs ou novas funcionalidades.

Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

Certifique-se de substituir seu-usuario e seu-projeto pelos detalhes reais do seu repositório. Esta é apenas uma documentação básica, você pode adicionar mais detalhes, imagens, ou qualquer outra informação relevante ao seu projeto. Lembre-se de manter a documentação atualizada à medida que o projeto evolui.
![image](https://github.com/samaelsimoes/Temperature-control/assets/29442511/14c14188-fd36-46fa-9714-1cf489ac92b2)

```
material-dashboard-angular
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── angular-cli.json
├── documentation
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── auth  
│   │   │   ├── interface
│   │   │        ├──
│   │   │   ├── login
│   │   │   │    ├── login.component.html
│   │   │   │    ├── login.component.scss
│   │   │   │    ├── login.component.spec.ts
│   │   │   │    ├── login.component.ts
│   │   │   ├── register
│   │   ├── global
│   │   │     ├── ConfigGlobalURLS.ts  
│   │   ├── home  
│   │   ├──Dashboard  
│   │   │   ├── cards
│   │   │   │     ├──
│   │   │   ├── chuveiro
│   │   │   │     ├──
│   │   │   ├── components
│   │   │   │     ├── footer
│   │   │   │     │     ├──
│   │   │   │     │     ├──
│   │   │   │     │     ├──
│   │   │   │     ├── navbar
│   │   │   │     │     ├──
│   │   │   │     │     ├──
│   │   │   │     │     ├──                        
│   │   │   │     ├── sidebar
│   │   │   │     │     ├──
│   │   │   │     │     ├──
│   │   │   │     │     ├──
│   │   │   ├── data-center
│   │   │   │     ├──
│   │   │   ├── icons
│   │   │   │     ├──
│   │   │   ├── index
│   │   │   │     ├──
│   │   │   ├── interface
│   │   │   │     ├──
│   │   │   ├── maps
│   │   │   │     ├──
│   │   │   ├── notifications
│   │   │   │     ├──
│   │   │   ├── server
│   │   │   │     ├──
│   │   │   ├── table-list
│   │   │   │     ├──
│   │   │   ├── typography
│   │   │   │     ├──
│   │   │   ├── upgrade  
│   │   │   │     ├──
│   │   │   ├── dashboard.module.ts
│   ├── assets
│   │   ├── css
│   │   │   └── demo.css
│   │   ├── img
│   │   └── scss
│   │       ├── core
│   │       └── material-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
├── tslint.json
└── typings
