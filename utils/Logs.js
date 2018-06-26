export function getLog(code) {
  switch(code) {
    case 0: return 'Ciclo iniciado';
    case 1: return 'Ciclo finalizado';
    case 2: return 'Garrafa fechada';
    case 3: return 'Sem cerveja no repositório';
    case 4: return 'Sem tampa na garrafa';
    case 5: return 'Botão de emergência acionado';
    case 6: return 'Garrafa envasada';
    default: return 'Código inválido';
  }
}