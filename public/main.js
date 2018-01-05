$(function () {
  var speakerDevices = document.getElementById('speaker-devices');
  var ringtoneDevices = document.getElementById('ringtone-devices');
  var outputVolumeBar = document.getElementById('output-volume');
  var inputVolumeBar = document.getElementById('input-volume');
  var volumeIndicators = document.getElementById('volume-indicators');

  log('requesting...');
  $.getJSON('/token')
    .done(function (data) {
      log('connected...');
      console.log('Token: ' + data.token);

      // Setup Twilio.Device
      Twilio.Device.setup(data.token);

      Twilio.Device.ready(function (device) {
        log('woof!');
        $('#call-controls').show();
      });

      Twilio.Device.error(function (error) {
        log('Twilio.Device Error: ' + error.message);
      });

      Twilio.Device.connect(function (conn) {
        log('call established...');
        volumeIndicators.style.display = 'block';
        bindVolumeIndicators(conn);
      });

      Twilio.Device.disconnect(function (conn) {
        log('hung up!');

        volumeIndicators.style.display = 'none';
      });

      Twilio.Device.incoming(function (conn) {
        log('Incoming connection from ' + conn.parameters.From);
        var archEnemyPhoneNumber = '+12099517118';

        if (conn.parameters.From === archEnemyPhoneNumber) {
          conn.reject();
          log('It\'s your nemesis. Rejected call.');
        } else {
          // accept the incoming connection and start two-way audio
          conn.accept();
        }
      });

      setClientNameUI(data.identity);

      // Show audio selection UI if it is supported by the browser.
      if (Twilio.Device.audio.isSelectionSupported) {
        document.getElementById('output-selection').style.display = 'block';
      }
    })

    .fail(function () {
      log('Could not get a token from server!');
    });

  // Bind button to make call
  document.getElementById('button-call').onclick = function () {
    // get the phone number to connect the call to
    var params = {
      To: document.getElementById('phone-number').value
    };

    $( "#button-call" ).toggleClass('live');
    if ($( "#button-call" ).hasClass( "live" )) {
      console.log('Calling ' + params.To + '...');
      Twilio.Device.connect(params);
    }
    else {
      log('Hanging up...');
      Twilio.Device.disconnectAll();
    }
  };

  function bindVolumeIndicators(connection) {
    connection.volume(function(inputVolume, outputVolume) {
      var inputColor = 'red';
      if (inputVolume < .50) {
        inputColor = 'green';
      } else if (inputVolume < .75) {
        inputColor = 'yellow';
      }

      inputVolumeBar.style.width = Math.floor(inputVolume * 300) + 'px';
      inputVolumeBar.style.background = inputColor;

      var outputColor = 'red';
      if (outputVolume < .50) {
        outputColor = 'green';
      } else if (outputVolume < .75) {
        outputColor = 'yellow';
      }

      outputVolumeBar.style.width = Math.floor(outputVolume * 300) + 'px';
      outputVolumeBar.style.background = outputColor;
    });
  }

});


// Activity log
function log(message) {
  var logDiv = document.getElementById('log');
  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Set the client name in the UI
function setClientNameUI(clientName) {
  console.log(clientName);
}

$(function () {
  $('.dtmf-interface li').click(function () {
    var number = $(this).text();
    var input = $( "#phone-number" );
    input.val(input.val() + number);
  });
});


/* Delete Key */

$('.del').click(function () {
    var el = $("input#phone-number");
    var the_value = el.val();
    the_value = the_value.substring(0, the_value.length - 1);
    el.val(the_value);
});

/* keypress */

$(document).keypress(function (e) {
    if (e.which == 48) {
      $('.zero').mousedown();
      $('.zero').click();
      setTimeout(function(){
           $('.zero').mouseup();
       }, 100)

    };
  });

$(document).keypress(function (e) {
    if (e.which == 49) {
      $('.one').mousedown();
      $('.one').click();
      setTimeout(function(){
           $('.one').mouseup();
       }, 100)

    };
  });

  $(document).keypress(function (e) {
      if (e.which == 50) {
        $('.two').mousedown();
        $('.two').click();
        setTimeout(function(){
             $('.two').mouseup();
         }, 100)

      };
    });

    $(document).keypress(function (e) {
        if (e.which == 51) {
          $('.three').mousedown();
          $('.three').click();
          setTimeout(function(){
               $('.three').mouseup();
           }, 100)

        };
      });

      $(document).keypress(function (e) {
          if (e.which == 52) {
            $('.four').mousedown();
            $('.four').click();
            setTimeout(function(){
                 $('.four').mouseup();
             }, 100)

          };
        });

        $(document).keypress(function (e) {
            if (e.which == 53) {
              $('.five').mousedown();
              $('.five').click();
              setTimeout(function(){
                   $('.five').mouseup();
               }, 100)

            };
          });

          $(document).keypress(function (e) {
              if (e.which == 54) {
                $('.six').mousedown();
                $('.six').click();
                setTimeout(function(){
                     $('.six').mouseup();
                 }, 100)

              };
            });

            $(document).keypress(function (e) {
                if (e.which == 55) {
                  $('.seven').mousedown();
                  $('.seven').click();
                  setTimeout(function(){
                       $('.seven').mouseup();
                   }, 100)

                };
              });

              $(document).keypress(function (e) {
                  if (e.which == 56) {
                    $('.eight').mousedown();
                    $('.eight').click();
                    setTimeout(function(){
                         $('.eight').mouseup();
                     }, 100)

                  };
                });

                $(document).keypress(function (e) {
                    if (e.which == 57) {
                      $('.nine').mousedown();
                      $('.nine').click();
                      setTimeout(function(){
                           $('.nine').mouseup();
                       }, 100)

                    };
                  });
