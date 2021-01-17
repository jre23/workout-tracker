const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json().catch((e) => {
      console.log(e)
    });

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch((e) => {
      console.log(e)
    });

    const json = await res.json().catch((e) => {
      console.log(e)
    });

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((e) => {
      console.log(e)
    });

    const json = await res.json().catch((e) => {
      console.log(e)
    });

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`).catch((e) => {
      console.log(e)
    });
    const json = await res.json().catch((e) => {
      console.log(e)
    });

    return json;
  },
};