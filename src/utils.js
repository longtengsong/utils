export function amounToWords(amount) {
  if (isNaN(amount) || amount >= 1000000000000) return "无效金额！"; // 数值最大不超过1万亿
  var sPrefix = amount < 0 ? "(负)" : ""; // 将负号‘-’显示成汉字‘(负)’
  var sAmount = Math.abs(amount).toFixed(2); // 格式化成两位小数格式（两位小数对应“'角”和“分”）
  var sUnit = "仟佰拾亿仟佰拾万仟佰拾元角分"; // 14个权位单位
  var sCapital = "零壹贰叁肆伍陆柒捌玖"; // 10个大写数字
  sAmount = sAmount.replace(".", ""); // 去除小数点（使数字与权位对应）
  sUnit = sUnit.substr(sUnit.length - sAmount.length); // 截取权位
  var sOutput = "";
  for (var i = 0, len = sAmount.length; i < len; i++) {
    // 拼接数字与权位单位
    sOutput += sCapital.substr(sAmount.substr(i, 1), 1) + sUnit.substr(i, 1);
  }
  return (
    sPrefix +
    sOutput
      .replace(/零角零分$/, "整")
      .replace(/零[仟佰拾]/g, "零")
      .replace(/零{2,}/g, "零")
      .replace(/零([亿|万])/g, "$1")
      .replace(/零+元/, "元")
      .replace(/亿零{0,3}万/, "亿")
      .replace(/^元/, "零元")
  );
}

export function formatToMicrometer(value) {
  return `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
