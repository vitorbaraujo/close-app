import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt'

TimeAgo.locale(pt);
this.timeAgo = new TimeAgo('pt-BR');

export function humanize(date) {
  return this.timeAgo.format(date)
}

export function formatted(date) {
  return date.format('DD/MM/YY')
}

export function formattedHour(date) {
  return date.format('HH:mm:ss')
}