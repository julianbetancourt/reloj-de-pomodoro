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
