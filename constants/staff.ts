export const STAFF_ROLES = [
  { value: "stylist", label: "Stylist" },
  { value: "receptionist", label: "Receptionist" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export const STAFF_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const staffInputFormData = [
  { name: "name", label: "Full Name", placeholder: "e.g. Jane Doe" },
  {
    name: "contactNumber",
    label: "Phone Number",
    placeholder: "e.g. +27 65 123 4567",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "e.g. jane@doe.com",
  },
];

export const addPriceInputFormData = [
  {
    name: "price",
    type: "number",
    label: "Price",
    placeholder: "e.g. 20",
  },
];
