//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating = false; //flag to prevent quick multi-click glitches

// vo najgoren scope definicija za promenlivite
// setnem vo algoritmo ko ke se preminva na slednio slide mu se zadava vrednosta od poleto
var main_first_name = '';
var main_last_name = '';
var main_phone = '';
var main_address = '';
var main_email = '';
var main_password = '';
var main_twitter = '';
var main_facebook = '';
var main_gplus = '';

// OVA ZA POTSEKJANJE, NE E VO IGRA

// $('.next').click(function () {
//     // ova neka bidi promenliva so ke e tocna se dur ne stani netocna
//     var successful = true;
//     // ce da vidime sea za imejlo so se desava
//     // zemame vrednosta
//     var email = $(this).val();
//     // regex od internet najden testiran ako fajka da sme zivi i zdravi
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
//     // proverka so funkcija za regex na vrednosta od poleto email
//     if (email != '') {
//         if (!re.test(email)) {
//             // ovde pokazva eror za imejlo dena ne e po formato od regexo, mora da go zadovolva
//             $('.error').show();
//             successful = false;
//         }
//     }else{
//         // eror deka nemas nisto vneseno za imejl
//         successful = false
//     }
//     // ovde za pasvordite istite sranja
//     var re_pass = "nekoj soodveten regex"";
//     var password = $(this).val();
//     var password_confirm = $(this).val();
//     if ((password != '') && (password_confirm != '')) {
//         if (re.test(password)) {
//             if (password == password_confirm) {
//                 // ovde realno nisto si prodolzva ili success
//                 $('.msg').hide();
//                 $('.success').show();
//             } else {
//                 // ovde error poraki za razlicni pasvordi
//                 $('.msg').hide();
//                 $('.error').show();
//             }
//         } else {
//             // ovde errori za regex za pasvord, demek treba da vnesi soodveten pass
//         }
//     } else {
//         // ovde ako fali password, mozi nahnadno da se proveri koj fali i na nego da se zatakvoat poraki erorski
//         $('.msg').hide();
//         $('.error').show();
//     }
//
//
//     // na krajo
//     if (successful) {
//         // dom manipulacija na soodvetnite elementi
//         // izbrisi ova forma, dojsija ebeno drugata
//         // i kako sakaks tuka tranzici manzici
//         var main_email = email;
//     }
// });


$("#step_one_next").click(function(){
//triger za da nemozis da kliknis poke od ednas na btno
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    // ova neka bidi promenliva so ke e tocna se dur ne stani netocna
    var successful = true;
    // ce da vidime sea za imeto so se desava
    // zemame vrednosta
    var fname = $('#fname_field').val();
    // proverka dali postoi ime
    if (fname == '') {
        // ovde pokazva eror za ako fali ime
        $('#fname_error').removeClass('hide');
        successful = false;
    }else{
        main_first_name = fname;
        $('#fname_error').addClass('hide');
    }

    var lname = $('#lname_field').val();
    // proverka dali postoi prezime
    if (lname == '') {
        // ovde pokazva eror za ako fali prezime
        $('#lname_error').removeClass('hide');
        successful = false;
    }else{
        main_last_name = lname;
        $('#lname_error').addClass('hide');

    }

    var phone = $('#phone_field').val();
    // regex od internet najden testiran ako fajka da sme zivi i zdravi
    var re_phone = /^\+(?:[0-9]●?){6,14}[0-9]$/;
    // proverka so funkcija za regex na vrednosta od poleto telefon
    if (phone != '') {
        if (!phone.match(re_phone)) {
            // ovde pokazva eror za telefon dena ne e po formato od regexo, mora da go zadovolva
            $('#phone_error_invalid').removeClass('hide');
            successful = false;
        } else {
            main_phone = phone;
            $('#phone_error_invalid').addClass('hide');
        }
        $('#phone_error_empty').addClass('hide');
    }else {
        // eror deka nemas nisto vneseno za telefon
        $('#phone_error_empty').removeClass('hide');
        successful = false
    }

    var address = $('#address_field').val();
    // proverka dali postoi adresa
    if (address == '') {
        // ovde pokazva eror za imejlo dena ne e po formato od regexo, mora da go zadovolva
        $('#address_error').removeClass('hide');
        successful = false;
    }else{
        main_address = address;
        $('#address_error').addClass('hide');
    }

    if (!successful) {
        animating = false;
    } else {
        // OVA CELO E SAMO ZA ANIMACIJA NEMA PROMENI

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }



});


$(".complete").click(function(){
    //skroz na krajo
    return false;
})

