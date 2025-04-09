import { Helmet } from "react-helmet";
import { Img, Heading, Button } from "../../components";
import Footer1 from "../ ../components/Footer1";
import Header1 from "../../components/Header1";
import React from "react";

export default function ContractDetailsPage() {
    return (
        <>
            <Helmet>
                <title>Detalhes do Contrato</title>
                <meta name="description" content="Descrições" />
            </Helmet>
            <div className="flex h-[1080px] flex-col items-center lg:h-auto md:h-auto">
                <Header1 />
                <div className="mx-auto mt-[126px] flex h-[834px] w-full max-w-[1894px] flex-col items-center gap-3.5 lg:h-auto lg:px-5 md:h-auto md:px-5">
                    <div className="mx-[274px] flex h-[730px] flex-col gap-10 lg:h-auto md:mx-0 md:h-auto">
                        <Img
                            src="images/img_vector_img.svg"
                            alt="Logo"
                            className="h-[94px] cursor-pointer"
                        />
                        <div className="mx-[172px] flex h-[594px] flex-col gap-3 lg:h-auto md:mx-0 md:h-auto">
                            <Button
                                size="2x1"
                                className="rounded-bl-[24px] rounded-br-[24px] rounded-t1-[52px] rounded-tr-[52px] px-[34px] font-medium text-colors1 sm:px-4"
                            >
                                Detalhes do Contrato
                            </Button>
                            <div className="flex h-[452px] flex-col items-stant gap-5 rounded-[34px] px-[42px] py-8 lg:h-auto md:h-auto md:px-5 sm:p-4">
                                <div className="flex h-[38px] flex-wrap items-center gap-[132px] lg:h-auto lg:gap-5 md:h-auto md: gap-5">
                                    <Heading
                                        as="h1"
                                        className="h-[38px] text-[32px] font-semibold 1g: text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        ID:
                                    </Heading>
                                    <Heading
                                        as="h2"
                                        className="h-[38px] text-[32px] font-semibold lg: text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        DATA REN:
                                    </Heading>
                                    <Heading
                                        as="h3"
                                        className="h-[38px] text-[32px] font-semibold Ig:text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        DATA VEN:
                                    </Heading>
                                </div>
                                <div className="flex h-[38px] flex-wrap items-center lg:h-auto md:h-auto">
                                    <Heading
                                        as="h4"
                                        className="h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        COMPETÊNCIA :
                                    </Heading>
                                    <Heading
                                        as="h5"
                                        className="mr-[150px] h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        ÚLTIMO PAGAMENTO:
                                    </Heading>
                                </div>
                                <Heading
                                    as="h6"
                                    className="h-[38px] text-[32px] font-semibold 1g:text-[27px] md:text-[26px] sm:text-[24px]"
                                >
                                    EMPRESA
                                </Heading>
                                <Heading
                                    as="h2"
                                    className="h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                >
                                    VALOR :
                                </Heading>
                                <Heading
                                    as="h2"
                                    className="h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                >
                                    SITUAÇÃO :
                                </Heading>
                                <div className="mb-[42px] flex h-[48px] items-center lg:h-auto md:h-auto sm:flex-col">
                                    <Heading
                                        as="h2"
                                        className="h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                    >
                                        ANEXO:
                                    </Heading>
                                    <Button
                                        size="lg"
                                        className="ml-3.5 w-[86px] rounded-[24px] px-1 sm:ml-0"
                                    >
                                        <Img src="images/img_downloadButton.svg" />
                                    </Button>
                                    <Heading
                                        as="h2"
                                        className="m1-9 h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:ml-0 sm:text-[24px]"
                                    >
                                        MESES ATRASADOS:
                                    </Heading>
                                </div>
                            </div>
                            <div className="flex h-[54px] items-center gap-3 lg:h-auto md:h-auto">
                                <div className="flex h-[54px] items-center gap-3.5 lg:h-auto md:h-auto">
                                    <div className="flex h-[54px] cursor-pointer items-center rounded-[26px] p-2.5 lg:h-auto md:h-auto">
                                        <Img
                                            src="images/img_cash-register.svg"
                                            alt="Tablercash"
                                            className="h-[32px]"
                                        />
                                    </div>
                                    <div className="flex h-[54px] cursor-pointer items-center rounded-[26px] p-1.5 lg:h-auto md:h-auto">
                                        <Img
                                            src="images/img_clock-bold.svg"
                                            alt="Clock"
                                            className="h-[38px]"
                                        />
                                    </div>
                                </div>
                                <div className="flex h-[54px] cursor-pointer items-center rounded-[26px] p-2 lg:h-auto md:h-auto">
                                    <Img
                                        src="images/img_pencil.svg"
                                        alt="Edit"
                                        className="h-[34px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Img src="images/img_qrcode2.svg" alt="qrcode" className="h-[90px]" />
                </div>
                <Footer1 />
            </div>
        </>
    );
}
