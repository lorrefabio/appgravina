$(function () {
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
                    arrayPreferiti[0] = $(this).parent().children('button').attr("data-target");
                    arrayNomiPreferiti[0] = $(this).parent().children('button').html();
                    localStorage["a_preferiti"] = JSON.stringify(arrayPreferiti);
                    localStorage["a_n_preferiti"] = JSON.stringify(arrayNomiPreferiti);
                    if ($(this).children('a i').hasClass("preferito")) {
                        $(this).children('a i').css("color", "black");
                        $(this).children('a i').removeClass("preferito");
                    } else {
                        /*$( this ).parent().children('button').attr("data-target" , "#castello");*/
                        $(this).children('a i').css("color", "blue");
                        $(this).children('a i').addClass("preferito");
                    }
                });
        
                $("#preferiti").on("pageshow", function () {
                    var arrayPreferiti = JSON.parse(localStorage["a_preferiti"]);
                    var arrayNomiPreferiti = JSON.parse(localStorage["a_n_preferiti"]);
                    var html = '<button type="button" class="btn btn-primary" data-toggle="modal" class="bottone_creato" data-target="' + arrayPreferiti[0] + '" style="width: 100%;">' + arrayNomiPreferiti[0] + '</button></div>';
                    
                    $('#main_preferiti').append(html);
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
            })();
