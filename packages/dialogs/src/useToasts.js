
import Toastify from 'toastify-js'

export function useToasts() {

  const config = null;  //todo: Make this configable

  return {
    info,
    success,
    warning,
    danger,
    error
  }
}

function info(text) {
  doToast(text, {
    background: '#7c7cd6',
    color: '#fff'
  });
}

function success(text) {
  doToast(text, {
    background: '#3ca44f',
    color: '#fff'
  });
}

function warning(text) {
  doToast(text, {
    background: '#ceaf00',
    color: '#fff'
  });
}

function danger(text) {
  doToast(text, {
    background: '#a51f1f',
    color: '#fff'
  });
}

function error(text) {
  danger(text);
}

function doToast(text, style) {
  Toastify({
    text: text,
    duration: 3000, 
    close: true,
    gravity: "bottom", 
    position: "right",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: style,
  }).showToast();
}