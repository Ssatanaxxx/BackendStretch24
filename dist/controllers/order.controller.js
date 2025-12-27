"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const orders_1 = __importDefault(require("../data/orders"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Функция для логирования в файл
const logOrder = (order) => {
    const logDir = path_1.default.join(__dirname, '../../logs');
    const logFile = path_1.default.join(logDir, 'orders.log');
    // Создаём директорию если её нет
    if (!fs_1.default.existsSync(logDir)) {
        fs_1.default.mkdirSync(logDir, { recursive: true });
    }
    const logEntry = `[${new Date().toISOString()}] Новая заявка #${order.id}
  Имя: ${order.name}
  Телефон: ${order.phone}
  ${order.email ? `Email: ${order.email}` : ''}
  Сумма: ${order.calculationData.totalPrice} KZT
  Тип потолка: ${order.calculationData.breakdown.base.service}
  Площадь: ${order.calculationData.breakdown.base.area} м²
  Комментарий: ${order.comment || 'нет'}
  ==========================================\n`;
    fs_1.default.appendFileSync(logFile, logEntry, 'utf8');
};
const createOrder = (req, res) => {
    try {
        const { name, phone, calculationData, email, comment } = req.body;
        // Базовая валидация
        if (!name || !phone || !calculationData) {
            return res.status(400).json({
                success: false,
                error: "Необходимы имя, телефон и данные расчёта"
            });
        }
        // Валидация телефона (простая)
        const phoneRegex = /^[+]?[0-9\s\-()]+$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                error: "Некорректный номер телефона"
            });
        }
        // Создаём заявку
        const order = {
            id: Date.now(),
            name,
            phone,
            email,
            calculationData,
            comment,
            createdAt: new Date().toISOString(),
            status: 'new'
        };
        // Сохраняем в память
        orders_1.default.push(order);
        // Логируем в файл
        logOrder(order);
        // Выводим в консоль для отладки
        console.log('\n📋 НОВАЯ ЗАЯВКА 📋');
        console.log(`ID: ${order.id}`);
        console.log(`Имя: ${order.name}`);
        console.log(`Телефон: ${order.phone}`);
        console.log(`Сумма: ${order.calculationData.totalPrice} KZT`);
        console.log(`Тип: ${order.calculationData.breakdown.base.service}`);
        console.log(`Дата: ${new Date().toLocaleString('ru-RU')}`);
        console.log('=============================\n');
        return res.json({
            success: true,
            data: {
                orderId: order.id,
                name: order.name,
                phone: order.phone,
                total: order.calculationData.totalPrice,
                estimatedWait: "30 минут"
            },
            message: "Заявка успешно создана! Мы свяжемся с вами в течение 30 минут.",
            contactInfo: {
                phone: "+7 747 044 28 96",
                whatsapp: "https://wa.me/77470442896",
                telegram: "https://t.me/+77470442896"
            }
        });
    }
    catch (error) {
        console.error("Order creation error:", error);
        return res.status(500).json({
            success: false,
            error: "Внутренняя ошибка сервера"
        });
    }
};
exports.createOrder = createOrder;
// Дополнительно: эндпоинт для просмотра заявок (только для отладки)
const getOrders = (req, res) => {
    const debugKey = req.query.debugKey;
    if (debugKey !== process.env.DEBUG_KEY) {
        return res.status(403).json({
            success: false,
            error: "Доступ запрещён"
        });
    }
    res.json({
        success: true,
        count: orders_1.default.length,
        orders: orders_1.default
    });
};
exports.getOrders = getOrders;
//# sourceMappingURL=order.controller.js.map