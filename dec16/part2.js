const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const categories = data.split('\n\n');
  // console.log({ values: categories });

  const parseRange = (range) => {
    range = range.split('-');
    const first = parseInt(range[0]);
    const last = parseInt(range[1]);
    const vals = [];
    for (let i = first; i <= last; i++) {
      vals.push(i);
    }
    return vals;
  };

  const parseValues = (valuesInput) => {
    let fields = new Map();
    const fieldRows = valuesInput.split('\n');

    fieldRows.forEach((fieldRow) => {
      const [field, values] = fieldRow.split(': ');
      const ranges = values.split(' or ');
      const allValues = ranges.map((range) => parseRange(range)).flat();
      fields.set(field, allValues);
    });
    return fields;
  };

  const parseMyTicket = (myTicketInput) => {
    return myTicketInput
      .split('\n')
      .slice(1)[0]
      .split(',')
      .map((val) => parseInt(val));
  };

  const parseNearbyTicket = (nearbyTicketsInput) => {
    return nearbyTicketsInput
      .split('\n')
      .slice(1)
      .map((str) => str.split(',').map((val) => parseInt(val)));
  };

  const getValidTickets = (tickets, allFieldValues) => {
    const validTickets = [];
    tickets.forEach((ticket) => {
      if (ticket.every((ticketVal) => allFieldValues.has(ticketVal))) {
        validTickets.push(ticket);
      }
    });
    return validTickets;
  };

  const findField = (values, fields) => {
    const matchingKeys = [];
    fields.forEach((fValue, fKey) => {
      const includesAll = values.every((value) => fValue.includes(value));
      if (includesAll) {
        matchingKeys.push(fKey);
      }
    });
    return matchingKeys;
  };

  const [fieldsInput, yourTicketInput, nearbyTicketsInput] = categories;
  const fields = parseValues(fieldsInput);
  const myTicket = parseMyTicket(yourTicketInput);
  const nearbyTickets = parseNearbyTicket(nearbyTicketsInput);

  const allFieldValues = new Set(Array.from(fields.values()).flat());
  const validTickets = getValidTickets(nearbyTickets, allFieldValues);

  // console.log({ fields, validTickets });

  const valueColumns = validTickets.map((_, colIndex) =>
    validTickets.map((row) => row[colIndex])
  );
  // console.log({ valueColumns });

  const colFields = valueColumns.map((valueCol, index) => {
    const fieldCol = findField(valueCol, fields);
    return fieldCol;
  });

  while (colFields.flat().length !== myTicket.length) {
    colFields.forEach((colField) => {
      if (colField.length === 1) {
        colFields.forEach((cf, i) => {
          if (cf.length > 1) {
            newColField = cf.filter((cfv) => cfv !== colField[0]);
            colFields[i] = newColField;
          }
        });
      }
    });
  }

  const finalColFields = colFields.flat();
  // console.log({ finalColFields });

  const result = finalColFields.reduce((acc, colField, index) => {
    if (colField.startsWith('departure')) {
      return myTicket[index] * acc;
    }
    return acc;
  }, 1);
  return result;
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
