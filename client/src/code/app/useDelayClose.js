//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
export function useDelayClose(callback, delay=1000) {
  const timeout = ref(false);
  //----------------------------------------------------
  function startClose() {
    timeout.value = setTimeout(() => {
      callback();
    }, delay);
  }
  //----------------------------------------------------
  function cancelClose() {
    clearTimeout(timeout.value);
  }
  //----------------------------------------------------
  return {
    startClose,
    cancelClose
  }
}