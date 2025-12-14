export function getGreeting() {
  let result = "";
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    result = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    result = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    result = "Good Evening";
  } else {
    result = "Good Night";
  }

  return result;
}
