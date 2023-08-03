import * as yup from "yup";

export const validationSchemaUserRegistration = yup.object().shape({
  fullName: yup.string().required("Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  nic: yup
    .string()
    .test({
      message:
        "Please enter the correct NIC format. Old NIC format - 10 characters (First 9 numerical & last digit X or V. New NIC format - 12 characters (All numerical)",
      test: (nic) => {
        if (nic?.match(/^[0-9]{12}$/) || nic?.match(/^([0-9]{9})(V|v|X|x)$/)) {
          return true;
        } else {
          return false;
        }
      },
    })
    .required("NIC is Required"),
  dob: yup.string().required("Birthday is Required"),
  gender: yup.string().required("Gender is Required"),
  mobile: yup
    .string()
    .matches(/^((0094)(\d{9})|(0)(\d{9})|(94)(\d{9}))$/, "Invalid Mobile")
    .required("Mobile is Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "Password must have special character"
    )
    .min(5, "Password must be more than 5 characters long")
    .required("Password is Required"),
  branch: yup.string().required("Branch is Required"),
  purpose: yup
    .array()
    .of(yup.string())
    .min(1, "At least one purpose is Required"),
});

export const validationSchemaUserLogin = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

export const validationSchemaUserProfile = yup.object().shape({
  fullName: yup.string().required("Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  nic: yup
    .string()
    .test({
      message:
        "Please enter the correct NIC format. Old NIC format - 10 characters (First 9 numerical & last digit X or V. New NIC format - 12 characters (All numerical)",
      test: (nic) => {
        if (nic?.match(/^[0-9]{12}$/) || nic?.match(/^([0-9]{9})(V|v|X|x)$/)) {
          return true;
        } else {
          return false;
        }
      },
    })
    .required("NIC is Required"),
  dob: yup.string().required("Birthday is Required"),
  gender: yup.string().required("Gender is Required"),
  mobile: yup
    .string()
    .matches(/^((0094)(\d{9})|(0)(\d{9})|(94)(\d{9}))$/, "Invalid Mobile")
    .required("Mobile is Required"),
  branch: yup.string().required("Branch is Required"),
  height: yup
    .string()
    .test("is-cm", "Invalid height format (use height cm)", (value) => {
      if (!value) return false;
      const cmRegex = /^[0-9]+\.?[0-9]*\s?cm$/;
      return cmRegex.test(value);
    })
    .required("Height is Required"),
  weight: yup
    .string()
    .test("is-kg", "Invalid weight format (use weight kg)", (value) => {
      if (!value) return false;
      const kgRegex = /^[0-9]+\.?[0-9]*\s?kg$/;
      return kgRegex.test(value);
    })
    .required("Weight is Required"),
});

export const assignExerciseSchema = yup.object().shape({
  workoutId: yup.array().min(1, "At least one purpose is Required"),
  numberOfSessions: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

export const validationSchemaMemberRegistration = yup.object().shape({
  fullName: yup.string().required("Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  nic: yup
    .string()
    .test({
      message:
        "Please enter the correct NIC format. Old NIC format - 10 characters (First 9 numerical & last digit X or V. New NIC format - 12 characters (All numerical)",
      test: (nic) => {
        if (nic?.match(/^[0-9]{12}$/) || nic?.match(/^([0-9]{9})(V|v|X|x)$/)) {
          return true;
        } else {
          return false;
        }
      },
    })
    .required("NIC is Required"),
  dob: yup.string().required("Birthday is Required"),
  gender: yup.string().required("Gender is Required"),
  mobile: yup
    .string()
    .matches(/^((0094)(\d{9})|(0)(\d{9})|(94)(\d{9}))$/, "Invalid Mobile")
    .required("Mobile is Required"),
  branch: yup.string().required("Branch is Required"),
  height: yup
    .string()
    .test("is-cm", "Invalid height format (use height cm)", (value) => {
      if (!value) return false;
      const cmRegex = /^[0-9]+\.?[0-9]*\s?cm$/;
      return cmRegex.test(value);
    })
    .required("Height is Required"),
  weight: yup
    .string()
    .test("is-kg", "Invalid weight format (use weight kg)", (value) => {
      if (!value) return false;
      const kgRegex = /^[0-9]+\.?[0-9]*\s?kg$/;
      return kgRegex.test(value);
    })
    .required("Weight is Required"),
  purpose: yup
    .array()
    .of(yup.string())
    .min(1, "At least one purpose is Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "Password must have special character"
    )
    .min(5, "Password must be more than 5 characters long")
    .required("Password is Required"),
});

export const validationSchemaTrainerRegistration = yup.object().shape({
  fullName: yup.string().required("Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  nic: yup
    .string()
    .test({
      message:
        "Please enter the correct NIC format. Old NIC format - 10 characters (First 9 numerical & last digit X or V. New NIC format - 12 characters (All numerical)",
      test: (nic) => {
        if (nic?.match(/^[0-9]{12}$/) || nic?.match(/^([0-9]{9})(V|v|X|x)$/)) {
          return true;
        } else {
          return false;
        }
      },
    })
    .required("NIC is Required"),
  dob: yup.string().required("Birthday is Required"),
  gender: yup.string().required("Gender is Required"),
  mobile: yup
    .string()
    .matches(/^((0094)(\d{9})|(0)(\d{9})|(94)(\d{9}))$/, "Invalid Mobile")
    .required("Mobile is Required"),
  branch: yup.string().required("Branch is Required"),
  specialty: yup.string().required("Specialty is Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "Password must have special character"
    )
    .min(5, "Password must be more than 5 characters long")
    .required("Password is Required"),
});

export const validationSchemaTrainerEdit = yup.object().shape({
  fullName: yup.string().required("Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  nic: yup
    .string()
    .test({
      message:
        "Please enter the correct NIC format. Old NIC format - 10 characters (First 9 numerical & last digit X or V. New NIC format - 12 characters (All numerical)",
      test: (nic) => {
        if (nic?.match(/^[0-9]{12}$/) || nic?.match(/^([0-9]{9})(V|v|X|x)$/)) {
          return true;
        } else {
          return false;
        }
      },
    })
    .required("NIC is Required"),
  dob: yup.string().required("Birthday is Required"),
  gender: yup.string().required("Gender is Required"),
  mobile: yup
    .string()
    .matches(/^((0094)(\d{9})|(0)(\d{9})|(94)(\d{9}))$/, "Invalid Mobile")
    .required("Mobile is Required"),
  branch: yup.string().required("Branch is Required"),
  specialty: yup.string().required("Specialty is Required"),
});

export const equipmentSchema = yup.object().shape({
  name: yup.string().required("Required"),
  totalCount: yup.string().required("Required"),
  availableCount: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

export const workoutSchema = yup.object().shape({
  title: yup.string().required("Required"),
  mainGoal: yup.string().required("Required"),
  trainingLevel: yup.string().required("Required"),
  duration: yup.string().required("Required"),
  targetGender: yup.string().required("Required"),
  type: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

export const userRequestSchema = yup.object().shape({
  count: yup.string().required("Required"),
});
