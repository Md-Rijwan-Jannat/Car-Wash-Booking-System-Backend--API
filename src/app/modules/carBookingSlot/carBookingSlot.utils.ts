import { ICarBookingSlot } from "./carBookingSlot.interface";

// carBookingSlot.utils.ts
const generateTimeSlots = (payload: ICarBookingSlot, duration: number) => {
  const slots = [];

  const [startTimeHours, startTimeMinutes] = payload.startTime
    .split(":")
    .map(Number);
  const [endTimeHours, endTimeMinutes] = payload.endTime.split(":").map(Number);

  const totalStartTime = startTimeHours * 60 + startTimeMinutes;
  const totalEndTime = endTimeHours * 60 + endTimeMinutes;

  const totalSlotTime = totalEndTime - totalStartTime;
  const totalSlots = totalSlotTime / duration;

  if (totalSlots !== Math.floor(totalSlots)) {
    throw new Error("Time range does not divide evenly into slots");
  }

  let currentTime = totalStartTime;

  for (let i = 0; i < totalSlots; i++) {
    const slotStartTime = currentTime;
    const slotEndTime = currentTime + duration;

    const startHour = String(Math.floor(slotStartTime / 60)).padStart(2, "0");
    const startMinute = String(slotStartTime % 60).padStart(2, "0");
    const endHour = String(Math.floor(slotEndTime / 60)).padStart(2, "0");
    const endMinute = String(slotEndTime % 60).padStart(2, "0");

    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: `${startHour}:${startMinute}`,
      endTime: `${endHour}:${endMinute}`,
    });

    currentTime += duration;
  }

  return slots;
};

export const GenerateTimeSlots = generateTimeSlots;
