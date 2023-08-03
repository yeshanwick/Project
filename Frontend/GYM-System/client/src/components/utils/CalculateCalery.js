export const calCalory = (gender, birthday, weight, height, activeLevel) => {
  if (gender === "male") {
   const bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * calAge(birthday);
    switch (activeLevel) {
        case "Sedentary":
          return bmr * 1.2;
        case "Lightly active":
          return bmr * 1.375;
        case "Moderately active":
          return bmr * 1.55;
        case "Very active":
          return bmr * 1.725;
        case "Extra active":
          return bmr * 1.9;
        default:
          return bmr;
      }
  } else if (gender === "female") {
    const bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * calAge(birthday);
    switch (activeLevel) {
        case "Sedentary":
          return bmr * 1.2;
        case "Lightly active":
          return bmr * 1.375;
        case "Moderately active":
          return bmr * 1.55;
        case "Very active":
          return bmr * 1.725;
        case "Extra active":
          return bmr * 1.9;
        default:
          return bmr;
      }
  }
};

export const calAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
};
