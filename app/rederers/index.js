var Datastore= require("nedb");

var db= {};
db.conexoes  = new Datastore({ filename: 'app/database/conn.json', autoload: true });
db.conexoes.loadDatabase();
var listElement = document.getElementById("lista-conexoes");

db.conexoes.find({},function(err,docs){

    docs.forEach(element => {
        var li = $("<li/>",{
            "id":element._id,"class":"collection-item avatar"
        });
        var label = $("<span/>",{
            "class":"title"
            }).text(element.nome );
        var i =$('<i/>',{
            "class":"material-icons circle"
        }).text("folder_open");
        var p = $('<p/>').text(element.driver);
    
        li.append(i).append(label).append(p);
        $(listElement).append("<li class='collection-item avatar'>"+li.html()+"</li>");
    });
});

