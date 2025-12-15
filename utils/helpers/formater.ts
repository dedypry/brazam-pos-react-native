export function switchCommasToDots(input: string | number) {
  const string = String(input);

  return Number(string.split(",").join(".")) || 0;
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

type IConfig = { thousandSeparator: boolean };
export function switchDotsToCommas(input: string | number, config?: IConfig) {
  const string = String(input);
  let result = String(string.split(".").join(","));

  if (config?.thousandSeparator) {
    result = new Intl.NumberFormat(["ban", "id"]).format(Number(input));
  }

  return result;
}
