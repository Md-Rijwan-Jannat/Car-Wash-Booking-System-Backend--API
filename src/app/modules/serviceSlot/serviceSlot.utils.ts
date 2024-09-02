import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { ICarService } from "./serviceSlot.interface";
import { ServiceSlot } from "./serviceSlot.model";

// carBookingSlot.utils.ts
const generateTimeSlots = async (payload: ICarService, duration: number) => {
  const slots = [];

  const [startTimeHours, startTimeMinutes] = payload.startTime
    .split(":")
    .map(Number);
  const [endTimeHours, endTimeMinutes] = payload.endTime.split(":").map(Number);

  const totalStartTime = startTimeHours * 60 + startTimeMinutes;
  const totalEndTime = endTimeHours * 60 + endTimeMinutes;

  const totalSlotTime = totalEndTime - totalStartTime;
  const totalSlots = totalSlotTime / duration;

  let currentTime = totalStartTime;

  for (let i = 0; i < totalSlots; i++) {
    const slotStartTime = currentTime;
    const slotEndTime = currentTime + duration;

    const startHour = String(Math.floor(slotStartTime / 60)).padStart(2, "0");
    const startMinute = String(slotStartTime % 60).padStart(2, "0");
    const endHour = String(Math.floor(slotEndTime / 60)).padStart(2, "0");
    const endMinute = String(slotEndTime % 60).padStart(2, "0");

    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;

    // Check if a slot with the same service, date, and time exists
    const existingSlot = await ServiceSlot.findOne({
      service: payload.service,
      date: payload.date,
      startTime: startTime,
      endTime: endTime,
    });

    if (existingSlot) {
      if (
        existingSlot.isBooked === "available" ||
        existingSlot.isBooked === "canceled"
      ) {
        throw new AppError(
          httpStatus.CONFLICT,
          `This slot service at ${startTime} to ${endTime} is ${existingSlot.isBooked === "available" ? "already" : ""} ${existingSlot.isBooked}`,
        );
      }
    }

    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: startTime,
      endTime: endTime,
    });

    currentTime += duration;
  }

  return slots;
};

export const GenerateTimeSlots = generateTimeSlots;
