const WORDS_PER_MINUTE = 238;

function extractContent(s) {
  let span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

function cleanText(string) {
  //Strip whitespace
  return string.replace(/^\s+/, "").replace(/\s+$/, "");
}

function getWordCount(string) {
  const pattern = "\\w+";
  const reg = new RegExp(pattern, "g");
  return (string.match(reg) || []).length;
}

export function getReadingTime(html) {
  let text = extractContent(html);
  let wordCount = getWordCount(cleanText(text));
  let readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return readingTime;
}
