import moment from 'moment';

export function getDuration({ start_time, end_time }) {
  let start = moment(start_time);
  let end = moment(end_time);
  let diff = end.diff(start, 'minutes');
  let hours = Math.floor(diff / 60);
  let minutes = diff % 60;
  let hourString = hours > 0 ? `${hours} hora${hours !== 1 ? 's' : ''}` : '';
  let minuteString = minutes > 0 ? `${minutes} minuto${minutes !== 1 ? 's' : ''}` : '';
  let result = '0 minutos'
  if (hourString && minuteString) {
    result = `${hourString} e ${minuteString}`
  } else if (hourString) {
    result = `${hourString}`
  } else if (minuteString) {
    result = `${minuteString}`
  }

  return result;
}