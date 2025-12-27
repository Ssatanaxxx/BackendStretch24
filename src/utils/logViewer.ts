import fs from 'fs';
import path from 'path';
import orders from '../data/orders';

export const viewOrdersLog = () => {
  const logFile = path.join(__dirname, '../../logs/orders.log');
  
  if (fs.existsSync(logFile)) {
    const content = fs.readFileSync(logFile, 'utf8');
    console.log('📋 ЛОГ ЗАЯВОК 📋');
    console.log(content);
  } else {
    console.log('Лог файл не найден');
  }
};

export const getStats = () => {
  console.log('\n📊 СТАТИСТИКА 📊');
  console.log(`Всего заявок: ${orders.length}`);
  console.log(`Новых: ${orders.filter(o => o.status === 'new').length}`);
  console.log(`Общая сумма: ${orders.reduce((sum, o) => sum + o.calculationData.totalPrice, 0)} KZT`);
};

// Запуск из командной строки
if (require.main === module) {
  const command = process.argv[2];
  
  switch(command) {
    case 'logs':
      viewOrdersLog();
      break;
    case 'stats':
      getStats();
      break;
    case 'orders':
      console.log('📋 СПИСОК ЗАЯВОК:');
      console.log(orders);
      break;
    default:
      console.log('Доступные команды:');
      console.log('  npm run utils -- logs    - просмотр логов');
      console.log('  npm run utils -- stats   - статистика');
      console.log('  npm run utils -- orders  - список заявок');
  }
}