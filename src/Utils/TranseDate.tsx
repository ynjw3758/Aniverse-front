
export const TranseDate = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const period = isAM ? '오전' : '오후';
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${period} ${displayHour}시 ${formattedMinutes}분`;
  };
