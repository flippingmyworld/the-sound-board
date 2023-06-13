const baseItem = {
  color: "text",
  borderColor: "gray",
  borderWidth: "1px",
  borderRadius: "default",
  "::placeholder": {
    color: "gray",
  },
};

const forms = {
  input: baseItem,
  select: baseItem,
  textarea: baseItem,
  text: { color: "text" },
  label: { color: "text", pb: 2 },
  radio: { mr: 2 },
  checkbox: { mr: 2 },
};

export default forms;
