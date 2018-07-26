$(document).ready(function(){
// instancia do container das tabs de consultas principais
var tabsPrincipais = $('.container-tab');
// instancia do container das sessoes
var secoesTabs = $("#secoes-tabs");

renderView("asdasdasdasdqweqfg");
setTimeout(function(){
    setEvents();
},150);

// renderiza a tela inicial completamente
function renderView(conexao){
    var buscaConsultas= retornaConsultas() ;
    //renderiza as tabs do topo da pagina inicial
    buscaConsultas.find({"conn":conexao},function (err, docs){
        var contador= 0;
        docs.forEach(element => {
                 //seta o id da sessão que sera utilizado para definir o id da tab
                 var idSection = "#"+element._id;
                 // cria o elemento da tab
                 var tab = document.createElement('li');
                 //atribui a referencia a sessão
                 tab.setAttribute('data-ref',idSection);
                 var label = document.createElement('label');
                 label.textContent = element.name;
                 tab.appendChild(label);

                 var sessao = renderizaSecao(element,idSection);
                 //contador de sessoes
                 contador++;
                 //adiciona tab no container 
                 tabsPrincipais.append(tab);
                 // adiciona sessao na tela
                 secoesTabs.append(sessao);
        });
    });
    tabsPrincipais.append('<a><li class="add">'+
    '<i class="material-icons" style="color: #8e8c8c;">add</i></li></a>');

    setEvents();
    
}

function retornaConsultas(idConn){
    var Datastore= require("nedb");
    var db= {};
    db.consultas  = new Datastore({ filename: 'app/database/consultas.json', autoload: true });
    return db.consultas;
}

function renderizaSecao(element,id_sessao){
        // cria a sessao principal como um container   
      
        var header = renderizaHeaderDaSessao(element,id_sessao);
      
        var body = renderizaBodyDaSessao(element,id_sessao);
        header.append(body);
        
        return header;
      
}

function renderizaBodyDaSessao(element,id_sessao){
    //cria o body da sessao
    var body  = document.createElement('div');
    body.classList.add('body');
    // cria as sub-sessoes do body 
    //sessao query
    var section_query= renderizaSubsessaoQuery(element,id_sessao );
     body.appendChild(section_query);
    //sessao preview
    section_query=document.createElement('section');
    section_query.classList.add('content-tab');
    section_query.setAttribute('id',id_sessao.replace('#','')+'-preview');
    body.appendChild(section_query);

    //sessao dados
    section_query= document.createElement('section');
    section_query.classList.add('content-tab');
    section_query.setAttribute(   'id',id_sessao.replace('#','')+'-dados');
    body.appendChild(section_query);
    return body;
}

function renderizaHeaderDaSessao(element,id_sessao){
    // cria o header da sessao
    var header_section = document.createElement('section');
    header_section.setAttribute('id',id_sessao.replace('#',''));
    header_section.classList.add('container-items');
    var title_container= document.createElement('div');
    title_container.classList.add('header-section'); 
    //titulo da tab
    var label = document.createElement('label'); 
    label.textContent = element.name;
    title_container.appendChild(label);

    header_section.appendChild(title_container);
    // cria o cabeçalho do body com o paginador
    var paginate_body =document.createElement('div');
    paginate_body.classList.add('paginate-body');
    //gerar as tabs do body 
    var ul = document.createElement('ul');

    // ul.append(
        
    var li = document.createElement('li');
    li.classList.add('tab-item');
    li.setAttribute( 'data-ref',id_sessao+"-query"); 
    li.textContent = "Query";
    ul.appendChild(li);

    li  = document.createElement('li');
    li.classList.add('tab-item');
    li.setAttribute( 'data-ref',id_sessao+"-preview"); 
    li.textContent = "Preview";
    ul.appendChild(li);
    
    li  = document.createElement('li');
    li.classList.add('tab-item');
    li.setAttribute( 'data-ref',id_sessao+"-dados"); 
    li.textContent = "Dados";
    ul.appendChild(li);

    // adiciona a ul no paginate body
    paginate_body.appendChild(ul);

    //adiciona as tabs do body no header
    header_section.appendChild(paginate_body);

    return header_section;
}

function renderizaSubsessaoQuery(tables,id_sessao){
    
    var sessao = document.createElement('section');
    sessao.classList.add('content-tab');
    sessao.setAttribute('id',id_sessao.replace('#','')+'-query');
    sessao.setAttribute('style','display:block;');

    var menu_tables= document.createElement('div');
    menu_tables.setAttribute('class','options');

    var ul = document.createElement('ul');
    ul.classList.add('list-tables');
    debugger;
    if(tables.length > 0 ){
        tables.forEach(element => {
            var img = $(document.createElement('img'),{
                'class':'table-icon',
                'src':'assets/img/table_icon.png'
            });
            var label = document.createElement('label');
            label.textContent =element.name ;
            var li  =document.createElement('li');
            li.appendChild(img);
            li.appendChild(label);
            ul.appendChild(li);
        });
    }
    

    var title = document.createElement('label');
    title.textContent = "TABELAS";

    menu_tables.appendChild(title);
    menu_tables.appendChild(ul);
    
    sessao.appendChild(menu_tables);

    return sessao;
}

function setEvents(){
   
    // set default item open
     var tabs = $('.paginate-body li.tab-item');
     $('#secoes-tabs .container-items').hide();
     $('#secoes-tabs .container-items').eq(2).show();
     tabs.each(function(index,obj){
         $(obj).removeClass('active');
     });
     tabs.eq(0).addClass('active');
     $('#secoes-tabs .container-items').eq(2).find('.paginate-body li.tab-item:first').show();
     // fim default open
 
     // set another tabsa
     $('.container-tab li').eq(2).addClass('active');
     // evento de click nas tabs principais 
     $('.container-tab li').click(function(){
         $('.container-tab li.active').removeClass("active");
         $(this).addClass('active');
         $('.container-items').hide();
         $( $(this).data('ref')).show();
         $(this).find('.tab-item').removeClass("active");
         $(this).find('.tab-item').eq(0).addClass('active');
         $(this).find('.content-tab').hide();
         $(this).find('.content-tab').eq(0).show();
     });
 
     tabs.click(function(){
         $(this).parent().find('.tab-item').removeClass("active");
         // $('#secoes-tabs .container-items:visible  .content-tab li.tab-item')
         $(this).addClass("active");
         $(this).parent().parent().parent().find('.content-tab').hide();
         $($(this).data('ref')).show();
             });
 }
});

