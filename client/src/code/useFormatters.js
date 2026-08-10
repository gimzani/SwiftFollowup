export function useFormatters() {
  return {
    clearSpecialCharacters,
    formatDate,
    formatCurrency,
    formatPhone
  }
}

//-------------------------------------------------------
export function formatDate(date, format, military=false) {

  // append with UTC flag
  if(typeof date === 'string' && date[date.length-1] !== 'Z') {
    date += 'Z';
  }

  // full signature: 'MM/dd/yyyy hh:mm:ss a';
  format = format || 'MM/dd/yyyy hh:mm a';

  if(!date) { return null; }

  date = new Date(date);

  let dp = {  // date parts
    year: date.getFullYear(),
    month: (date.getMonth()+1),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }

  // transform what is available
  format = format.replace('MM', dp.month.toString().padStart(2, '0'));
  format = format.replace('dd', dp.day.toString().padStart(2, '0'));
  format = format.replace('yyyy', dp.year.toString());

  //transform hours if not military time 
  if(military) {
    format = format.replace('a','');
  } else {
    if(dp.hour>=12) {
      dp.hour -= 12;
      if(dp.hour<1) {
        dp.hour = 12;
      }
      format = format.replace('a','PM');
    } else {
      format = format.replace('a','AM');
    }
    format = format.replace('hh', dp.hour.toString().padStart(2,'0'));
  }

  format = format.replace('mm', dp.minute.toString().padStart(2,'0'));
  format = format.replace('ss', dp.second.toString().padStart(2,'0'));

  return format;

}
//-------------------------------------------------------
export function formatCurrency(value, sign="$") {
  if (value == null || value === '') return '';
  let num = Number(value);
  if (isNaN(num)) return value;
  return `${sign}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

//-------------------------------------------------------
export function clearSpecialCharacters(value) {
  value = value.replace(/[\(\)-\.,\|#\$%\^&!@\*~\s]+/gm, '');
  return value;
}
//-------------------------------------------------------
export function formatPhone(value) {
  if (value != "" && value != undefined && value != null) {
    //---------------------------------------------- filter specials
    value = value.replace(/[\(\)-\.,\|#\$%\^&!@\*~\s]+/gm, '');
    //----------------------------------------------
    let areaCode = value.substring(0, 3);
    let prefix = value.substring(3, 6);
    let suffix = value.substring(6, 10);
    //----------------------------------------------
    return `(${areaCode}) ${prefix}-${suffix}`;
    //----------------------------------------------
  }
  return value;
}