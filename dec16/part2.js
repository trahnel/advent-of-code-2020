const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const categories = data.split('\n\n');
  console.log({ values: categories });

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
    return myTicketInput.split(',').map((val) => parseInt(val));
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

  const [fieldsInput, yourTicketInput, nearbyTicketsInput] = categories;
  const fields = parseValues(fieldsInput);
  const myTicket = parseMyTicket(yourTicketInput);
  const nearbyTickets = parseNearbyTicket(nearbyTicketsInput);

  const allFieldValues = new Set(Array.from(fields.values()).flat());
  const validTickets = getValidTickets(nearbyTickets, allFieldValues);

  console.log({ validTickets });
  // console.log({ fields, myTicket, nearbyTickets });
};

const data = fs.readFileSync(path.resolve(__dirname, 'test1.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
