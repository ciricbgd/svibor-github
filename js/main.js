$(document).ready(function () {

    //Language setting
    var lang = $('html').prop('lang');
    if(lang=="en"){lang="eng"}else{lang="srb"};

    //JSON to HTML
    var naslov = $('[data-input="naslov"]');
    var podnaslov = $('[data-input="podnaslov"]');
    var dugme = $('[data-input="dugme"]');
    var galerijanaslov = $('[data-input="galerijanaslov"]');
    var drustvenemreze = $('[data-input="drustvenemreze"]');
    var adresa = $('[data-input="adresa"]');
    var rezervacija = $('[data-input="rezervacija"]');
    var telefon = $('[data-input="telefon"]');




    var galerijaDOM = $('#slike');
    var karticeDOM = $('#cards');
    var kartice = [];
    var galerija = [];

    function jsonToHtml(j){
       naslov.html(j.naslov[lang]);
       podnaslov.html(j.podnaslov[lang]);
       dugme.html(j.dugme[lang]);
       galerijanaslov.html(j.galerijanaslov[lang]);
       drustvenemreze.html(j.drustvenemreze[lang]);
       adresa.html(j.adresa[lang]);
       rezervacija.html(j.rezervacija[lang]);
       telefon.html(j.telefon);
    }

    function galerijaToHtml() {
        galerija.forEach(function (kartica, i) {

            var brojVidljivihSlikauGaleriji = 11;

            var galerijaTemplate = `
                    ${
                        Object.keys(kartica.slike).map(i => (
                            `<a ${i > brojVidljivihSlikauGaleriji ? `style="display:none"` : ``} href="./Slike/${kartica.slike[i].velika}" data-lightbox="galerija-${kartica.redniBroj}"><img src="./Slike/${kartica.slike[i].mala}" alt="${kartica.slike[i].alt ? kartica.slike[i].alt : kartica.slike[i].velika}" /></a>`
                        )).join("")
                     }
            `;


            galerijaDOM.append(galerijaTemplate);

        });


    }



    function jsonToKartice(kartice){
        kartice.forEach(function (kartica, i) {

            var karticaTemplate = `
                    ${
                        Object.keys(kartica).map(i => (
                            `
                            <div class="card">
                                <div class="cardText">
                                    <p>${kartica.tekst[lang]}</p>
                                </div>
                                <div class="cardImage">
                                    <img src="./Slike/${kartica.slika.putanja}" alt="${kartica.slika.alt? "":kartica.slika.alt }" width="100%">
                                </div>
                            </div>
                            `
                        )).join("")
                     }
            `;


            karticeDOM.append(karticaTemplate);

        });
    }


    function jsonTogalerija(galerijaArray) {
        // Sortiranje po rednom broju
        galerijaArray.sort(function (a, b) {
            return a - b
        });
        galerija = galerijaArray;
        galerijaToHtml();
    }



    // AJAX
    $.ajax({
        type: 'GET',
        url: './podesavanja/konfiguracija.json',
        dataType: 'json',
        success: function (data) {

            //galerija
            jsonToHtml(data);
            jsonToKartice(data.kartice);
            jsonTogalerija(data.galerija);
        }
    });


    $('.destination').hover(function () {
        expandDestination(this)
    });


    function expandDestination(destination) {
        var img = $(destination).find('img')[0];
        $(destination).css({
            'width': '0'
        });
        $(img).css({
            'display': 'block'
        });
        $(img).animate({
            width: '300px'
        });
    }

});