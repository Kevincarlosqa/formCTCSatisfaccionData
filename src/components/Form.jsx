/* eslint-disable react/jsx-key */
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RatingSelector from "./RatingSelector";
import Lottie from "lottie-react";
import check from "../images/check.json";
import Select from "./Select";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";

function Form({ handleFormSubmit }) {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    trimestre: "",
    tipo_entrega: "",
    nombre_entregable: "",
    area: "",
    equipo: "",
    problema_resuelto: "",
    data_quality: "",
    data_business: "",
    ces: "",
    otd: "",
    comunicacion: "",
    sugerencias: "",
    avg_rating: "",
    nps: "",
    csat: "",
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

  const optionalFields = ["sugerencias"];

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
        `¡Gracias por su respuesta! Su opinión es muy valiosa para nosotros.`
      );
      handleFormSubmit();
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos. Inténtelo de nuevo.");
    }
  };

  const trimestreOptions = [
    {
      label: "Q1 - 2024",
      value: "Q1 - 2024",
    },
    {
      label: "Q2 - 2024",
      value: "Q2 - 2024",
    },
    {
      label: "Q3 - 2024",
      value: "Q3 - 2024",
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
    {
      label: "Scripts",
      value: "Scripts",
    },
    {
      label: "Formulario",
      value: "Formulario",
    },
    {
      label: "Reporte",
      value: "Reporte",
    },
    {
      label: "Mantenimiento",
      value: "Mantenimiento",
    },
  ];
  const areaOptions = [
    {
      label: "Operaciones",
      value: "Operaciones",
    },
    {
      label: "Producto",
      value: "Producto",
    },
    {
      label: "Innovación",
      value: "Innovación",
    },
    {
      label: "Ventas",
      value: "Ventas",
    },
    {
      label: "Marketing",
      value: "Marketing",
    },
    {
      label: "Recursos Humanos",
      value: "Recursos Humanos",
    },
    {
      label: "Administración y Finanzas",
      value: "Administración y Finanzas",
    },
  ];
  const equipoOptions = [
    {
      label: "Operaciones Profesores",
      value: "Operaciones Profesores",
    },
    {
      label: "Operaciones Proyectos",
      value: "Operaciones Proyectos",
    },
    {
      label: "Académicos",
      value: "Académicos",
    },
    {
      label: "Innovación",
      value: "Innovación",
    },
    {
      label: "Tecnología",
      value: "Tecnología",
    },
    {
      label: "Apropiación",
      value: "Apropiación",
    },
    {
      label: "Ventas",
      value: "Ventas",
    },
    {
      label: "Marketing",
      value: "Marketing",
    },
    {
      label: "Recursos Humanos",
      value: "Recursos Humanos",
    },
    {
      label: "Administración",
      value: "Administración",
    },
    {
      label: "Finanzas",
      value: "Finanzas",
    },
    {
      label: "Atención al Cliente",
      value: "Atención al Cliente",
    },
    {
      label: "Experiencia de Usuario",
      value: "Experiencia de Usuario",
    },
    {
      label: "Producto",
      value: "Producto",
    },
    {
      label: "Diseño",
      value: "Diseño",
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
  const problema_resueltoOptions = [
    { value: "Si", label: "Si" },
    { value: "No", label: "No" },
  ];

  const pages = [
    [
      <InputField
        key="nombre_completo"
        label="Nombre y apellido"
        name="nombre_completo"
        value={formData.nombre_completo}
        onChange={handleChange}
        placeholder="Ingrese su nombre completo"
        error={errors.nombre_completo}
      />,
      <Select
        key="trimestre"
        label="Trimestre"
        name="trimestre"
        options={trimestreOptions}
        value={formData.trimestre}
        onChange={handleChange}
        placeholder="Seleccione el trimestre correspondiente a la entrega"
        isOptional={false}
        error={errors.trimestre}
      />,
      <InputField
        key="nombre_entregable"
        label="Nombre de la entrega"
        name="nombre_entregable"
        value={formData.nombre_entregable}
        onChange={handleChange}
        placeholder="Ingrese el nombre de la entrega"
        error={errors.nombre_entregable}
      />,
      <Select
        key="tipo_entrega"
        label="Tipo de entrega"
        name="tipo_entrega"
        options={tipoEntregaOptions}
        value={formData.tipo_entrega}
        onChange={handleChange}
        placeholder="Seleccione el tipo de entrega"
        isOptional={false}
        error={errors.tipo_entrega}
      />,
      <Select
        key="area"
        label="Área"
        name="area"
        options={areaOptions}
        value={formData.area}
        onChange={handleChange}
        placeholder="Seleccione su área"
        isOptional={false}
        error={errors.area}
      />,
      <Select
        key="equipo"
        label="Equipo"
        name="equipo"
        options={equipoOptions}
        value={formData.equipo}
        onChange={handleChange}
        placeholder="Seleccione su equipo"
        isOptional={false}
        error={errors.equipo}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿qué tan precisos consideras la información y datos recibidos?"
        colorType="default"
        selectedValue={String(formData.data_quality || 0)}
        onChange={handleChange}
        error={errors.data_quality}
        name="data_quality"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿qué tan relevante es la información y datos recibidos para la toma de decisiones?"
        colorType="default"
        selectedValue={String(formData.data_business || 0)}
        onChange={handleChange}
        error={errors.data_business}
        name="data_business"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿qué tan fácil le resulta interpretar y utilizar el entregable recibido?"
        colorType="default"
        selectedValue={String(formData.ces || 0)}
        onChange={handleChange}
        error={errors.ces}
        name="ces"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿qué tan satisfecho se encuentra con el entregable?"
        colorType="gradient"
        selectedValue={String(formData.csat || 0)}
        onChange={handleChange}
        error={errors.csat}
        name="csat"
      />,
      <RadioGroup
        key="otd"
        label="¿Se cumplió el plazo de entrega acordado?"
        options={otdOptions}
        name="otd"
        selectedValue={formData.otd}
        onChange={handleChange}
        error={errors.otd}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿qué tan buena fue la comunicación vinculada a este entregable con el equipo de data?"
        colorType="default"
        selectedValue={String(formData.comunicacion || 0)}
        onChange={handleChange}
        error={errors.comunicacion}
        name="comunicacion"
      />,
      <RadioGroup
        label="El problema que originó su pedido, ¿quedó resuelto?"
        options={problema_resueltoOptions}
        name="problema_resuelto"
        selectedValue={formData.problema_resuelto}
        onChange={handleChange}
        error={errors.problema_resuelto}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿cómo calificaría en su totalidad el desarrollo de la tarea?"
        colorType="default"
        selectedValue={String(formData.avg_rating || 0)}
        onChange={handleChange}
        error={errors.avg_rating}
        name="avg_rating"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala de 0 a 10, ¿recomendaría a otra área solicitar entregables a data?"
        colorType="nps"
        selectedValue={String(formData.nps || 0)}
        onChange={handleChange}
        error={errors.nps}
        name="nps"
      />,
      <InputField
        key="sugerencias"
        label="¿Qué sugerencia tiene para que el equipo de data mejore sus servicios?"
        name="sugerencias"
        value={formData.sugerencias}
        onChange={handleChange}
        placeholder=""
        error={errors.sugerencias}
        isOptional={true}
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
          <p className="font-semibold">Saludos, el equipo de data de CTC.</p>
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
