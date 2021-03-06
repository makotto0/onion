//jQuery time
var current_fs, next_fs, complete_fs; //fieldsets
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

// var main_countries = getCountriesAjax();
//
// // variables
// var countries_input = document.getElementById('autocomplete-input');
// var results;
//
// // functions
// function autocomplete(val) {
//     var countries_return = [];
//
//     for (i = 0; i < main_countries.length; i++) {
//         if (val === main_countries[i].slice(0, val.length)) {
//             countries_return.push(main_countries[i]);
//         }
//     }
//
//     return countries_return;
// }
//
// // events
// countries_input.onkeyup = function(e) {
//     input_val = this.value; // updates the variable on each ocurrence
//
//     if (input_val.length > 0) {
//         var countries_to_show = [];
//
//         autocomplete_results = document.getElementById("autocomplete-results");
//         autocomplete_results.innerHTML = '';
//         countries_to_show = autocomplete(input_val);
//
//         for (i = 0; i < countries_to_show.length; i++) {
//             autocomplete_results.innerHTML += '<li>' + countries_to_show[i] + '</li>';
//
//         }
//         autocomplete_results.style.display = 'block';
//     } else {
//         countries_to_show = [];
//         autocomplete_results.innerHTML = '';
//     }
// };


$("#step_one_next").click(function(){
    // console.log(main_countries);
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
                    // scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    left = (now * 50)+"%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    // current_fs.css({'transform': 'scale('+scale+')'});
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

$("#step_two_complete").click(function(){
    var successful = true;

    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();

    var email = $('#email_field').val();
    var re_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != '') {
        if (!email.match(re_email)){
            $('#email_error_invalid').removeClass('hide');
            successful = false;
        } else {
            main_email = email;
            $('#email_error_invalid').addClass('hide');
        }
        $('#email_error_empty').addClass('hide');
    } else {
        $('#email_error_empty').removeClass('hide');
        successful = false;
    }

    var password = $('#password_field').val();
    var re_password = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (password == '') {
        if (!password.match(re_password)) {
            $('#password_error').removeClass('hide');
            successful = false;
        }
    }

    var confirm_password = $('#confirm_password_field').val();

    if (confirm_password != password) {
        $('#confirm_password_error').removeClass('hide') ;
        successful = false;
    } else {
        main_password = password;
    }

    if (successful) {
        $('.user_first_name').append( main_first_name );
        $('.user_last_name').append( main_last_name );
        $('.user_phone').append( main_phone );
        $('.user_address').append( main_address );
        $('.user_email').append( main_email );
        $('.user_password').append( main_password );

        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal();
        })
    }

    $('#close_button').click(function(){
        current_fs = $("#step_two_complete").parent();
        next_fs = $("#step_one_next").parent();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                // scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                // current_fs.css({'transform': 'scale('+scale+')'});
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
        // $('#step_two_complete').hide("slow");
        // $('#step_one_next').show("slow");
    })
});


function getCountriesAjax() {
    var countries = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.eu/rest/v1/all');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var countries_json = $.parseJSON(xhr.responseText);
            $.each(countries_json, function (index, value) {
                $.each(value, function (index, value) {
                    if (index == "name") {
                        countries.push(value);
                    }
                });
            });
            console.log(countries);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

    return countries;
}