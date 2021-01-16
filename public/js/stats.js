function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durationsLine = data.map(({
    totalDuration
  }) => totalDuration);

  // my edits ===
  let allDurations = arrayMaps(data, "duration");

  // let durationsPie = data.map((
  //   element
  // ) => element.exercises.map(x => x.duration));

  // let durationsPie2 = durationsPie.map((
  //   element
  // ) => {
  //   if (element.length > 1) {
  //     element.map(x => allDurations.push(x))
  //   } else {
  //     allDurations.push(element[0]);
  //   }
  // });

  let allWeights = arrayMaps(data, "weight");;

  // let weightsDoughnut = data.map((
  //   element
  // ) => element.exercises.map(x => {
  //   if (x.weight) {
  //     return x.weight;
  //   } else {
  //     return 0;
  //   }
  // }));

  // let weightsDoughnut2 = weightsDoughnut.map((element) => {
  //   if (element.length > 1) {
  //     element.map(x => allWeights.push(x))
  //   } else {
  //     allWeights.push(element[0]);
  //   }
  // });

  // console.log("=========data array========");
  // console.log(data);
  // // console.log("========durations array========");
  // // console.log(durationsPie);
  // // console.log(allDurations);
  // console.log("=========weights doughnut array========");
  // console.log(weightsDoughnut);
  // console.log(allWeights);
  // ===

  let pounds = calculateTotalWeight(data);
  let allWorkouts = workoutNames(data); // ===
  // let noDuplicateWorkouts = [...new Set(allWorkouts)];
  let noDuplicateWorkouts = [];
  // console.log("=========workouts array========");
  // console.log(allWorkouts);
  // console.log("========Set workouts array========");
  // console.log(...new Set(allWorkouts));


  let workoutsWithDurations = {};
  let totalDurations = [];
  let workoutsWithWeights = {};
  let totalWeights = [];

  allWorkouts.forEach((value, index) => {
    if (workoutsWithDurations[value]) {
      workoutsWithDurations[value] += allDurations[index];
    } else {
      workoutsWithDurations[value] = allDurations[index];
    }
    if (workoutsWithWeights[value]) {
      workoutsWithWeights[value] += allWeights[index];
    } else {
      workoutsWithWeights[value] = allWeights[index];
    }
  });
  for (let key in workoutsWithDurations) {
    totalDurations.push(workoutsWithDurations[key])
  };
  for (let key in workoutsWithWeights) {
    totalWeights.push(workoutsWithWeights[key])
    noDuplicateWorkouts.push(key);
  };

  console.log("========no duplicate workouts=======");
  console.log(noDuplicateWorkouts);
  console.log("========workouts with durations object========");
  console.log(workoutsWithDurations);
  console.log(totalDurations);

  console.log("========pounds========");
  console.log(pounds);
  console.log(workoutsWithWeights);
  // ===

  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({
    day
  }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Workout Duration In Minutes',
        backgroundColor: 'red',
        borderColor: 'red',
        data: durationsLine,
        fill: false,
      }, ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
        }, ],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
        }, ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Pounds',
        data: pounds,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }, ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: noDuplicateWorkouts,
      datasets: [{
        label: 'Exercises Performed',
        backgroundColor: colors,
        data: totalDurations,
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: noDuplicateWorkouts,
      datasets: [{
        label: 'Exercises Performed',
        backgroundColor: colors,
        data: totalWeights,
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, {
      type,
      weight
    }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}
// this function returns all of the weights or durations for each exercise
const arrayMaps = (data, property) => {
  let allPropertyData = [];

  let firstMap = data.map((
    element
  ) => element.exercises.map(x => {
    if (property === "duration") {
      return x.duration;
    } else if (property === "weight") {
      if (x.weight) {
        return x.weight;
      } else {
        return 0;
      }
    }
  }));

  let secondMap = firstMap.map((
    element
  ) => {
    if (element.length > 1) {
      element.map(x => allPropertyData.push(x))
    } else {
      allPropertyData.push(element[0]);
    }
  });
  console.log(allPropertyData);
  return allPropertyData;
};

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);