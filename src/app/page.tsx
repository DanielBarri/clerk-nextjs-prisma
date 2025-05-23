import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons/faQuoteLeft";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="h-full w-full flex justify-center bg-[url(/bgpatternb.avif)]">
            <div
                className="max-w-[1980px] w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100
 items-center justify-center m-[100px]">
                <header className="flex h-[50px] m-2 p-4 w-[100%] justify-between items-center px-10">
                    <Link
                        href="/"
                        className="flex items-center justify-center lg:justify-start gap-4">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={32}
                            height={32}
                        />
                        <span className="hidden lg:block font-bold text-black text-xl">
                            Vocations
                        </span>
                    </Link>
                    <Navbar />
                </header>
                <section
                    className="bg-gradient-to-b from-[#ffffff] to-[var(--light-background-color)] lg:py-2 code-section"
                    id="s9y9lyg">
                    <div className="container mx-auto mb-24 px-6">
                        <div className="flex flex-col-reverse items-center lg:flex-row lg:mx-20">
                            <div className="mt-12 w-full lg:mt-32 lg:w-[45%] lg:pr-14">
                                <h1 className="mb-4 text-center text-4xl font-bold [font-family:var(--font-family-heading)] lg:text-left lg:text-5xl xl:text-6xl">
                                    Desbloquea tu potencial con Vocations
                                </h1>
                                <p className="mb-12 text-center text-xl text-[var(--dark-text-color)] lg:text-left">
                                    Explora caminos diseñados según tus
                                    fortalezas e intereses con nuestra
                                    plataforma impulsada por inteligencia
                                    artificial. Comienza tu viaje con una
                                    evaluación vocacional única que revela tu
                                    verdadero potencial.
                                </p>
                                <div className="mb-12 flex items-center justify-center lg:items-start lg:justify-start">
                                    <Link
                                        href="/sign-up"
                                        className="items-center rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-semibold text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]">
                                        Empieza ya
                                    </Link>
                                </div>
                                <div className="flex items-center pb-10">
                                    <Image
                                        src="/girl2.webp"
                                        alt="Happy Customer"
                                        width={72}
                                        height={72}
                                        className="mr-4 rounded-full object-cover"
                                    />
                                    <div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faQuoteLeft}
                                                width={15}
                                                height={15}
                                            />
                                            <p className="mb-2 inline text-lg text-[var(--dark-text-color)] gb-blue-600">
                                                &nbsp;Vocations ha revolucionado
                                                la planeación de mi carrera,
                                                haciendola simple y
                                                empoderadora.&nbsp;
                                            </p>
                                            <FontAwesomeIcon
                                                icon={faQuoteRight}
                                                width={15}
                                                height={15}
                                            />
                                        </div>

                                        <p>
                                            <span className="font-semibold text-[var(--dark-text-color)]">
                                                Jane Doe
                                            </span>
                                            <span className="pl-2 font-semibold text-[var(--primary-color)]">
                                                (Estudiante en la academia de
                                                futuros lideres)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full h-full lg:h-[500px] lg:w-[55%] lg:pl-6">
                                <Image
                                    src="/hero.webp"
                                    alt="Hero"
                                    width={540}
                                    height={450}
                                    className="mt-8 object-contain lg:mt-0"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 code-section">
                    <div className="container mx-auto px-6">
                        <h2 className="mb-6 text-center text-6xl font-bold [font-family:'Poppins', sans-serif;]">
                            Descubre Tu Camino con Vocations
                        </h2>
                        <h3 className="mb-12 text-center text-xl text-gray-500">
                            Empodera tu futuro con guía personalizada ajustada
                            solo para ti
                        </h3>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex-1 rounded-3xl bg-[#ffffff] p-8 text-center shadow-lg shadow-[#ccc] md:max-w-xs md:p-12">
                                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        1
                                    </span>
                                </div>
                                <h4 className="mb-2 text-2xl font-semibold">
                                    Realiza la evaluación vocacional.
                                </h4>
                                <p className="text-[var(--gray-text-color)]">
                                    Comienza tu camino evaluando tus fortalezas
                                    e intereses con nuestro perspicaz test
                                    vocacional, diseñado especialmente para
                                    estudiantes con aspiraciones.
                                </p>
                            </div>
                            <div className="flex-1 rounded-3xl bg-[#ffffff] p-8 text-center shadow-lg shadow-[#ccc] md:max-w-xs md:p-12">
                                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        2
                                    </span>
                                </div>
                                <h4 className="mb-2 text-2xl font-semibold">
                                    Recibe sugerencias de carrera
                                    personalizadas.
                                </h4>
                                <p className="text-[var(--gray-text-color)]">
                                    Según los resultados de tu evaluación,
                                    nuestra IA te recomienda trayectorias
                                    profesionales que se alinean con tu perfil
                                    único, ayudándote a explorar opciones que
                                    realmente conectan contigo.
                                </p>
                            </div>
                            <div className="flex-1 rounded-3xl bg-[#ffffff] p-8 text-center shadow-lg shadow-[#ccc] md:max-w-xs md:p-12">
                                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        3
                                    </span>
                                </div>
                                <h4 className="mb-2 text-2xl font-semibold">
                                    Crea tu ruta de aprendizaje personalizada.
                                </h4>
                                <p className="text-[var(--gray-text-color)]">
                                    Una vez que hayas elegido una vocación,
                                    nuestra plataforma genera un plan de
                                    estudios integral adaptado a tus
                                    necesidades, desglosando las materias en
                                    temas específicos y manejables.
                                </p>
                            </div>
                            <div className="flex-1 rounded-3xl bg-[#ffffff] p-8 text-center shadow-lg shadow-[#ccc] md:max-w-xs md:p-12">
                                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        4
                                    </span>
                                </div>
                                <h4 className="mb-2 text-2xl font-semibold">
                                    Supervisa tu progreso de forma eficiente.
                                </h4>
                                <p className="text-[var(--gray-text-color)]">
                                    Con nuestro intuitivo rastreador de
                                    progreso, gestiona tu ruta de aprendizaje
                                    sin complicaciones mientras accedes a
                                    recursos educativos de calidad adaptados a
                                    cada tema.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="code-section">
                    <div className="container mx-auto px-6 lg:pt-24">
                        <div className="flex flex-col items-stretch lg:flex-row">
                            <div className="flex flex-1 items-center justify-center rounded-3xl bg-[var(--light-background-color)] p-6 lg:w-1/2">
                                <Image
                                    className="mx-auto rounded-3xl"
                                    src="/section1.webp"
                                    alt="Hero"
                                    width={567}
                                    height={450}
                                />
                            </div>
                            <div className="pt-8 lg:w-1/2 lg:pl-20 lg:pr-12 lg:pt-0">
                                <h2 className="mb-4 text-center text-3xl font-bold [font-family:var(--font-family-heading)] lg:text-left lg:text-5xl">
                                    Transforma tu futuro con Vocations.
                                </h2>
                                <p className="mb-6 text-center text-xl text-[var(--dark-text-color)] lg:text-left">
                                    Desata tu potencial y navega tu camino
                                    profesional con confianza y claridad.
                                </p>
                                <ul className="mb-12 list-disc pl-6 text-xl">
                                    <li className="mb-3">
                                        Comienza con nuestra evaluación
                                        vocacional reveladora para descubrir tus
                                        fortalezas e intereses.
                                    </li>
                                    <li className="mb-3">
                                        Recibe sugerencias de carrera
                                        personalizadas, adaptadas a tu perfil
                                        único y a tus aspiraciones.
                                    </li>
                                    <li className="mb-3">
                                        Genera un plan de estudio personalizado
                                        que divide las materias esenciales en
                                        temas manejables.
                                    </li>
                                    <li>
                                        Haz un seguimiento de tu progreso sin
                                        esfuerzo mientras accedes a recursos
                                        educativos de alta calidad seleccionados
                                        para tu camino de aprendizaje.
                                    </li>
                                </ul>
                                <div className="flex justify-center lg:block">
                                    <Link
                                        href="/sign-up"
                                        className="mb-12 inline-block rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-medium text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]">
                                        ¡Comienza tu prueba gratuita hoy!
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    <Image
                                        src="/roberto.png"
                                        alt="Profile"
                                        width={72}
                                        height={72}
                                        className="mr-4 rounded-full object-cover"
                                    />
                                    <div>
                                        <FontAwesomeIcon icon={faQuoteLeft} />
                                        <p className="mb-2 inline text-lg text-[var(--dark-text-color)]">
                                            &nbsp;¡Vocations ha cambiado mi
                                            vida! Encontré claridad en mi camino
                                            profesional y un plan estructurado
                                            para alcanzar mis metas.&nbsp;
                                        </p>
                                        <FontAwesomeIcon icon={faQuoteRight} />
                                        <p>
                                            <span className="font-semibold text-[var(--dark-text-color)]">
                                                Emily Johnson
                                            </span>
                                            <span className="pl-2 font-semibold text-[var(--primary-color)]">
                                                (Gerente de Proyecto en Creative
                                                Solutions)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="code-section">
                    <div className="container mx-auto px-6 pb-12 pt-12 lg:pt-24">
                        <div className="flex flex-col-reverse items-stretch lg:flex-row">
                            <div className="lg:w-1/2 lg:pr-20">
                                <h2 className="mb-4 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:text-5xl lg:text-left">
                                    Navega tu futuro con Vocations
                                </h2>
                                <p className="mb-6 text-center text-xl text-[var(--dark-text-color)] lg:text-left">
                                    Potencia tu trayectoria profesional con
                                    conocimientos personalizados y rutas de
                                    aprendizaje guiadas hechas solo para ti.
                                </p>
                                <ul className="mb-12 list-disc pl-8 text-xl">
                                    <li className="mb-3">
                                        Inicia tu transformación con nuestra
                                        evaluación vocacional especializada que
                                        destaca tus fortalezas e intereses
                                        únicos.
                                    </li>
                                    <li className="mb-3">
                                        Recibe sugerencias de carrera
                                        personalizadas que resuenan con tu
                                        perfil, abriendo puertas a oportunidades
                                        emocionantes.
                                    </li>
                                    <li className="mb-3">
                                        Diseña una hoja de ruta de aprendizaje
                                        personalizada que desglosa
                                        sistemáticamente materias esenciales en
                                        temas.
                                    </li>
                                    <li>
                                        Monitorea fácilmente tu progreso
                                        mientras accedes a recursos
                                        seleccionados para mejorar tu
                                        experiencia de aprendizaje.
                                    </li>
                                </ul>
                                <div className="flex justify-center lg:block">
                                    <Link
                                        href="/sign-up"
                                        className="mb-12 inline-block rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-medium text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]">
                                        ¡Comienza tu prueba gratuita ahora!
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    <Image
                                        src="/customer1.jpg"
                                        alt="Profile"
                                        width={72}
                                        height={72}
                                        className="mr-4 rounded-full object-cover"
                                    />
                                    <div>
                                        <FontAwesomeIcon icon={faQuoteLeft} />
                                        <p className="mb-2 inline text-lg text-[var(--dark-text-color)]">
                                            &nbsp;Usando Vocations, obtuve una
                                            dirección clara en mi camino
                                            profesional y un plan estratégico
                                            para alcanzar mis metas
                                            académicas.&nbsp;
                                        </p>
                                        <FontAwesomeIcon icon={faQuoteRight} />
                                        <p>
                                            <span className="font-semibold text-[var(--dark-text-color)]">
                                                Emily Johnson
                                            </span>
                                            <span className="pl-2 font-semibold text-[var(--primary-color)]">
                                                (Project Manager en Creative
                                                Solutions)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 flex flex-1 items-center justify-center rounded-[var(--button-rounded-radius)] bg-[var(--light-background-color)] p-6 lg:w-1/2">
                                <Image
                                    className="mx-auto rounded-[var(--button-rounded-radius)]"
                                    src="/hero3.png"
                                    alt="Hero"
                                    width={450}
                                    height={450}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="code-section">
                    <div className="container mx-auto px-6 py-6 md:py-12">
                        <div className="rounded-3xl bg-[var(--light-background-color)] px-4 py-8 md:py-40">
                            <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-bold [font-family:var(--font-family-heading)] md:text-6xl">
                                Desbloquea tu potencial profesional con
                                Vocations
                            </h2>
                            <p className="mb-8 text-center text-xl text-[var(--dark-text-color)]">
                                Descubre tu camino profesional ideal a través de
                                insights personalizados, aprendizaje guiado y
                                recursos impulsados por IA diseñados
                                especialmente para ti.
                            </p>
                        </div>
                        <div className="-mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 lg:-mt-36 lg:grid lg:flex-none lg:grid-cols-3 lg:place-items-center lg:items-stretch lg:gap-y-12">
                            <div className="max-w-sm flex-1 rounded-3xl bg-[#ffffff] p-14 text-center shadow-xl shadow-[#ccc]">
                                <div className="mx-auto mb-4 mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        1
                                    </span>
                                </div>
                                <h4 className="mb-6 text-3xl font-semibold">
                                    Explora tus fortalezas
                                </h4>
                                <p className="text-[var(--dark-text-color)]">
                                    Participa en nuestra completa evaluación
                                    vocacional para obtener información sobre
                                    tus habilidades e intereses únicos, abriendo
                                    el camino hacia una carrera satisfactoria.
                                </p>
                            </div>
                            <div className="max-w-sm flex-1 rounded-3xl bg-[#ffffff] p-14 text-center shadow-xl shadow-[#ccc]">
                                <div className="mx-auto mb-4 mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        2
                                    </span>
                                </div>
                                <h4 className="mb-6 text-3xl font-semibold">
                                    Recibe rutas profesionales personalizadas
                                </h4>
                                <p className="text-[var(--dark-text-color)]">
                                    Aprovecha las sugerencias de carrera
                                    personalizadas generadas por nuestra IA,
                                    alineadas con los resultados de tu
                                    evaluación y tus aspiraciones, para que
                                    tomes decisiones informadas.
                                </p>
                            </div>
                            <div className="max-w-sm flex-1 rounded-3xl bg-[#ffffff] p-14 text-center shadow-xl shadow-[#ccc]">
                                <div className="mx-auto mb-4 mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--light-background-color)] text-4xl">
                                    <span className="text-[var(--primary-color)]">
                                        3
                                    </span>
                                </div>
                                <h4 className="mb-6 text-3xl font-semibold">
                                    Diseña tu plan de estudio personalizado
                                </h4>
                                <p className="text-[var(--dark-text-color)]">
                                    Nuestra plataforma creará un plan de estudio
                                    detallado, adaptado a la vocación que
                                    elijas, ayudándote a navegar por las
                                    materias y temas esenciales para tu éxito.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="code-section">
                    <div className="container mx-auto px-6 py-12">
                        <h2 className="mb-4 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:px-40 sm:text-6xl">
                            Elige el plan perfecto para tu camino profesional
                        </h2>
                        <p className="text-center text-xl text-[var(--gray-text-color)] sm:mb-16">
                            Únete a miles de estudiantes que toman el control de
                            su futuro con rutas de aprendizaje personalizadas.
                        </p>
                        <div className="flex flex-col lg:flex-row">
                            <div className="my-6 flex-1 rounded-3xl bg-[#ffffff] px-4 py-12 text-center shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                                <h4 className="mb-4 text-4xl font-semibold">
                                    Nivel gratuito
                                </h4>
                                <p className="mb-8 font-light text-[var(--dark-text-color)] xl:text-xl">
                                    Comienza tu camino sin ningún costo. Accede
                                    a nuestro test vocacional y recibe
                                    sugerencias de carrera personalizadas para
                                    guiarte.
                                </p>
                                <p className="mb-2 text-6xl font-bold text-[var(--primary-color)]">
                                    $0
                                </p>
                                <p className="mb-9 text-lg font-light uppercase text-[var(--dark-text-color)]">
                                    Sin compromiso requerido
                                </p>
                                <Link
                                    href="/sign-up"
                                    className="mx-auto mb-11 block w-2/3 rounded border border-[var(--dark-border-color)] bg-[#ffffff] py-4 font-semibold uppercase text-[var(--dark-text-color)]">
                                    Comienza Gratis
                                </Link>
                                <ul className="space-y-3 font-light">
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#5371FF] text-2xl"
                                        />
                                        <span className="text-left text-lg text-[var(--dark-text-color)]">
                                            &nbsp;&nbsp;&nbsp;Acceso al Test
                                            Vocacional
                                        </span>
                                    </li>
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#5371FF] text-2xl"
                                        />
                                        <span className="text-left text-lg text-[var(--dark-text-color)]">
                                            &nbsp;&nbsp;&nbsp;Recomendaciones de
                                            Carrera
                                            &nbsp;&nbsp;&nbsp;Personalizadas
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative my-6 flex-1 rounded-3xl bg-[var(--primary-color)] px-4 py-12 text-center text-white shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                                <div className="absolute -top-6 left-1/4 mb-2 flex h-[54px] w-1/2 items-center justify-center rounded bg-black px-2 py-1 text-center text-xl font-semibold uppercase">
                                    Mejor Valor
                                </div>
                                <h4 className="mb-4 text-4xl font-semibold">
                                    Nivel Premium
                                </h4>
                                <p className="mb-8 font-light xl:text-xl">
                                    Desbloquea todo el potencial de tu
                                    experiencia de aprendizaje con nuestras
                                    funciones premium, diseñadas para elevar tu
                                    plan de estudios.
                                </p>
                                <p className="mb-3 text-6xl font-bold">$29</p>
                                <p className="mb-9 text-lg font-light uppercase">
                                    Suscripción mensual
                                </p>
                                <Link
                                    href="/sign-up"
                                    className="mx-auto mb-11 block w-2/3 rounded bg-white py-4 font-semibold uppercase text-[var(--dark-text-color)]">
                                    Desbloquea funciones premium
                                </Link>
                                <ul className="space-y-3 font-light text-white">
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-white text-2xl"
                                        />
                                        <span className="text-left text-lg">
                                            &nbsp;&nbsp;&nbsp;Planes de estudio
                                            completos generados
                                            &nbsp;&nbsp;&nbsp;por IA
                                        </span>
                                    </li>
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-white text-2xl"
                                        />
                                        <span className="text-left text-lg">
                                            &nbsp;&nbsp;&nbsp;Acceso a recursos
                                            gratuitos de alta calidad
                                        </span>
                                    </li>
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-white text-2xl"
                                        />
                                        <span className="text-left text-lg">
                                            &nbsp;&nbsp;&nbsp;Herramientas de
                                            seguimiento y gestión del
                                            &nbsp;&nbsp;&nbsp;progreso
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="my-6 flex-1 rounded-3xl bg-[#ffffff] px-4 py-12 text-center shadow-lg shadow-[#ccc] sm:mx-6 sm:px-10">
                                <h4 className="mb-4 text-4xl font-semibold">
                                    Nivel Empresarial
                                </h4>
                                <p className="mb-8 font-light text-[var(--dark-text-color)] xl:text-xl">
                                    Para instituciones y organizaciones que
                                    buscan una solución de aprendizaje integral.
                                    Personaliza funciones y accede a análisis
                                    detallados.
                                </p>
                                <p className="mb-3 text-6xl font-bold text-[var(--primary-color)]">
                                    Contáctanos
                                </p>
                                <p className="mb-9 text-lg font-light uppercase text-[var(--dark-text-color)]">
                                    Para soluciones personalizadas
                                </p>
                                <Link
                                    href="/sign-up"
                                    className="mx-auto mb-11 block w-2/3 rounded border border-[var(--dark-border-color)] bg-[#ffffff] py-4 font-semibold uppercase text-[var(--dark-text-color)]">
                                    Consulta sobre precios
                                </Link>
                                <ul className="space-y-3 font-light">
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#5371FF] text-2xl"
                                        />
                                        <span className="text-left text-lg text-[var(--dark-text-color)]">
                                            &nbsp;&nbsp;&nbsp;Rutas de
                                            aprendizaje personalizables
                                        </span>
                                    </li>
                                    <li className="flex min-h-[28px] items-center">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#5371FF] text-2xl"
                                        />
                                        <span className="text-left text-lg text-[var(--dark-text-color)]">
                                            &nbsp;&nbsp;&nbsp;Funciones de
                                            análisis e informes
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="code-section">
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="mb-6 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:text-6xl">
                            Impulsa tu trayectoria profesional
                        </h2>
                        <p className="mx-auto mb-8 max-w-4xl text-center text-lg font-light text-[var(--gray-text-color)] sm:text-xl">
                            Descubre tu verdadero potencial con Vocations.
                            Nuestra plataforma impulsada por IA permite a los
                            estudiantes encontrar sus caminos profesionales
                            ideales mediante evaluaciones personalizadas y
                            planes de estudio adaptados.
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <div className="m-6 flex-1 rounded-3xl bg-[#ffffff] p-4 shadow-lg shadow-[#ccc]">
                                <Image
                                    src="/public.avif"
                                    alt="E-learning platforms, Hands of robot hold e-learning management system tools, digital education, online courses, interactive, technology, and educational technology."
                                    className="h-64 w-full rounded-3xl object-cover"
                                    width={1920}
                                    height={772}
                                />
                                <div className="px-4 py-6">
                                    <p className="mb-2 uppercase text-[var(--primary-color)]">
                                        Desbloquea tus fortalezas
                                    </p>
                                    <h3 className="mb-2 text-3xl font-medium">
                                        Realiza la evaluación vocacional
                                    </h3>
                                    <p className="mb-4 text-lg font-light text-[var(--gray-text-color)]">
                                        Participa en nuestra evaluación integral
                                        para descubrir tus habilidades e
                                        intereses, guiándote hacia opciones
                                        profesionales satisfactorias que se
                                        alineen contigo.
                                    </p>
                                    <Link
                                        href="/sign-up"
                                        className="flex items-center uppercase text-[var(--primary-color)] hover:underline">
                                        Comienza tu evaluación&nbsp;
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </div>
                            <div className="m-6 flex-1 rounded-3xl bg-[#ffffff] p-4 shadow-lg shadow-[#ccc]">
                                <Image
                                    src="/public2.avif"
                                    alt="Study Studying Learn Learning Classroom Internet Concept"
                                    className="h-64 w-full rounded-3xl object-cover"
                                    width={1858}
                                    height={1080}
                                />
                                <div className="px-4 py-6">
                                    <p className="mb-2 uppercase text-[var(--primary-color)]">
                                        Explora opciones de carrera
                                    </p>
                                    <h3 className="mb-2 text-3xl font-medium">
                                        Recibe sugerencias personalizadas
                                    </h3>
                                    <p className="mb-4 text-lg font-light text-[var(--gray-text-color)]">
                                        Nuestra inteligencia artificial analiza
                                        tus resultados y te ofrece trayectorias
                                        profesionales personalizadas que se
                                        ajustan a tu perfil, brindándote
                                        opciones informadas.
                                    </p>
                                    <Link
                                        href="/sign-up"
                                        className="flex items-center uppercase text-[var(--primary-color)] hover:underline">
                                        Ver sugerencias de carrera&nbsp;
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </div>
                            <div className="m-6 flex-1 rounded-3xl bg-[#ffffff] p-4 shadow-lg shadow-[#ccc]">
                                <Image
                                    src="/public3.avif"
                                    alt="Modern computer classroom featuring multiple monitors on white desks and blue chairs, bright natural light from windows, and a chalkboard at the front. Technology in education concept. 3d rendering"
                                    className="h-64 w-full rounded-3xl object-cover"
                                    width={1692}
                                    height={1080}
                                />
                                <div className="px-4 py-6">
                                    <p className="mb-2 uppercase text-[var(--primary-color)]">
                                        Ruta de aprendizaje personalizada
                                    </p>
                                    <h3 className="mb-2 text-3xl font-medium">
                                        Crea tu propia ruta de aprendizaje
                                        personalizada
                                    </h3>
                                    <p className="mb-4 text-lg font-light text-[var(--gray-text-color)]">
                                        Una vez que eliges una vocación, nuestra
                                        plataforma crea un plan de estudios
                                        detallado, dividiendo las materias y
                                        temas para ayudarte a tener éxito.
                                    </p>
                                    <Link
                                        href="/sign-up"
                                        className="flex items-center uppercase text-[var(--primary-color)] hover:underline">
                                        Explorar planes de estudio&nbsp;
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="mt-12 bg-[var(--light-background-color)] py-12 code-section"
                    id="svidmjs">
                    <div className="container mx-auto flex flex-col sm:flex-row">
                        <div className="mb-6 flex w-full flex-col items-center md:mb-0 md:w-[55%] md:flex-row">
                            <Image
                                src="/hero4.png"
                                alt="CTA"
                                className="h-auto w-full"
                                width={450}
                                height={450}
                            />
                        </div>
                        <div className="flex w-full flex-col justify-center p-8 md:w-[45%] md:pr-14">
                            <h3 className="mb-2 text-center text-3xl font-bold [font-family:var(--font-family-heading)] sm:text-left sm:text-6xl">
                                Descubre tu camino profesional ideal con
                                Vocations
                            </h3>
                            <p className="mb-12 text-center text-lg text-[var(--gray-text-color)] sm:text-left sm:text-xl">
                                Navega por el vasto mundo de las posibilidades
                                profesionales con nuestra plataforma impulsada
                                por IA, diseñada para estudiantes como tú.
                                Comienza tu viaje con una evaluación vocacional
                                única que revela tus fortalezas y pasiones.
                                Recibe sugerencias de carrera personalizadas y
                                emprende un recorrido educativo adaptado a tus
                                necesidades individuales.
                            </p>
                            <div className="mb-12 flex items-center justify-center md:items-start md:justify-start">
                                <Link
                                    href="/sign-up"
                                    className="items-center rounded bg-[var(--primary-button-bg-color)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-lg font-semibold text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)] hover:text-[var(--primary-button-hover-text-color)]">
                                    Comienza hoy mismo
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="pt-8 pb-16 code-section">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex m-8 text-xl font-bold items-center justify-center">
                            <Link
                                href="/"
                                className="text-3xl text-[var(--primary-color)] [font-family:var(--font-family-heading)]"
                                data-logo="">
                                <Image
                                    src="/logo.png"
                                    alt="Vocations Logo"
                                    width={100}
                                    height={100}
                                />{" "}
                            </Link>
                        </div>
                        <div className="mb-8 flex flex-col justify-center sm:flex-row">
                            <Link
                                href="/"
                                className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                Home
                            </Link>
                            <Link
                                href="/login"
                                className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="mx-8 text-lg text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                Sign Up
                            </Link>
                        </div>
                        <div className="mb-8">
                            <Link
                                href="/"
                                className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                            <Link
                                href="/"
                                className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                <FontAwesomeIcon icon={faXTwitter} />
                            </Link>
                            <Link
                                href="/"
                                className="mx-2 text-[var(--gray-text-color)] hover:text-[var(--primary-color)]">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Link>
                        </div>
                        <p className="text-lg text-[var(--gray-text-color)]">
                            © 2025 Vocations All Rights Reserved
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
