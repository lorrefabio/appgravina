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
