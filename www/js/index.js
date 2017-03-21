//#invia = id del bottone
$(function () {
    $("#invia").click(function () {
        var object = {
            nome: $("#nome").val(), //#nome = id input nome
            email: $("#email").val(), //#nome = id input email
            oggetto: $("#oggetto").val(), //#nome = id input oggetto
            testo: $("#messaggio").val() //#nome = id input testo
        };
        $.ajax({
            url: 'https://appgravina.firebaseio.com/contatti.json',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(object) //trasforma object in json
        }).done(function (data) { //se tutto ok
            alert("Email inviata");
        })
                .fail(function () { // se c'è stato un problema
                    alert("Errore!");
                });
    }
    );
});


$(function () {
    $("#inserisciGiocatore").submit(function (event) {
        event.preventDefault();
        var json = JSON.stringify($(this).serializeArray());
        $.ajax({
            url: "https://calcetto-e36eb.firebaseio.com/giocatori.json",
            type: "POST",
            data: json
        })
                .done(function () {
                    alert("Tutto ok!");
                })
                .fail(function () {
                    alert("Errore!");
                });
    });



    $("#elenco").on("pageshow", function () {
        $("#listaGiocatori").empty();
        $.ajax("https://calcetto-e36eb.firebaseio.com/giocatori.json")
                .done(function (giocatori) {
                    $.each(giocatori, function (index, riga) {
                        var testoGiocatore = "";
                        $.each(riga, function (i, datoGiocatore) {
                            testoGiocatore += datoGiocatore.value + " ";
                        });
                        $("#listaGiocatori").append("<li>" + testoGiocatore + "</li>");
                    });
                })
                .fail(function () {
                    alert("Errore! Prova a ricaricare la pagina...");
                });
    });
});
