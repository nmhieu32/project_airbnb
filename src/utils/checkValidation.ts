// utils/checkValidation.tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(0|\+84)(\d{9})$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

export function validateName(name: string): string | null {
  if (!name || name.trim().length === 0) return "Tên không được để trống";
  if (name.length < 2) return "Tên phải có ít nhất 2 ký tự";
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return "Email không được để trống";
  if (!emailRegex.test(email)) return "Email không hợp lệ";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return "Số điện thoại không được để trống";
  if (!phoneRegex.test(phone)) return "Số điện thoại không hợp lệ";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Mật khẩu không được để trống";
  if (!passwordRegex.test(password)) {
    return "Mật khẩu ít nhất 6 ký tự, bao gồm chữ và số";
  }
  return null;
}
