const formEnvio = document.getElementById("formEnvio");
const churrascometro = document.getElementById("churrascometro");
const formCalculo = document.getElementById('formCalculo');
const resultado = document.getElementById("result");
const spinner = document.getElementById('spinner');

const data = {
    nome:'',
    email:'',
    cep:'',
    promocao:''
}

const dataChurrasco = {
    carne: 0,
    carne : 0,
    paoAlho : 0,
    carvao : 0,
    gelo : 0,
    sal : 0,
    refrigerante : 0,
    agua : 0,
    cerveja : 0,
}

formEnvio.promocoes.checked = true

function ValidarEmail(email) {
    // Utilizando uma expressão regular simples para verificar o formato do e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

const VerificacaoEmail = () => {
    const message = document.getElementById("message");
    const email = formEnvio.email.value
    if (!ValidarEmail(email) && email != '') {
        formEnvio.email.classList.add("border-red-500");
        message.classList.remove("hidden");
        message.textContent = "Por favor, insira um e-mail válido."
    }else{
        formEnvio.email.classList.remove("border-red-500");
        message.classList.add("hidden");
    }
}
const VerificacaoCep = () =>{
    const message = document.getElementById("message");
    const cep = formEnvio.cep.value
   
    if (cep.length != 8 && cep.length > 0 ) {
        formEnvio.cep.classList.add("border-red-500");
        message.classList.remove("hidden");
        message.textContent = "O cep deve conter 8 dígitos por favor digite apenas números."
        
       }else {
        formEnvio.cep.classList.remove("border-red-500");
        message.classList.add("hidden");
       }

}

const Cadastrar = () =>{
        data.nome = formEnvio.name.value;
        data.email = formEnvio.email.value;
        data.cep = formEnvio.cep.value;
        data.promocao = formEnvio.promocoes.checked;
        sessionStorage.setItem('data', JSON.stringify(data))
        LoadingLogin()

}
const session = JSON.parse(sessionStorage.getItem('data') || "[]");

const Persiste = (session) => {
        if (session) {
            formEnvio.classList.add("hidden");
        }else {
            churrascometro.classList.remove("hidden");
        }
}

const Result = (result) => {
    if (result) {
        resultado.classList.remove("hidden");
    }else{
        resultado.classList.add("hidden");
    }
}

const LoadingLogin = () =>{
    spinner.style.display = 'block';

    if(session){
        setTimeout(() => {
            spinner.style.display = 'none';
          }, 2000)
        setTimeout(() => {
            churrascometro.classList.remove("hidden");
        },2000)
        Persiste(session)
    }
}


const Calcular = () =>{
    let carne = 0
    let paoAlho = 0
    let gelo = 0
    let sal = 0
    let refrigerante = 0
    let agua = 0
    let cerveja = 0
    let carvao = 0
    const homem = formCalculo.homem.value
    const mulher = formCalculo.mulher.value
    const crianca = formCalculo.crianca.value
    const alcool = formCalculo.alcool.value

    if ((homem || mulher || crianca)) {
        paoAlho = ((homem * 2) + (mulher * 2) + (crianca * 1));
        carne = ((homem * 0.50) + (mulher * 0.40) + (crianca * 0.30));
        carvao = ((homem * 1) + (mulher * 1) + (crianca * 1));
        sal = ((homem * 0.04) + (mulher * 0.04) + (crianca * 0.04));
        gelo += 5
        refrigerante += 2
        agua += 1
    }

    if ((homem + mulher + crianca) % 10 === 0) {
        gelo = 0
        gelo = 5 * ((homem + mulher + crianca) / 10)
    }

    if ((homem + mulher + crianca) % 5 === 0) {
        refrigerante = 0
        agua = 0
        refrigerante = (homem + mulher + crianca) * 2;
        agua = (homem + mulher + crianca) * 1;

    }

    if (alcool) {
        cerveja = alcool * 3
    }
    
   
    dataChurrasco.carne = parseFloat(carne)
    dataChurrasco.paoAlho = parseFloat(paoAlho)
    dataChurrasco.carvao = carvao
    dataChurrasco.gelo = parseFloat(gelo)
    dataChurrasco.sal = parseFloat(sal)
    dataChurrasco.refrigerante = parseFloat(refrigerante)
    dataChurrasco.agua = parseFloat(agua)
    dataChurrasco.cerveja = parseFloat(cerveja)
    sessionStorage.setItem('itensChurrasco', JSON.stringify(dataChurrasco))
    LoadingResultado()   
}

const churrasco = JSON.parse(sessionStorage.getItem('itensChurrasco') || "[]");

LoadingResultado = () => {
    spinner.style.display = 'block';
    if(churrasco) {
        churrascometro.classList.add("hidden");
        setTimeout(() => {
            spinner.style.display = 'none';
          }, 2000)
        setTimeout(()=>{
            resultado.classList.remove("hidden");
        }, 2000 )
        //Result(churrasco)
    }
}

if (churrasco) {
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.carne} KG de Carne </span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.paoAlho} Pacotes de pão de alho</span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.cerveja}L de Cerveja</span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.refrigerante}L de Refrigentes</span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.agua}L de Água</span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.carvao} Sacos de Carvão</span>`
    resultado.innerHTML +=  `<span class=font-bold> ${churrasco.sal} KG de Sal</span>`

}  

if(session.length === 0) {
    churrascometro.classList.add("hidden");
    formEnvio.classList.remove("hidden");
}else{
    formEnvio.classList.add("hidden");
    churrascometro.classList.remove("hidden");
}

 /*
if (session) {
    formEnvio.classList.add("hidden")
}
*/