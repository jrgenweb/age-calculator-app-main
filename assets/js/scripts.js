const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const btnSubmit = document.querySelector(".btn");

const resultYear = document.querySelector("span.year");
const resultMonth = document.querySelector("span.month");
const resultDay = document.querySelector("span.day");

btnSubmit.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const day = dayEl.value;
  const month = monthEl.value;
  const year = yearEl.value;

  const validationErrors = {
    day: false,
    month: false,
    year: false,
  };

  if (!checkRange(day, 1, 31)) {
    validationErrors.day = true;
    setError(dayEl);
  } else {
    validationErrors.day = false;
    removeError(dayEl);
  }
  if (!checkRange(month, 1, 12)) {
    validationErrors.month = true;
    setError(monthEl);
  } else {
    validationErrors.month = false;
    removeError(monthEl);
  }
  if (!checkRange(year, 1900, 2024)) {
    validationErrors.year = true;
    setError(yearEl);
  } else {
    validationErrors.year = false;
    removeError(yearEl);
  }

  let valid = true;
  for ([key, value] of Object.entries(validationErrors)) {
    if (value) {
      valid = false;
      return;
    }
  }
  if (valid) {
    calculate(day, month, year);
  }
}

/**
 * return true if value is number, and between min and max
 * return false and show err message
 */
function checkRange(value, min, max) {
  value = Number(value);
  if (
    typeof value === "number" &&
    value !== 0 &&
    value >= min &&
    value <= max
  ) {
    return true;
  }
  return false;
}

function setError(node) {
  node.classList.add("error");
  node.parentNode.querySelector("span").classList.add("error");
  node.parentNode.querySelector("label").classList.add("error");
}
function removeError(node) {
  node.classList.remove("error");
  node.parentNode.querySelector("span").classList.remove("error");
  node.parentNode.querySelector("label").classList.remove("error");
}

/** calculate and display
 *
 *
 * from:
 * https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript
 *
 */
function calculate(day, month, year) {
  var birthDate = new Date(`${year}-${month}-${day}`);
  var diffDate = new Date(new Date() - birthDate);

  resultYear.innerText = diffDate.toISOString().slice(0, 4) - 1970;
  resultMonth.innerText = diffDate.getMonth() + 1;
  resultDay.innerText = diffDate.getDate();
}
