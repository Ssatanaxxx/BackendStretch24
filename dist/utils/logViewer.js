"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.viewOrdersLog = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const orders_1 = __importDefault(require("../data/orders"));
const viewOrdersLog = () => {
    const logFile = path_1.default.join(__dirname, '../../logs/orders.log');
    if (fs_1.default.existsSync(logFile)) {
        const content = fs_1.default.readFileSync(logFile, 'utf8');
        console.log('📋 ЛОГ ЗАЯВОК 📋');
        console.log(content);
    }
    else {
        console.log('Лог файл не найден');
    }
};
exports.viewOrdersLog = viewOrdersLog;
const getStats = () => {
    console.log('\n📊 СТАТИСТИКА 📊');
    console.log(`Всего заявок: ${orders_1.default.length}`);
    console.log(`Новых: ${orders_1.default.filter(o => o.status === 'new').length}`);
    console.log(`Общая сумма: ${orders_1.default.reduce((sum, o) => sum + o.calculationData.totalPrice, 0)} KZT`);
};
exports.getStats = getStats;
// Запуск из командной строки
if (require.main === module) {
    const command = process.argv[2];
    switch (command) {
        case 'logs':
            (0, exports.viewOrdersLog)();
            break;
        case 'stats':
            (0, exports.getStats)();
            break;
        case 'orders':
            console.log('📋 СПИСОК ЗАЯВОК:');
            console.log(orders_1.default);
            break;
        default:
            console.log('Доступные команды:');
            console.log('  npm run utils -- logs    - просмотр логов');
            console.log('  npm run utils -- stats   - статистика');
            console.log('  npm run utils -- orders  - список заявок');
    }
}
//# sourceMappingURL=logViewer.js.map