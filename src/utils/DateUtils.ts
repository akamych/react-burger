export const formatOrderDate = (input: string): string => {
  try {
    const date = new Date(input);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0);
    today.setMinutes(0);
    const diffInDays = Math.abs(
      Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );

    const offset = date.getTimezoneOffset() / 60;

    const time: string = `${date.getHours()}:${date.getMinutes()} i-GMT${
      offset < 0 ? "-" : "+"
    }${Math.abs(offset)}`;
    switch (diffInDays) {
      case 0:
        return `Сегодня, ${time}`;
      case 1:
        return `Вчера, ${time}`;
      default:
        return `${diffInDays} дн. назад, ${time}`;
    }
  } catch {
    return "";
  }
};
