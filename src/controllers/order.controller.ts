import { Request, Response } from "express";
import orders, { Order } from "../data/orders";
import fs from "fs";
import path from "path";

interface OrderRequest {
  name: string;
  phone: string;
  email?: string;
  calculationData: any;
  comment?: string;
}

// Функция для логирования в файл
const logOrder = (order: Order) => {
  const logDir = path.join(__dirname, '../../logs');
  const logFile = path.join(logDir, 'orders.log');
  
  // Создаём директорию если её нет
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
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
  
  fs.appendFileSync(logFile, logEntry, 'utf8');
};

export const createOrder = (req: Request<{}, {}, OrderRequest>, res: Response) => {
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
    const order: Order = {
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
    orders.push(order);
    
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

  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Внутренняя ошибка сервера" 
    });
  }
};

// Дополнительно: эндпоинт для просмотра заявок (только для отладки)
export const getOrders = (req: Request, res: Response) => {
  const debugKey = req.query.debugKey;
  
  if (debugKey !== process.env.DEBUG_KEY) {
    return res.status(403).json({ 
      success: false,
      error: "Доступ запрещён" 
    });
  }
  
  res.json({
    success: true,
    count: orders.length,
    orders: orders
  });
};