$(document).ready(function () {

    //Kartice
    var karticeDOM = $('#slike');
    var kartice = [];

    function karticeToHtml() {
        kartice.forEach(function (kartica, i) {

            var brojVidljivihSlikauGaleriji = 11;

            var karticaTemplate = `
                    ${
                        Object.keys(kartica.slike).map(i => (
                            `<a ${i > brojVidljivihSlikauGaleriji ? `style="display:none"` : ``} href="./Slike/${kartica.slike[i].velika}" data-lightbox="galerija-${kartica.redniBroj}"><img src="./Slike/${kartica.slike[i].mala}" alt="${kartica.slike[i].alt ? kartica.slike[i].alt : kartica.slike[i].velika}" /></a>`
                        )).join("")
                     }
            `;


            karticeDOM.append(karticaTemplate);

        });


    }

    function jsonToKartice(karticeArray) {
        // Sortiranje po rednom broju
        karticeArray.sort(function (a, b) {
            return a - b
        });
        kartice = karticeArray;
        karticeToHtml();
    }



    // AJAX
    $.ajax({
        type: 'GET',
        url: './podesavanja/konfiguracija.json',
        dataType: 'json',
        success: function (data) {

            //Kartice
            jsonToKartice(data.kartice);
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