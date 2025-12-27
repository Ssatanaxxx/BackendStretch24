import { Request, Response } from "express";
import servicesData from "../data/services";
import extrasData from "../data/extras";

interface CalculationRequest {
  serviceId: number;
  length: number;
  width: number;
  extras?: Array<{
    id: number;
    length: number;
  }>;
  calculationMethod?: "perSquare" | "perimeterAndSquare";
}

export const calculatePrice = (
  req: Request<{}, {}, CalculationRequest>,
  res: Response
) => {
  try {
    const {
      serviceId,
      length,
      width,
      extras = [],
      calculationMethod,
    } = req.body;

    // Валидация
    if (!serviceId || !length || !width) {
      return res
        .status(400)
        .json({ success: false, error: "Необходимы serviceId, length и width" });
    }

    if (length <= 0 || width <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Длина и ширина должны быть положительными" });
    }

    const service = servicesData.find((s) => s.id === serviceId);

    if (!service) {
      return res.status(404).json({ success: false, error: "Услуга не найдена" });
    }

    const perimeter = (length + width) * 2;
    const area = length * width;

    let basePrice = 0;

    // Расчет основной стоимости
    if (service.formula === "perSquare") {
      if (calculationMethod === "perSquare") {
        basePrice = service.pricePerSquare * area;
      } else {
        // Вариант 300 тг/пог.м + 1700 тг/м²
        basePrice = 300 * perimeter + 1700 * area;
      }
    } else if (service.formula === "perimeterAndSquare") {
      basePrice =
        service.pricePerMeter! * perimeter + service.basePricePerSquare * area;
    }

    let extrasPrice = 0;

    extras.forEach((extra) => {
      const extraData = extrasData.find((e) => e.id === extra.id);
      if (extraData) {
        extrasPrice += extraData.pricePerMeter * extra.length;
      }
    });

    const totalPrice = basePrice + extrasPrice;

    // Формируем ответ
    const breakdown = {
      base: {
        service: service.title,
        perimeter,
        area,
        calculation:
          service.formula === "perimeterAndSquare"
            ? `${service.pricePerMeter} × ${perimeter} + ${service.basePricePerSquare} × ${area}`
            : calculationMethod === "perSquare"
            ? `${service.pricePerSquare} × ${area}`
            : `300 × ${perimeter} + 1700 × ${area}`,
        price: basePrice,
      },
      extras: extras.map((extra) => {
        const extraData = extrasData.find((e) => e.id === extra.id);
        return {
          name: extraData?.title,
          length: extra.length,
          price: extraData ? extraData.pricePerMeter * extra.length : 0,
        };
      }),
      total: totalPrice,
    };

    return res.json({
      success: true,
      data: {
        perimeter,
        area,
        basePrice,
        extrasPrice,
        totalPrice,
        breakdown,
        currency: "KZT",
      },
      message: "Расчёт выполнен успешно",
    });
  } catch (error) {
    console.error("Calculation error:", error);
    return res.status(500).json({
      success: false,
      error: "Ошибка сервера при расчёте",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default calculatePrice;