import { parse, isValid } from "date-fns"

export function parseBirthday(dateStr: string): Date | null {
  if (!dateStr) return null;

  // 1. Nếu new Date() parse được thì dùng luôn
  const d = new Date(dateStr);
  if (isValid(d)) return d;

  // 2. Thử parse theo các format phổ biến
  const formats = ["dd/MM/yyyy", "yyyy/MM/dd"];
  for (let f of formats) {
    const parsed = parse(dateStr, f, new Date());
    if (isValid(parsed)) return parsed;
  }

  // 3. Không parse được thì trả null
  return null;
}
