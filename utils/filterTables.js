//Filters available tables for given timeslots and sorts by lowest capacity(that can fit
// number of people that we need to make reservation)
exports.filterTables =  (tables, time) => {
  const filtered =  tables
    .filter(async (table) => {
      let timeSlotArray = Object.keys(table.timeslots);
      let availabilityArray = Object.values(table.timeslots);
      let timeSlotIndex = timeSlotArray.indexOf(time.toString());
      let checkArray = [];
      console.log(timeSlotArray, availabilityArray, timeSlotIndex);
      for (let i = 0; i <= 3; i++) {
        checkArray.push(
          availabilityArray[(timeSlotIndex + i) % availabilityArray.length]
        );
      }
      return await !checkArray.includes(false);
    })
    .sort((a, b) => {
      return a.tablecapacity - b.tablecapacity;
    });
  
  return filtered;
};
