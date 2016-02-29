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
