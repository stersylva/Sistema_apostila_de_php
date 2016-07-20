// Função para capturar eventos
function captura_eventos(objeto, evento, funcao) {
    // Testa se o navegador suporta addEventListener
    if (objeto.addEventListener) {
        // Adiciona addEventListener
        objeto.addEventListener(evento, funcao, true);
    }
    // Testa se o navegador suporta attachEvent
    else if (objeto.attachEvent) {
        // Adiciona a palavra on no evento
        var evento = 'on' + evento;
        // Adicionar attachEvent
        objeto.attachEvent(evento, funcao);
    }
}
 
// Função para cancelar os eventos
function cancela_evento(evento) {
    // Testa se o navegador suporta stopPropagation
    if (evento.stopPropagation) {
        // Adiciona stopPropagation
        evento.stopPropagation();
        // Adiciona preventDefault
        evento.preventDefault();
    } else {
        // Configura returnValue como false para o IE
        evento.returnValue = false;
        // Cancela a propagação para o IE
        evento.cancelBubble = true;
    }
}
 
// Função geral para rodar após o load da página
function geral() {
    // Função para capturar o submit do formulário
    captura_eventos(document.getElementById('meu_formulario'), 'submit', envia_formulario);
 
    // Função para capturar o evento focus do campo name
    captura_eventos(document.getElementById('nome'), 'focus', entrou_no_campo);
 
    // Função para capturar o evento focus do campo name
    captura_eventos(document.getElementById('nome'), 'blur', saiu_do_campo);
}
 
function entrou_no_campo(evento){
    // Captura o evento para o IE ou outros navegadores
    var evento = evento ? evento : window.event;
 
    // Obtém o elemento que está sendo tratado no evento (o formulário)
    var campo_nome = evento.target ? evento.target : evento.srcElement; 
    
    campo_nome.value = 'Entrou no campo.';
}
 
function saiu_do_campo(evento){
    // Captura o evento para o IE ou outros navegadores
    var evento = evento ? evento : window.event;
 
    // Obtém o elemento que está sendo tratado no evento (o formulário)
    var campo_nome = evento.target ? evento.target : evento.srcElement; 
    
    alert('Sai do campo, valor: ' + campo_nome.value);
}
 
// Carrega a função geral após o carregamento da página
captura_eventos(window, 'load', geral);
 
// Função para o submit do formulário
function envia_formulario(evento) {
    // Captura o evento para o IE ou outros navegadores
    var evento = evento ? evento : window.event;
 
    // Obtém o elemento que está sendo tratado no evento (o formulário)
    var formulario = evento.target ? evento.target : evento.srcElement;
 
    // Obtém o campo de select através de seu nome
    var nome = formulario.nome.value;
    var sobrenome = formulario.sobrenome.value;
    var senha = formulario.senha.value;
    var radios = formulario.sexo;
    var opcoes = formulario.opcoes;
    var mensagem = formulario.mensagem.value;
    
    // Verifica se os campos de texto foram preenchidos
    if (nome == '' || 
        sobrenome == '' || 
        senha == '' || 
        mensagem == '') {
        alert('Você não preencheu todos os campos de texto!');
        cancela_evento(evento);
        return false;
    }
    
    // Variável para verificar os radios
    var marcados = false;
    // Verifica os radios
    for(var i=0; i < radios.length; i++){
        if(radios[i].checked){
            marcados = true;
        }
    }
    
    if(!marcados) {
        alert('Selecione seu sexo!');
        cancela_evento(evento);
        return false;
    }
    
    if(opcoes.value == ''){
        alert('Escolha ao menos uma das opções');
        cancela_evento(evento);
        return false;
    }
    
    alert('Formulário será enviado e a página atualizada agora!');
}