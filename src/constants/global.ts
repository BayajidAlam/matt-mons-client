export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});



export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}

export enum PaymentType {
  PARTIAL = "PARTIAL",
  FULL = "FULL",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PARTIAL_PAID = "PARTIAL_PAID",
  FULL_PAID = "FULL_PAID",
}


export const genderOption = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

export const isActive = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Deactivate",
    value: "deactivate-",
  },
];

export const workshopType = [
  {
    label: "In House",
    value: "InHouse",
  },
  {
    label: "Outside",
    value: "Outside-",
  },
];

export const maintenanceType = [
  {
    label: 'Scheduled',
    value: 'Scheduled',
  },
  {
    label: 'Unscheduled',
    value: 'Unscheduled',
  },
  {
    label: 'Accidental',
    value: 'Accidental',
  },
];

export const paperTypeFitness = [
  {
    label: "Fitness",
    value: "Fitness",
  },
];

export const paperTypeRegistration = [
  {
    label: "Registration",
    value: "Registration",
  },
];
export const paperTypeTaxToken = [
  {
    label: "Tax/Token",
    value: "Tax",
  },
];

export const paperTypeRoutePermit = [
  {
    label: "Route Permit",
    value: "Route",
  },
];

export const accidentPaymentStatus = [
  {
    label: "Paid",
    value: "Paid",
  },
  {
    label: "Received",
    value: "Received",
  },
  {
    label: "Nothing",
    value: "Nothing",
  },
];


// month of the year
export const monthOfYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export enum OrderStatus {
  placed = "placed",
  payment_accepted = "payment_accepted",
  delivered_to_curier = "delivered_to_curier",
  curier_wareshouse = "curier_wareshouse", 
  being_delivered = "being_delivered",
  delivered = "delivered", 
  cancel = "cancel",
  returned = "returned"
}