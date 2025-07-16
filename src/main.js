import datepicker from 'js-datepicker';
import { DateTime } from 'luxon';

// Initialize the date picker
const dateInput = document.querySelector('#datepicker');

const picker = datepicker(dateInput, {
  formatter: (input, date) => {
    input.value = date.toLocaleDateString(); // Display date in local format
  },
  position: 'br',
  dateSelected: new Date(),        // today has default
  maxDate: new Date(),             // Does not allow future dates
  minDate: new Date(1908, 4, 23),  // May 23, 1908
  startDate: new Date(),           // Start in current month
});

// Calculate difference between selected data and today
function calculateDateDifference() {
  const selectedDateISO = picker.dateSelected?.toISOString();
  if (!selectedDateISO) return null;

  const startDate = DateTime.fromISO(selectedDateISO);
  const currentDate = DateTime.now();

  return currentDate.diff(startDate, ['years', 'months', 'days']).toObject();
}

// Formats time units with plural or singular
function formatTimeUnit(value, singular, plural) {
  return value > 0 ? ` ${value} ${value === 1 ? singular : plural}` : '';
}

// Format final text output
function formatAgeMessage(diff) {
  if (!diff) return 'Invalid date!';

  const years = diff.years ?? 0;
  const months = diff.months ?? 0;
  const days = Math.floor(diff.days ?? 0);

  if (years === 0 && months === 0 && days === 0) {
    return 'You were born today.';
  }

  return `You are ${formatTimeUnit(years, 'Year', 'Years')}${formatTimeUnit(months, 'Month', 'Months')}${formatTimeUnit(days, 'Day', 'Days')} old.
`;
}

// Button click event
const calculateBtn = document.querySelector('#calculateBtn');
const resultContainer = document.querySelector('#result');

calculateBtn.addEventListener('click', () => {
  const diff = calculateDateDifference();
  resultContainer.textContent = formatAgeMessage(diff);
});
