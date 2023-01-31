const slider = document.querySelector(".input-slider");
const lowerEl = document.querySelector("#lowerCase");
const upperEl = document.querySelector("#upperCase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const resultEl = document.querySelector("#result");
const copyEl = document.querySelector("#copy-icon");
const strengthEl = document.querySelector("#strength-level");

const generateBtn = document.querySelector("#generate-btn");

const strengthLevels = [
  {
    1: "too weak!",
    color: "#f64a4a",
  },
  { 2: "weak", color: "#fb7c58" },
  { 3: "medium", color: "#f8cd65" },
  { 4: "strong", color: "#a4ffaf" },
];

const strength = (types) => {
  strengthLevels.forEach((lvl) => {
    if (Object.keys(lvl)[0] == types.length) {
      const p = document.querySelector("#strength-level-text");
      p.innerText = lvl[types.length];
    }
  });

  const bars = document.querySelectorAll(".strength-bar");

  bars.forEach((bar, index) => {
    if (index <= types.length - 1) {
      bar.style.backgroundColor = strengthLevels[types.length - 1].color;
      return;
    }

    bar.style.backgroundColor = "transparent";
  });
};

const app = () => {
  const displayLength = document.querySelector(".char-length");
  const length = slider.defaultValue;

  displayLength.innerHTML = length;
};

const handleCopy = () => {
  const textarea = document.createElement("textarea");
  const copyText = resultEl.innerHTML;

  if (!copyText) return;

  textarea.value = copyText;
  document.body.appendChild(textarea);
  textarea.select();
  if (!navigator.clipboard) {
    document.execCommand("copy");
  } else {
    navigator.clipboard
      .writeText(copyText)
      .then(function () {
        const span = document.createElement("span");
        span.innerText = "copied";
        copyEl.insertAdjacentElement("afterbegin", span);

        setTimeout(() => {
          copyEl.removeChild(span);
        }, 2000);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  textarea.remove();
};

copyEl.addEventListener("click", handleCopy);

const handleCharLengthChange = () => {
  const displayLength = document.querySelector(".char-length");
  const length = slider.value;

  displayLength.innerHTML = length;
};

slider.addEventListener("change", handleCharLengthChange);

generateBtn.addEventListener("click", () => {
  const length = slider.value;
  const hasLower = lowerEl.checked;
  const hasUpper = upperEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  resultEl.innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbols,
    length
  );
});

const generateRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const generateRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const generateRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const generateRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generator = {
  lower: generateRandomLower,
  upper: generateRandomUpper,
  numbers: generateRandomNumber,
  symbols: generateRandomSymbol,
};

const generatePassword = (lower, upper, numbers, symbols, length) => {
  let generatedPassword = "";

  const types = [{ lower }, { upper }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  let typesCount = types.length;

  if (typesCount <= 0) {
    return "";
  }

  for (let i = 0; i < length; i++) {
    console.log(length);
    generatedPassword +=
      generator[
        Object.keys(types[Math.floor(Math.random() * typesCount)])[0]
      ]();
  }

  strength(types);

  return generatedPassword;
};

app();
