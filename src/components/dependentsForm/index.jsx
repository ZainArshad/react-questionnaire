import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, Box } from "@mui/material";
import { CustomTextField } from "../Fields";
import Cookies from "js-cookie";

const DependentForm = ({ onNext, onBack }) => {
  const [dependentsCount, setDependentsCount] = useState([0]);

  const formik = useFormik({
    initialValues: {
      dependents: dependentsCount.map(() => ({
        dependentName: "",
        dependentDateBirth: "",
        dependentAnnualSpending: "",
        dependentNeed: "",
      })),
    },
    validationSchema: Yup.object().shape({
      dependents: Yup.array().of(
        Yup.object().shape({
          dependentName: Yup.string().optional(),
          dependentDateBirth: Yup.string().optional(),
          dependentAnnualSpending: Yup.number()
            .optional()
            .positive("Amount must be positive"),
          dependentNeed: Yup.number()
            .optional()
            .positive("Amount must be positive"),
        })
      ),
    }),
    onSubmit: (values) => {
      // Save form data to cookies
      Cookies.set("dependentsFormData", JSON.stringify(values), {
        expires: 7,
      });
      onNext();
    },
  });

  // Load saved form data from cookies
  useEffect(() => {
    // Cookies.remove("dependentsFormData");
    const formDataFromCookies = Cookies.get("dependentsFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);

      console.log("786 parsedData", parsedData, formik.values);
      let arr = [0];

      for (
        let index = 0;
        index < parsedData["dependents"].length - 1;
        index++
      ) {
        console.log("786 index", index, parsedData["dependents"][index]);
        handleAddGoal("dependents");
        arr.push(index + 1);
      }

      console.log("786 dependentsCount", dependentsCount);

      setDependentsCount(arr);
    }
  }, []);

  const handleFieldChange = async (fieldName, value, goalType, index) => {
    console.log("787 handleFieldChange", fieldName, value, goalType, index);
    const updatedValues = { ...formik.values };
    updatedValues[goalType][index][fieldName] = value;

    await formik.setValues(updatedValues);
    setTimeout(() => {
      Cookies.set("dependentsFormData", JSON.stringify(updatedValues), {
        expires: 7,
      });
    }, 100);
  };

  const handleAddGoal = (type) => {
    if (type === "dependents" && dependentsCount.length < 4) {
      const newGoal = {
        dependentName: "",
        dependentDateBirth: "",
        dependentAnnualSpending: "",
      };

      setDependentsCount((prevCounts) => [...prevCounts, prevCounts.length]);

      const formDataFromCookies = Cookies.get("dependentsFormData");
      if (
        formDataFromCookies &&
        JSON.parse(formDataFromCookies)[type][formik.values[type].length] !=
          undefined
      ) {
        const parsedData = JSON.parse(formDataFromCookies);
        formik.setValues(parsedData);
      } else {
        formik.setFieldValue(type, [...formik.values[type], newGoal]);
      }
    }
  };

  const handleRemoveGoal = (type, index) => {
    const goals = [...formik.values[type]];
    goals.splice(index, 1);
    formik.setFieldValue(type, goals);

    const formDataFromCookies = Cookies.get("dependentsFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      if (parsedData[type]) {
        parsedData[type].splice(index, 1);
        setTimeout(() => {
          Cookies.set("dependentsFormData", JSON.stringify(parsedData), {
            expires: 7,
          });
        }, 101);
        formik.setValues(parsedData);
      }
    }

    if (type === "dependents") {
      let temp = [];

      dependentsCount.map((d) => {
        if (d !== index) {
          if (d > index) {
            temp.push(d - 1);
          } else {
            temp.push(d);
          }
        }
      });

      setDependentsCount(temp);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Dependents Details
      </Typography>

      {dependentsCount.map((index) => {
        console.log("786 index", index, dependentsCount, formik.values);
        return (
          <Grid container spacing={2} key={index} mt={0.5}>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                name={`dependents[${index}].dependentName`}
                label="Name"
                value={formik.values.dependents[index].dependentName}
                onChange={(e) =>
                  handleFieldChange(
                    "dependentName",
                    e.target.value,
                    "dependents",
                    index
                  )
                }
                error={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  Boolean(
                    formik.errors.dependents &&
                      formik.errors.dependents[index]?.dependentName
                  )
                }
                helperText={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  formik.errors.dependents &&
                  formik.errors.dependents[index]?.dependentName
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                name={`dependents[${index}].dependentDateBirth`}
                label="Date of Birth"
                value={formik.values.dependents[index].dependentDateBirth}
                onChange={(e) =>
                  handleFieldChange(
                    "dependentDateBirth",
                    e.target.value,
                    "dependents",
                    index
                  )
                }
                error={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  Boolean(
                    formik.errors.dependents &&
                      formik.errors.dependents[index]?.dependentDateBirth
                  )
                }
                helperText={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  formik.errors.dependents &&
                  formik.errors.dependents[index]?.dependentDateBirth
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                name={`dependents[${index}].dependentAnnualSpending`}
                label="Annual Spending"
                type="number"
                value={formik.values.dependents[index].dependentAnnualSpending}
                onChange={(e) =>
                  handleFieldChange(
                    "dependentAnnualSpending",
                    e.target.value,
                    "dependents",
                    index
                  )
                }
                error={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  Boolean(
                    formik.errors.dependents &&
                      formik.errors.dependents[index]?.dependentAnnualSpending
                  )
                }
                helperText={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  formik.errors.dependents &&
                  formik.errors.dependents[index]?.dependentAnnualSpending
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                name={`dependents[${index}].dependentNeed`}
                label="Annual Amount Needed"
                type="number"
                value={formik.values.dependents[index].dependentNeed}
                onChange={(e) =>
                  handleFieldChange(
                    "dependentNeed",
                    e.target.value,
                    "dependents",
                    index
                  )
                }
                error={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  Boolean(
                    formik.errors.dependents &&
                      formik.errors.dependents[index]?.dependentNeed
                  )
                }
                helperText={
                  formik.touched.dependents &&
                  formik.touched.dependents[index] &&
                  formik.errors.dependents &&
                  formik.errors.dependents[index]?.dependentNeed
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
            {index > 0 && (
              <Grid item xs={12} sm={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveGoal("dependents", index)}
                    sx={{
                      mt: 1,
                      backgroundColor: "#ffb942",
                      "&:hover": {
                        backgroundColor: "#ffcc00",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        );
      })}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <Button
          variant="contained"
          onClick={() => handleAddGoal("dependents")}
          sx={{
            mt: 1.5,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Add Dependent
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            mt: 3.5,
            mr: 1,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3.5,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default DependentForm;
