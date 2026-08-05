//-----------------------------------------------------
import swal from 'sweetalert2';
//-----------------------------------------------------
export function useDialog() {
  return {
    message,
    confirm,
    prompt
  }
}

//-----------------------------------------------------
function message(options) {
  let obj = {
    title: "Message", 
    text: "Please enter a text for this alert box.",
    buttonConfirmText: "OK"
  }
  Object.assign(obj, options);
  return swal.fire({ 
    title: obj.title, 
    text: obj.text, 
    confirmButtonText: obj.buttonConfirmText,  
    buttonsStyling: false,
    icon: null
  });
}

//-----------------------------------------------------
async function confirm(options) {
  let obj = {
    title: "Are you sure?", 
    text: "This change is permanent.",
    buttonCancelText: "Cancel",
    buttonCancelCss: "btn-secondary",
    buttonConfirmText: "OK",
    buttonConfirmCss: "btn-primary"
  }
  Object.assign(obj, options);
  return swal.fire({ 
    title: obj.title, 
    text: obj.text,
    showConfirmButton: true,
    confirmButtonText: obj.buttonConfirmText,
    showCancelButton: true,
    cancelButtonText: obj.buttonCancelText,
    buttonsStyling: false,
    customClass: {
      confirmButton: obj.buttonConfirmCss,
      cancelButton: obj.buttonCancelCss,
      actions: 'full-width-buttons'
    },
    reverseButtons: true,
    icon: null
  });
}

//-----------------------------------------------------
async function prompt(options) {
  let obj = {
    buttonCancelText: "Cancel",
    buttonCancelCss: "btn-secondary",
    buttonConfirmText: "OK",
    buttonConfirmCss: "btn-primary"
  }
  Object.assign(obj, options);
  return swal.fire(obj);
}