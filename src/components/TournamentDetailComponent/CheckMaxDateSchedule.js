export function excuteDate(data, tournamentType, tourDetail) {
  for (const index in data) {
    let flag = true;
    const arrayDate = [];
    for (const itemSeed of data[index].seeds) {
      if (itemSeed.date !== null) {
        arrayDate.push(new Date(itemSeed.date));
        flag = false;
      }
    }
    if (flag) {
      data[index].minDate = null;
      data[index].maxDate = null;
    } else {
      const maxdate = findMaxDate(arrayDate, index, tournamentType, tourDetail,data);
      data[index].minDate = maxdate[0];
      data[index].maxDate = maxdate[1];
    }
    //delete item.seeds
  }

  if (tournamentType === "GroupStage") {
    const arrayDate = [];
    for (let i = 0; i < tourDetail.groupNumber; i++) {
      arrayDate.push(data[i].maxDate);
    }
    findMaxdateInGroup(data, arrayDate, tourDetail.groupNumber);
    return data;
  } else return data;
}

function findMaxdateInGroup(data, dataDate, number) {
  const maxdate = new Date(Math.max.apply(null, dataDate));
  const mindate = new Date(Math.min.apply(null, dataDate));
  data[number - 1].maxDate = maxdate;
  data[number - 1].minDate = mindate;
}

function findMaxDate(data, index, tournamentType, tourDetail,bigData) {
  const maxdate = new Date(Math.max.apply(null, data));
  const mindate = new Date(Math.min.apply(null, data));
  if (tournamentType === "GroupStage") {
    if (index >= 0 && index < tourDetail.groupNumber) {
      return [null, maxdate];
    } else if (index < bigData.length - 1) {
      
      return [mindate, maxdate];
    } else {
      return [mindate, null];
    }
  } else {
    
    if (index == 0) {
      return [null, maxdate];
    } else if (index < bigData.length - 1) {
      return [mindate, maxdate];
    } else {
      return [mindate, null];
    }
  }
}
