import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {
  CustomInputLabel,
  CustomMenuItem,
  CustomSelect,
  CustomTextField,
  CustomDivider,
} from "../Fields";
import Cookies from "js-cookie";

const NetWorthForm = ({ onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      currentValueOfResidence: "",
      currentValueOfVehicle: "",
      currentSavings: "",
      currentValueOfFixedDeposits: "",
      anyInvestments: "No",
      valueOfBonds: "",
      bond: "No",
      valueOfUnitTrusts: "",
      unitTrusts: "No",
      valueOfEquities: "",
      equities: "No",
      valueOfInsurancePolicies: "",
      insurancePolicies: "No",
      valueOfCommodities: "",
      commodities: "No",
      valueOfProperties: "",
      properties: "No",
      valueOfCryptocurrencies: "",
      cryptocurrencies: "No",
      valueOfOtherInvestments: "",
      otherInvestments: "No",
      currentValueOfOrdinaryCPF: "",
      currentValueOfSpecialCPF: "",
      currentValueOfMedisaveCPF: "",
      currentValueOfOtherCPF: "",
      stocks: "No",
      valueOfStocks: "",
      realEstate: "No",
    },
    validationSchema: Yup.object({
      realEstate: Yup.string().optional(),
      currentValueOfResidence: Yup.number().optional(),
      currentValueOfVehicle: Yup.number().optional(),
      currentSavings: Yup.number().required("Current Savings is required"),
      currentValueOfFixedDeposits: Yup.number().optional(),
      anyInvestments: Yup.string().required("Any Investments is required"),
      valueOfBonds: Yup.number().optional(),
      valueOfStocks: Yup.number().optional(),
      bond: Yup.string().optional(),
      stocks: Yup.string().optional(),
      valueOfUnitTrusts: Yup.number().optional(),
      unitTrusts: Yup.string().optional(),
      valueOfEquities: Yup.number().optional(),
      equities: Yup.string().optional(),
      valueOfInsurancePolicies: Yup.number().optional(),
      insurancePolicies: Yup.string().optional(),
      valueOfCommodities: Yup.number().optional(),
      commodities: Yup.string().optional(),
      valueOfProperties: Yup.number().optional(),
      properties: Yup.string().optional(),
      valueOfCryptocurrencies: Yup.number().optional(),
      cryptocurrencies: Yup.string().optional(),
      valueOfOtherInvestments: Yup.number().optional(),
      otherInvestments: Yup.string().optional(),
      currentValueOfOrdinaryCPF: Yup.number().optional(),
      currentValueOfSpecialCPF: Yup.number().optional(),
      currentValueOfMedisaveCPF: Yup.number().optional(),
      currentValueOfOtherCPF: Yup.number().optional(),
    }),
    onSubmit: (values) => {
      // Save form data to cookies
      Cookies.set("netWorthFormData", JSON.stringify(values), { expires: 7 });
      onNext();
    },
  });

  // Load saved form data from cookies
  useEffect(() => {
    const formDataFromCookies = Cookies.get("netWorthFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);
    }
  }, []);

  const handleFieldChange = async (fieldName, value) => {
    if (fieldName.localeCompare("valueOfStocks") === 0) {
      if (value !== "") {
        const updatedValuesOther = { ...formik.values, ["stocks"]: "Yes" };
        await formik.setValues(updatedValuesOther);
      } else {
        const updatedValuesOther = { ...formik.values, ["stocks"]: "No" };
        await formik.setValues(updatedValuesOther);
      }
    } else if (fieldName.localeCompare("valueOfBonds") === 0) {
      //issue fix it in morning Insha Allah
      if (value !== "") {
        const updatedValuesOther = { ...formik.values, ["bond"]: "Yes" };
        await formik.setValues(updatedValuesOther);
      } else {
        const updatedValuesOther = { ...formik.values, ["bond"]: "No" };
        await formik.setValues(updatedValuesOther);
      }
    } else if (fieldName.localeCompare("valueOfEquities") === 0) {
      if (value !== "") {
        const updatedValuesOther = { ...formik.values, ["equities"]: "Yes" };
        await formik.setValues(updatedValuesOther);
      } else {
        const updatedValuesOther = { ...formik.values, ["equities"]: "No" };
        await formik.setValues(updatedValuesOther);
      }
    } else if (fieldName.localeCompare("valueOfCommodities") === 0) {
      if (value !== "") {
        const updatedValuesOther = { ...formik.values, ["commodities"]: "Yes" };
        await formik.setValues(updatedValuesOther);
      } else {
        const updatedValuesOther = { ...formik.values, ["commodities"]: "No" };
        await formik.setValues(updatedValuesOther);
      }
    } else if (fieldName.localeCompare("valueOfInsurancePolicies") === 0) {
      const updatedValuesOther = {
        ...formik.values,
        ["insurancePolicies"]: value !== "" ? "Yes" : "No",
      };
      await formik.setValues(updatedValuesOther);
    } else if (fieldName.localeCompare("valueOfUnitTrusts") === 0) {
      const updatedValuesOther = {
        ...formik.values,
        ["unitTrusts"]: value !== "" ? "Yes" : "No",
      };
      await formik.setValues(updatedValuesOther);
    } else if (fieldName.localeCompare("valueOfProperties") === 0) {
      const updatedValuesOther = {
        ...formik.values,
        ["properties"]: value !== "" ? "Yes" : "No",
      };
      await formik.setValues(updatedValuesOther);
    } else if (fieldName.localeCompare("valueOfCryptocurrencies") === 0) {
      const updatedValuesOther = {
        ...formik.values,
        ["cryptocurrencies"]: value !== "" ? "Yes" : "No",
      };
      await formik.setValues(updatedValuesOther);
    } else if (fieldName.localeCompare("valueOfOtherInvestments") === 0) {
      const updatedValuesOther = {
        ...formik.values,
        ["otherInvestments"]: value !== "" ? "Yes" : "No",
      };
      await formik.setValues(updatedValuesOther);
    }

    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues);

    setTimeout(() => {
      Cookies.set("netWorthFormData", JSON.stringify(updatedValues), {
        expires: 7,
      });
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942", mb: 2.51 }}>
        Statement of Net Worth
      </Typography>
      <Typography variant="h5" sx={{ color: "#ffb942", mb: 1.51 }}>
        Value of Fixed Assets
      </Typography>
      <Grid container spacing={2}>
        {/* Current Value of Residence */}

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfResidence"
            label="Current Value of Residence"
            type="number"
            value={formik.values.currentValueOfResidence}
            onChange={(e) =>
              handleFieldChange("currentValueOfResidence", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Current Value of Vehicle */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfVehicle"
            label="Current Value of Vehicle"
            type="number"
            value={formik.values.currentValueOfVehicle}
            onChange={(e) =>
              handleFieldChange("currentValueOfVehicle", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
      </Grid>
      <CustomDivider />
      <Typography variant="h5" sx={{ color: "#ffb942", mb: 1.51, mt: 1.51 }}>
        Cash Assets
      </Typography>

      <Grid container spacing={2}>
        {/* Current Savings */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentSavings"
            label="Current Savings"
            type="number"
            value={formik.values.currentSavings}
            onChange={(e) =>
              handleFieldChange("currentSavings", e.target.value)
            }
            error={
              formik.touched.currentSavings &&
              Boolean(formik.errors.currentSavings)
            }
            helperText={
              formik.touched.currentSavings && formik.errors.currentSavings
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
            required
          />
        </Grid>

        {/* Current Value of Fixed Deposits */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfFixedDeposits"
            label="Current Value of Fixed Deposits"
            type="number"
            value={formik.values.currentValueOfFixedDeposits}
            onChange={(e) =>
              handleFieldChange("currentValueOfFixedDeposits", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
      </Grid>
      <CustomDivider />
      <Typography variant="h5" sx={{ color: "#ffb942", mb: 1.51, mt: 1.51 }}>
        Investments
      </Typography>

      <Grid container spacing={2}>
        {/* Any Investments */}
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth required>
            <CustomInputLabel>Any Investments</CustomInputLabel>
            <CustomSelect
              name="anyInvestments"
              label="Any Investments"
              value={formik.values.anyInvestments}
              onChange={(e) =>
                handleFieldChange("anyInvestments", e.target.value)
              }
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Yes">Yes</CustomMenuItem>
              <CustomMenuItem value="No">No</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>

        {formik.values.anyInvestments === "Yes" && (
          <>
            {/* Value of Bonds */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfBonds"
                label="Value of Bonds"
                type="number"
                value={formik.values.valueOfBonds}
                onChange={(e) =>
                  handleFieldChange("valueOfBonds", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfStocks"
                label="Value of Stocks"
                type="number"
                value={formik.values.valueOfStocks}
                onChange={(e) =>
                  handleFieldChange("valueOfStocks", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            {/* Value of Unit Trusts */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfUnitTrusts"
                label="Value of Unit Trusts"
                type="number"
                value={formik.values.valueOfUnitTrusts}
                onChange={(e) =>
                  handleFieldChange("valueOfUnitTrusts", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            {/* Value of Equities */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfEquities"
                label="Value of Equities"
                type="number"
                value={formik.values.valueOfEquities}
                onChange={(e) =>
                  handleFieldChange("valueOfEquities", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            {/* Value of Insurance Policies */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfInsurancePolicies"
                label="Value of Insurance Policies"
                type="number"
                value={formik.values.valueOfInsurancePolicies}
                onChange={(e) =>
                  handleFieldChange("valueOfInsurancePolicies", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            {/* Add similar fields for Commodities, Properties, Cryptocurrencies, Other Investments */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfCommodities"
                label="Value of Commodities"
                type="number"
                value={formik.values.valueOfCommodities}
                onChange={(e) =>
                  handleFieldChange("valueOfCommodities", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfProperties"
                label="Value of Properties"
                type="number"
                value={formik.values.valueOfProperties}
                onChange={(e) =>
                  handleFieldChange("valueOfProperties", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfCryptocurrencies"
                label="Value of Cryptocurrencies"
                type="number"
                value={formik.values.valueOfCryptocurrencies}
                onChange={(e) =>
                  handleFieldChange("valueOfCryptocurrencies", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name="valueOfOtherInvestments"
                label="Value of Other Investments"
                type="number"
                value={formik.values.valueOfOtherInvestments}
                onChange={(e) =>
                  handleFieldChange("valueOfOtherInvestments", e.target.value)
                }
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <CustomDivider />
      <Typography variant="h5" sx={{ color: "#ffb942", mb: 1.51, mt: 1.51 }}>
        CPF
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfOrdinaryCPF"
            label="Current Value Of Ordinary Account in CPF"
            type="number"
            value={formik.values.currentValueOfOrdinaryCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfOrdinaryCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfSpecialCPF"
            label="Current Value Of Special Account in CPF"
            type="number"
            value={formik.values.currentValueOfSpecialCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfSpecialCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfMedisaveCPF"
            label="Current Value Of Medi Save Account in CPF"
            type="number"
            value={formik.values.currentValueOfMedisaveCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfMedisaveCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfOtherCPF"
            label="Current Value Of Any Other Account in CPF"
            type="number"
            value={formik.values.currentValueOfOtherCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfOtherCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
      </Grid>
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

export default NetWorthForm;
