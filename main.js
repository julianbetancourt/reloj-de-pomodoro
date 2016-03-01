var corriendo = false;
var transcurrido = 0; //ms
var transcurridoSesion = 0; //ms
var minuto = 60 * 100; //ms
var duracionTrabajo = 1 * minuto; //ms
var duracionBreak = 5 * minuto; //ms
var estadoActual = true; //true = trabajo, false = break
var sesionesCompletas = 0;
var tiempoInicio;
var relojID;
var inicioTrabajo = new Audio('http://oringz.com/ringtone/communication-channel/sounds-917-communication-channel/?download');
var finalTrabajo = new Audio('http://oringz.com/ringtone/hold-your-horses/sounds-999-hold-your-horses/?download');

Notification.requestPermission();

var obtenerDuracion = function (estadoActual) {
  //si estadoActual es trabajo
  if (estadoActual) {
    return duracionTrabajo;
  } else { // si no
    return duracionBreak;
  }
}

var obtenerEstado = function (estadoActual, corriendo) {
  var output = "";

  //si estadoActual = true (trabajo)
  if (estadoActual) {
    output = 'Trabajando';
  } else { //si estadoActual = false(break)
    output = 'En break';
  }
  //si corriendo = false
  if (!corriendo) {
    ouput = 'Pausado';
  }
  return output;
}

function obtenerNotificacion(cuerpo, icono, titulo) {
  var options = {
    body: cuerpo,
    icon: icono
  }
  var n = new Notification(titulo, options);
}

function msATiempo(duracion) {
  var milisegundos = parseInt((duracion % 1000) / 100);
  var segundos = parseInt((duracion / 1000) % 60);
  var minutos = parseInt((duracion / (1000 * 60)) % 60);
  var horas = parseInt((duracion / (1000 * 60 * 60)) % 24);

  horas = (horas < 10) ? "0" + horas: horas;
  minutos = (minutos < 10) ? "0" + minutos: minutos;
  segundos = (segundos < 10) ? "0" + segundos: segundos;

  return minutos + ":" + segundos;
}

$('.estado').text(obtenerEstado(estadoActual, corriendo));
$('#tiempo').text(msATiempo(obtenerDuracion(estadoActual)));
$('.break-m').text(msATiempo(duracionBreak));

var actualizarReloj = function () {
  var final = Date.now();

  //transcurrido en ms desde clic en play, si pause es presionado, se reinicia
  transcurrido = final - tiempoInicio;

  //transcurrido en ms desde clic en play, no se reinicia cuando pause es presionado
  var totalTranscurrido = transcurridoSesion + transcurrido;

  //ms de duracionTrabajo o duracionBreak inicial ej: 1500000ms(25min)
  var duracionActual = obtenerDuracion(estadoActual);

  //si totalTranscurrido (ms) es mayor al reloj inicial (se acaba tiempo)
  if (totalTranscurrido > duracionActual) {
      //si estadoActual es break
      if (!estadoActual) {
        inicioTrabajo.play(); //Sonido inicio
      } else {
        finalTrabajo.play(); //Sonido fin
      }

    //si estadoActual es trabajo
    if (estadoActual) {
      sesionesCompletas++; //incrementar sesiones completas
      $('.completado').text(sesionesCompletas);
    }

    //Cambiar de estado
    estadoActual = !estadoActual;

    transcurridoSesion = 0;
    tiempoInicio = Date.now(); //reiniciar tiempoInicio

    var notificar = obtenerEstado(estadoActual, corriendo);

    obtenerNotificacion('Reloj de Pomodoro', 'http://www.free-icons-download.net/images/tomato-icon-61411.png', notificar); //Notificar

  }
  $('#tiempo').text(msATiempo(duracionActual - totalTranscurrido));
  $('.estado').text(obtenerEstado(estadoActual, corriendo));
  //console.log(transcurrido);
};

//Cuando se presiona .play
$('.play').click(function () {
  //si corriendo = false
  if (!corriendo) {
    inicioTrabajo.play(); //Sonido inicio
    corriendo = true;
    tiempoInicio = Date.now();
    relojID = setInterval(actualizarReloj, 13); //Inicio de reloj
    $('.play').removeClass('ion-ios-play-outline').addClass('ion-ios-pause-outline'); //cambio de play a pause
  } else { // si corriendo = true
    corriendo = false;
    transcurridoSesion += transcurrido;
    clearInterval(relojID); //Detener reloj
    $('.estado').text('Pausado'); //
    $('.play').removeClass('ion-ios-pause-outline').addClass('ion-ios-play-outline'); //cambio de pause a play
  }
});

//cuando se presiona .reset
$('.reset').click(function () {
  $('.play').removeClass('ion-ios-pause-outline').addClass('ion-ios-play-outline'); //cambio de pause a play
  clearInterval(relojID); //detener reloj
  corriendo = false;
  transcurridoSesion = 0;
  estadoActual = true; //estadoActual = trabajo
  $('#tiempo').text(msATiempo(obtenerDuracion(estadoActual)));
  $('.estado').text(obtenerEstado(estadoActual, corriendo));
});

$('.mas-cr').click(function () {
  duracionTrabajo += minuto; //incrementar duracionTrabajo por un minuto
  $('#tiempo').text(msATiempo(duracionTrabajo)); //reflejar cambio
});

$('.menos-cr').click(function () {
  duracionTrabajo -= minuto; //disminuir duracionTrabajo por un minuto
  if (duracionTrabajo < 1) {
    duracionTrabajo = minuto;
  }
  $('#tiempo').text(msATiempo(duracionTrabajo)); //reflejar cambio
});
