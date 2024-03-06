export function truncateString(str, num) {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else return str;
}

export function scroll(side, element, number) {
  if (side == "left") {
    element.scrollLeft -= number;
  }
  if (side == "right") {
    element.scrollLeft += number;
  }
  return;
}
