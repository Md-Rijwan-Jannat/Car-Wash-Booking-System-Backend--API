import { ICarServiceSlot } from "../modules/serviceSlot/serviceSlot.interface";
import { ServiceSlot } from "../modules/serviceSlot/serviceSlot.model";

export const slotComplete = async (): Promise<void> => {
  try {
    const allServiceSlots: ICarServiceSlot[] = await ServiceSlot.find();
    const currentDate: Date = new Date();

    for (const slot of allServiceSlots) {
      const [day, month, year] = slot.date.split("-");
      const slotStart: Date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        ...slot.startTime.split(":").map(Number),
      );
      const slotEnd: Date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        ...slot.endTime.split(":").map(Number),
      );

      // Check if slot is booked and has expired
      if (slot.isBooked === "booked" && currentDate > slotEnd) {
        await ServiceSlot.findByIdAndUpdate(slot._id, { isBooked: "complete" });
        console.log(`Slot ID ${slot._id} marked as complete.`);
      }

      // Check if slot is available but date has passed
      if (slot.isBooked === "available" && currentDate > slotEnd) {
        await ServiceSlot.findByIdAndUpdate(slot._id, { isBooked: "canceled" });
        console.log(`Slot ID ${slot._id} marked as canceled.`);
      }
    }

    console.log("Slot status check completed.");
  } catch (error) {
    console.error("Error checking slot statuses:", error);
  }
};
