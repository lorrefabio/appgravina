$(function () {
    /*$("#cancella_tutto").on("click", function () {
     $("#main_preferiti").load(location.href + " #main_preferiti");
     var arrayPreferiti = JSON.parse(localStorage["a_preferiti"]);
     var arrayNomiPreferiti = JSON.parse(localStorage["a_n_preferiti"]);
     arrayPreferiti = [];
     arrayNomiPreferiti = [];
     localStorage["a_preferiti"] = JSON.stringify(arrayPreferiti);
     localStorage["a_n_preferiti"] = JSON.stringify(arrayNomiPreferiti);
     });*/
    /*$("#luoghi").on("pageshow", function () {
        var arrayPreferiti = JSON.parse(localStorage["a_preferiti"]);
        var arrayNomiPreferiti = JSON.parse(localStorage["a_n_preferiti"]);
        var ultimo = 0;
        while (arrayPreferiti[ultimo]) {
            ultimo++;
        }
        for (var i = 0; i < ultimo; i++) {
            if (arrayPreferiti[i] === "#cattedrale") {
                $('.cattedrale').parent().children('a i').css("color", "blue");
                $('.cattedrale').parent().children('a i').addClass("preferito");

            }
        }
    });*/
    $("a#preferiti").on("click", function () {
        $("#main_preferiti").load(location.href + " #main_preferiti");
    });
    $(".bottone_preferiti").on("click", "a", function () {
        $("#main_preferiti").load(location.href + " #main_preferiti");
        var arrayPreferiti = JSON.parse(localStorage["a_preferiti"]);
        var arrayNomiPreferiti = JSON.parse(localStorage["a_n_preferiti"]);
        if (arrayPreferiti === null) {
            arrayPreferiti = [];
        }
        if (arrayNomiPreferiti === null) {
            arrayNomiPreferiti = [];
        }
        var ultimo = 0;
        while (arrayPreferiti[ultimo]) {
            ultimo++;
        }
        if ($(this).children('a i').hasClass("preferito")) {
            //var var_confronto = $(this).parent().children('button').attr("data-target");
            for (var i = 0; i < ultimo; i++) {
                if (arrayPreferiti[i] == $(this).parent().children('button').attr("data-target")) {
                    arrayPreferiti.splice(i, 1);
                    arrayNomiPreferiti.splice(i, 1);
                }
            }
            /*while (arrayPreferiti[i]) {
             if (var_confronto == arrayPreferiti[i]) {
             if (i == ultimo) {
             arrayPreferiti.splice(i, 1);
             arrayNomiPreferiti.splice(i, 1);
             ultimo--;
             } else {
             arrayPreferiti.splice(i, 1);
             arrayNomiPreferiti.splice(i, 1);
             var j = i;
             while (arrayPreferiti[j]) {
             arrayPreferiti[j] = arrayPreferiti[j + 1];
             arrayNomiPreferiti[j] = arrayNomiPreferiti[j + 1];
             j++;
             }
             ultimo--;
             }
             }
             i++;
             }*/
            $(this).children('a i').css("color", "#806a0d");
            $(this).children('a i').removeClass("preferito");
            localStorage["a_preferiti"] = JSON.stringify(arrayPreferiti);
            localStorage["a_n_preferiti"] = JSON.stringify(arrayNomiPreferiti);
        } else {
            /*$( this ).parent().children('button').attr("data-target" , "#castello");*/
            $(this).children('a i').css("color", "blue");
            $(this).children('a i').addClass("preferito");
            arrayPreferiti[ultimo] = $(this).parent().children('button').attr("data-target");
            arrayNomiPreferiti[ultimo] = $(this).parent().children('button').html();
            localStorage["a_preferiti"] = JSON.stringify(arrayPreferiti);
            localStorage["a_n_preferiti"] = JSON.stringify(arrayNomiPreferiti);
        }
    });

    $("#preferiti").on("pageshow", function () {
        var arrayPreferiti = JSON.parse(localStorage["a_preferiti"]);
        var arrayNomiPreferiti = JSON.parse(localStorage["a_n_preferiti"]);
        var i = 0;

        while (arrayPreferiti[i]) {
            var html = '<button type="button" class="btn btn-primary" data-toggle="modal" class="bottone_creato" data-target="' + arrayPreferiti[i] + '" style="width: 100%; color:#806a0d">' + arrayNomiPreferiti[i] + '</button></div>';
            $('#main_preferiti').append(html);
            i++;
        }
    });


    $("#contatta").submit(function () {
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
    });




    var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function () {
        var index = $('.bs-component').index($(this).parent());
        $.get(window.location.href, function (data) {
            var html = $(data).find('.bs-component').eq(index).html();
            html = cleanSource(html);
            $("#source-modal pre").text(html);
            $("#source-modal").modal();
        })

    });
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
    $(".bs-component").hover(function () {
        $(this).append($button);
        $button.show();
    }, function () {
        $button.hide();
    });
    function cleanSource(html) {
        var lines = html.split(/\n/);
        lines.shift();
        lines.splice(-1, 1);
        var indentSize = lines[0].length - lines[0].trim().length,
                re = new RegExp(" {" + indentSize + "}");
        lines = lines.map(function (line) {
            if (line.match(re)) {
                line = line.substring(indentSize);
            }

            return line;
        });
        lines = lines.join("\n");
        return lines;
    }

    $(".icons-material .icon").each(function () {
        $(this).after("<br><br><code>" + $(this).attr("class").replace("icon ", "") + "</code>");
    });
});
