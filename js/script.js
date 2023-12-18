if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  let deferredPrompt;

 

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired: '+e);
    e.preventDefault();
    deferredPrompt = e;
    
    showInstallPromotion();
  });

  function showInstallPromotion() {
    console.log('Ok installation');
    $('.install').show();
  }


$( document ).ready(function() {

function loadmeteo(city){

    var key = '00350e6bc87e4098b11141303232811';

    $.ajax({
        url: 'https://api.weatherapi.com/v1/forecast.json?key=' + key + '&q=' + city + '&days=7&aqi=no&alerts=no&lang=fr',
        method: 'GET',
        dataType: 'json',
        success: function(data) {

        // DECLA
            
            console.log(data);
            var temp = data.current.temp_c
            var hum = data.current.humidity
            var wind = data.current.wind_kph
            var ville = data.location.name
            var pays = data.location.country
            var date = data.forecast.forecastday.date
            var heure = data.location.localtime
            var conditionmeteo = data.current.condition.text.toLowerCase()

        // FIN DECLA


        // IMAGE EXTRACTION NBRE

            function extractNumberFromImg(img) {
                // Utilisation d'une expression régulière pour extraire le nombre
                var match = img.match(/\/(\d+)\.png$/);
               
                // Si une correspondance est trouvée, renvoyer le nombre, sinon renvoyer null
                return match ? parseInt(match[1], 10) : null;
            }
           
            var img = data.current.condition.icon ;
            var extractedNumber = extractNumberFromImg(img);

        // FIN EXTRACTION NBRE



        // SECTION 2 / aujourd'hui / date, heure, vent, humidité, icone, temperature, ville, pays

            $('.paysville').html('<p class="text-m m-0 leading-10">' + ville + ',</p> ' + pays)
            $('.dateheure').html(heure)
            $('.condition').html(wind + 'km/h <br> ' + hum + '%')
            $('.icone').html('<img src="img/'+data.current.is_day+'/SVG/'+extractedNumber+'@2x.svg" class="w-50 ">')
            $('.temperature').html(temp +'°C')

            console.log(conditionmeteo)

        // FIN SECTION 2


        // SECTION 3 / autrejours / icone, jour, temp

            var day = data.forecast.forecastday;

        for (var i = 0; i < day.length; i++) {
            var date = day[i].date;
            var maxtemp = day[i].day.maxtemp_c;
            var imgday = day[i].day.condition.icon;
            var extractedNumber = extractNumberFromImg(imgday);

            console.log('Image URL:', imgday);
            console.log('Extracted Number:', extractedNumber);

            // Convertir la date en objet Date
            var currentDate = new Date(date);

            // Obtenir le jour de la semaine sous forme de chaîne
            var daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            var dayOfWeek = daysOfWeek[currentDate.getDay()];

            // Créer un élément article pour chaque jour
            var article = $('<article class="demain border-b border-solid flex pl-3 pr-3  items-center overflow-hidden h-11">');

            // Ajouter le contenu spécifique à chaque jour à l'article
            article.append('<div class="icone w-2/12"><img src="img/'+data.current.is_day+'/SVG/'+extractedNumber+'@2x.svg" class="w-full h-full  "></div>');
            article.append('<div class="jour w-10/12 pl-1">' + dayOfWeek + '</div>');
            article.append('<div class="temp w-1/12">' + maxtemp + '°C</div>');

            // Ajouter l'article à la section .autrejours
        
            $('.autrejours').append(article);

        // FIN SECTION 3

        // CHANGEMENT BACKGROUND

            function changeBackgroundBasedOnTime(localTime) {

            // geolocalisation

                // Convertir la chaîne de l'heure locale en objet Date
                var currentTime = new Date(localTime);
                // Extraire l'heure de l'objet Date
                var currentHour = currentTime.getHours();

                // Vérifier si l'heure est entre 18h et 6h (18 inclus à 6 exclus)
                if (currentHour > 6 && currentHour < 18) {
                    // Changer le background-image
                    
                    
                    $('.bg').css('background-size', 'cover'); 
                    $('.bg').removeClass('opacity-50');
                    $('.bg').addClass('opacity-55');
                    $('body').removeClass('bg-black text-beige color-beige')
                    $('body').addClass('bg-beige text-black color-black')
                    $('.r_city').removeClass('placeholder-beige')
                    $('.r_city').addClass('placeholder-black')
                    $('.champsrecherche').removeClass('border-beige')
                    $('.champsrecherche').addClass('border-black')
                    $('.demain').removeClass('border-beige')
                    $('.demain').addClass('border-black')
                    $('.install').removeClass('border-beige border-solid border-1')
                    $('#search').html('<img src="/img/arrow1.svg" alt="" class="arrow w-5">')


                    if( conditionmeteo.includes('soleil')){
                      $('.bg').css('background-image', 'url("/img/jour.svg")');
                    }
                    else{
                      if(conditionmeteo.includes('pluie')){
                        $('.bg').css('background-image', 'url("/img/pluie.svg")');
                      }
                      else{
                        $('.bg').css('background-image', 'url("/img/nuage.svg")');
                      }
                    }
                    
                } else {
                    $('.bg').css('background-image', 'url("/img/nuit.svg")');
                    $('.bg').css('background-size', 'cover');
                    $('.bg').removeClass('opacity-55');
                    $('.bg').addClass('opacity-50');
                    $('body').removeClass('bg-beige text-black color-black')
                    $('body').addClass('bg-black text-beige color-beige')
                    $('.r_city').removeClass('placeholder-black')
                    $('.r_city').addClass('placeholder-beige')
                    $('.champsrecherche').removeClass('border-black')
                    $('.champsrecherche').addClass('border-beige')
                    $('.demain').removeClass('border-black')
                    $('.demain').addClass('border-beige')
                    $('.install').addClass('border-beige border-solid border-2')
                    $('#search').html('<img src="/img/arrow0.svg" alt="" class="arrow w-5">')


                }
            }

          // recherche loc

            // Utiliser la fonction avec votre heure locale provenant de l'API
            var localTimeFromAPI = data.location.localtime;  // Remplacez cela par la valeur réelle provenant de votre API
            changeBackgroundBasedOnTime(localTimeFromAPI);

        // FIN CHANGEMENT BACKGROUND
}
        
        } //fin succss
    });//fin ajax

}

// geoloc

if ("geolocation" in navigator) {
   
    navigator.geolocation.getCurrentPosition(function (position) {
        // Extract latitude and longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var city = latitude + ',' + longitude;


        loadmeteo(city);

        // You can now use these values in your application
    });
} else {
    // Geolocation is not supported by the browser
    console.log("Geolocation is not supported by this browser.");
}

// loc recherche

$('#search').click(function() {
    var city = $('#r_city').val();
    loadmeteo(city);
    $('.autrejours').empty();
});

// btn install

$('.install').click(function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
});



 });//ready