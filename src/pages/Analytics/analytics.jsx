import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button, useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Header from "../../components/Header/header";
import { SaveChanges } from "../../components/button/saveChanges";
import { useFetchTemplate } from "../../customHooks/useFetchTemplate";
import { ConfirmationModal } from "../../components/modal/confirmation";
import { tokens } from "../../theme";
import "../styles/styles.css";
import { addAnalytics } from "../../helpers/cms";

export const Analytics = () => {
  const [fetching, setFetching] = useState(false);
  const [template] = useFetchTemplate({ setFetching });
  const theme = useTheme();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [added, setAdded] = useState(false);
  const [current, setCurrent] = useState({ analytic: "", count: "" });
  const [analytics, setAnalytics] = useState([{ analytic: "", count: "" }]);

  useEffect(() => {
    if (template.length !== 0) {
      setAnalytics(template.analytics);
    }
  }, [fetching]);

  const stringRegex = /^[A-Za-z ]{0,50}$/;

  const checkoutSchema = yup.object().shape({
    analytic: yup
      .string()
      .matches(stringRegex, "Only alphabets allowed")
      .required("required"),
    count: yup.number().required("required"),
  });

  const initialValues = {
    analytic: "",
    count: "",
  };

  const handleFormSubmit = async (values) => {
    addAnalytics({ values, analytics, setAnalytics, setAdded, setError });
  };

  const handleOpen = (item) => {
    setOpen(true);
    setCurrent(item);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Header
        className="text-center"
        title="Analytics"
        subtitle="Website analytics count"
      />

      <Box
        width="80%"
        textAlign="left"
        backgroundColor={`${colors.primary[400]} !important`}
        className="p-3 rounded"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="d-flex">
              <TextField
                required
                name="analytic"
                id="link-field"
                label="Analytic"
                variant="standard"
                className="m-2 w-100"
                placeholder="Analytic"
                onChange={handleChange}
                value={values.analytic}
                error={!!touched.analytic && !!errors.analytic}
                helperText={touched.analytic && errors.analytic}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {values.analytic && (
                <>
                  <TextField
                    required
                    name="count"
                    id="link-field"
                    type="number"
                    label="Count"
                    variant="standard"
                    placeholder="Count"
                    className="m-2 w-100"
                    onChange={handleChange}
                    value={values.count}
                    error={!!touched.count && !!errors.count}
                    helperText={touched.count && errors.count}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="outlined-button mt-3 ms-3"
                  >
                    Add
                  </Button>
                </>
              )}
            </form>
          )}
        </Formik>
        <p className="text-danger fs-xsss ms-5">{error}</p>

        <Box display="flex" alignItems="center">
          {analytics.map((item) => (
            <div className="d-flex flex-column justify-content-center align-items-center m-2">
              <div
                style={{ backgroundColor: colors.primary[300] }}
                className="d-flex analytics rounded-circle text-center align-items-center justify-content-center"
              >
                <p className="fw-bold fs-3 mt-4">{item.count}</p>
                <div className="overlay2">
                  <DeleteOutlineIcon
                    className="delete-button"
                    onClick={() => handleOpen(item)}
                  />
                </div>
              </div>

              <p className="fw-bold mt-2 text-secondary text-uppercase">
                {item.analytic}
              </p>
            </div>
          ))}
        </Box>

        {added && (
          <SaveChanges
            analytics={analytics}
            state={added}
            setState={setAdded}
          />
        )}
      </Box>

      {open && (
        <ConfirmationModal
          content="analytics"
          open={open}
          colors={colors}
          setOpen={setOpen}
          current={current}
          analytics={analytics}
          setCurrent={setCurrent}
          setAnalytics={setAnalytics}
        />
      )}
    </Box>
  );
};
