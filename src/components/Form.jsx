/* eslint-disable react/jsx-key */
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RatingSelector from "./RatingSelector";
import Lottie from "lottie-react";
import check from "../images/check.json";
import Select from "./Select";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";

function Form() {
  const [formData, setFormData] = useState({
    nombre_stakeholder: "",
    quarter_year: "",
    tipo_entrega: "",
    nombre_entregable: "",
    area: "",
    data_quality: "",
    data_business: "",
    ces: "",
    otd: "",
    comunicacion: "",
    comentarios_generales: "",
    avg_rating: "",
    nps: "",
    projectId: 19,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  // console.log(formData);
  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Elimina el error cuando el usuario comienza a llenar el campo
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: "",
    // }));
  };

  const optionalFields = ["otros_problemas_tecnicos"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPageValid = validatePage();

    if (!isPageValid) {
      return;
    }

    try {
      const response = await axios.post(
        //DESCOMENTAR SOLO EL PRIMERO PARA PRODUCCION
        "api/v1/db/data/v1/crack_sheets/satisfaccion_data",
        // "http://localhost:8010/proxy",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": import.meta.env.VITE_NOCODB_KEY,
          },
          withCredentials: false,
          crossdomain: true,
        }
      );
      console.log(response.data);
      setSuccessMessage(
        `¡Gracias por tus respuestas! Tu opinión es muy valiosa para nosotros y nos ayudará a mejorar continuamente los procesos en el Team de Data. Apreciamos tu tiempo y esfuerzo al completar esta encuesta.`
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos. Inténtelo de nuevo.");
    }
  };

  const quarterYearOptions = [
    {
      label: "Q1 - 2023",
      value: "Q1 - 2023",
    },
    {
      label: "Q2 - 2023",
      value: "Q2 - 2023",
    },
    {
      label: "Q3 - 2023",
      value: "Q3 - 2023",
    },
    {
      label: "Q4 - 2023",
      value: "Q4 - 2023",
    },
    {
      label: "Q1 - 2024",
      value: "Q1 - 2024",
    },
  ];
  const tipoEntregaOptions = [
    {
      label: "Query",
      value: "Query",
    },
    {
      label: "Dashboard",
      value: "Dashboard",
    },
  ];
  const areaOptions = [
    {
      label: "Operaciones",
      value: "Operaciones",
    },
    {
      label: "Calidad LX",
      value: "Calidad LX",
    },
    {
      label: "Producto",
      value: "Producto",
    },
  ];
  const otdOptions = [
    {
      label: "Si",
      value: "Si",
    },
    {
      label: "No",
      value: "No",
    },
  ];

  const pages = [
    [
      <InputField
        key="nombre_stakeholder"
        label="Ingrese su Nombre y Apellido"
        name="nombre_stakeholder"
        value={formData.nombre_stakeholder}
        onChange={handleChange}
        placeholder="Ingrese su Nombre Completo"
        error={errors.nombre_stakeholder}
      />,
      <Select
        key="quarter_year"
        label="Quarter - Year"
        name="quarter_year"
        options={quarterYearOptions}
        value={formData.quarter_year}
        onChange={handleChange}
        placeholder=""
        isOptional={false}
        error={errors.quarter_year}
      />,
      <Select
        key="tipo_entrega"
        label="Tipo de Entrega"
        name="tipo_entrega"
        options={tipoEntregaOptions}
        value={formData.tipo_entrega}
        onChange={handleChange}
        placeholder="Seleccione el tipo de Entrega"
        isOptional={false}
        error={errors.tipo_entrega}
      />,
      <InputField
        key="nombre_entregable"
        label="Nombre de la Entrega"
        name="nombre_entregable"
        value={formData.nombre_entregable}
        onChange={handleChange}
        placeholder="Ingrese el Nombre del Entregable"
        error={errors.nombre_entregable}
      />,
      <Select
        key="area"
        label="Escoja su Area"
        name="area"
        options={areaOptions}
        value={formData.area}
        onChange={handleChange}
        placeholder="Seleccione su Area"
        isOptional={false}
        error={errors.area}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="¿Qué tan precisos consideras que son los datos presentados en los dashboards y consultas?"
        colorType="gradient"
        selectedValue={String(formData.data_quality || 0)}
        onChange={handleChange}
        error={errors.data_quality}
        name="data_quality"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="¿Qué tan relevantes son los datos proporcionados por el team de DATA para la toma de decisiones?"
        colorType="gradient"
        selectedValue={String(formData.data_business || 0)}
        onChange={handleChange}
        error={errors.data_business}
        name="data_business"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="¿Qué tan fácil te resulta interpretar y utilizar los dashboards creados por el team de DATA?"
        colorType="gradient"
        selectedValue={String(formData.ces || 0)}
        onChange={handleChange}
        error={errors.ces}
        name="ces"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="¿Qué tan satisfecho estas con el entregable de tus solicitudes?"
        colorType="gradient"
        selectedValue={String(formData.csat || 0)}
        onChange={handleChange}
        error={errors.csat}
        name="csat"
      />,
      <RadioGroup
        key="otd"
        label="Se cumplio el plazo de entrega acordado?"
        options={otdOptions}
        name="otd"
        selectedValue={formData.otd}
        onChange={handleChange}
        error={errors.otd}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="¿Qué tan bien comunica el team de DATA los resultados y análisis?"
        colorType="gradient"
        selectedValue={String(formData.comunicacion || 0)}
        onChange={handleChange}
        error={errors.comunicacion}
        name="comunicacion"
      />,
      <InputField
        key="comentarios_generales"
        label="¿Qué sugerencias tienes para que el team de DATA mejore sus servicios?"
        name="comentarios_generales"
        value={formData.comentarios_generales}
        onChange={handleChange}
        placeholder=""
        error={errors.comentarios_generales}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="Como calificaria en su totalidad el desarrollo de la tarea?"
        colorType="gradient"
        selectedValue={String(formData.avg_rating || 0)}
        onChange={handleChange}
        error={errors.avg_rating}
        name="avg_rating"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="Recomendaria a otra area solicitar entregables a data?"
        colorType="nps"
        selectedValue={String(formData.nps || 0)}
        onChange={handleChange}
        error={errors.nps}
        name="nps"
      />,
    ],
  ];

  const handleNextPage = () => {
    if (validatePage()) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
    console.log(formData);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const validatePage = () => {
    const newErrors = {};

    // Obtener los nombres de los campos de la página actual
    const currentPageFields = pages[currentPage].map(
      (element) => element.props.name
    );

    currentPageFields.forEach((field) => {
      if (!optionalFields.includes(field) && !formData[field]) {
        newErrors[field] = "Este campo es requerido";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    // Verifica que formRef.current no sea nulo antes de llamar a scrollIntoView
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth", // Opcional: hace el scroll de manera suave
        block: "start", // Hace scroll hasta la parte superior del formulario
      });
    }
  };

  useEffect(() => {
    // Scroll al inicio del formulario cuando cambia la página
    scrollToTop();
  }, [currentPage]); // Se ejecuta cada vez que currentPage cambia

  return (
    <div
      className={`flex flex-col mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl border max-w-[650px] ${
        successMessage ? "bg-black/20" : "bg-white-100/5"
      } bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-gray-100`}
    >
      {successMessage ? (
        <div className="text-white text-center flex flex-col gap-2">
          <Lottie animationData={check} loop={false} className="h-20" />
          {successMessage}
          <p className="font-semibold">Saludos, Team de DATA CTC.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
        >
          {pages[currentPage]}
          {/* <div className="flex gap-5 mx-auto">
            <TfiArrowCircleLeft
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === 0 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handlePreviousPage();
                scrollToTop();
              }}
            />
            <TfiArrowCircleRight
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === pages.length - 1 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handleNextPage();
                scrollToTop();
              }}
            />
          </div> */}
          {currentPage === pages.length - 1 && (
            <button
              type="submit"
              className="rounded-lg border-2 w-full sm:w-[100px] mx-auto mt-5 text-xl text-white p-2 hover:bg-black/40 transition duration-300 ease-in-out"
            >
              Enviar
            </button>
          )}
          {errorMessage && (
            <div className="mt-5 text-red-500 text-center">{errorMessage}</div>
          )}
        </form>
      )}
    </div>
  );
}

export default Form;
