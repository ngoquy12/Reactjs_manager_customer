// validation.js

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validate = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const rule = rules[field];

    if (rule.required && !value.trim()) {
      errors[field] = `${rule.label} không được để trống`;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label} phải có ít nhất ${rule.minLength} ký tự`;
    } else if (rule.email && !validateEmail(value)) {
      errors[field] = "Email không đúng định dạng";
    }
  });

  return errors;
};
