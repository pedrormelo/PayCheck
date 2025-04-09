import { Helmet } from "react-helmet";
import { Img, Button, Heading } from "../../components";
import Footer1 from "../../components/Footer1";
import Header1 from "../../components/Header1";
import React from "react";

export default function HomelPage() {
    return (
        <>
            <Helmet>
                <title>Contratos Dashboard - Manage Your Contracts Efficiently</title>
                <meta
                    name="description"
                    content="Access the contract dashboard to manage and track all contract details including status, due dates, and values. Stay organized with the GETI contract manager."
                />
            </Helmet>
            <div className="flex h-[1080px] flex-col lg:h-auto md:h-auto">
                <Header1 />
                <div className="mt-[126px] flex h-[836px] flex-col items-center lg:h-auto md:h-auto">
                    <Img src="images/img_vector_img.svg" alt="logo" className="ml-[15%] h-[94px] cursor-pointer" />
                    <div className="container-xs mt-10 flex h-[75px] w-[52%] items-center justify-center rounded-bl-[24px] rounded-br-[24px] rounded-tl-[52px] rounded-tr-[52px] p-3 lg:h-auto lg:px-5 md:h-auto md:px-5">
                        <div className="flex h-[38px] items-center gap-[22px] lg:h-auto md:h-auto md:flex-col">
                            <div className="flex h-[36px] flex-col items-center gap-1 lg:h-auto md:h-auto">
                                <Heading
                                    size="textxl"
                                    as="h1"
                                    className="h-[30px] w-[400px] cursor-text text-[26px] font-light text-colors2 lg:text-[22px]"
                                >
                                    buscar ID ou nome do contrato...
                                </Heading>
                                <div className="h-px w-full" />
                            </div>
                            <Button
                                color="blue_gray_100"
                                shape="round"
                                rightIcon={
                                    <Img
                                        src="images/img_arrowdown_black.svg"
                                        alt="Arrow Down"
                                        className="mb-2.5 mt-1.5 h-[12px] w-[24px] object-contain"
                                    />
                                }
                                className="min-w-[172px] gap-2.5 rounded-[18px] px-5 font-medium text-colors"
                            >
                                situação
                            </Button>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Button
                                color="blue_gray_100"
                                shape="round"
                                rightIcon={
                                    <Img
                                        src="images/img_arrowdown_black.svg"
                                        alt="Arrow Down"
                                        className="mb-2.5 mt-1.5 h-[12px] w-[24px] object-contain"
                                    />
                                }
                                className="min-w-[254px] gap-2.5 rounded-[18px] px-[34px] font-medium text-colors sm:px-4"
                            >
                                competência
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2.5 flex h-[452px] flex-col items-end gap-5 rounded-[34px] lg:h-auto md:h-auto">
                        <div className="flex h-[56px] items-center gap-4 rounded-tl-[28px] rounded-tr-[28px] p-2.5 lg:h-auto md:h-auto md:flex-col">
                            <Heading size="textmd" as="h2" className="h-[26px] text-[22px] font-medium text-colors1 lg:text-[18px]">
                                ID
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading size="textmd" as="h3" className="h-[26px] text-[22px] font-medium text-colors1 lg:text-[18px]">
                                EMPRESA
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading
                                size="textmd"
                                as="h4"
                                className="block h-[26px] text-[22px] font-medium text-colors1 lg:text-[18px]"
                            >
                                COMPETÊNCIA
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading size="textmd" as="h5" className="h-[26px] text-[22px] font-medium text-colors1 lg:text-[18px]">
                                SITUAÇÃO
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading
                                size="textmd"
                                as="h6"
                                className="h-[26px] text-center text-[22px] font-medium text-colors1 lg:text-[18px]"
                            >
                                DATA VEN
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading
                                size="textmd"
                                as="p"
                                className="h-[26px] text-center text-[22px] font-medium text-colors1 lg:text-[18px]"
                            >
                                DATA REN
                            </Heading>
                            <div className="h-[36px] w-[2px] md:h-[2px] md:w-[36px]" />
                            <Heading size="textmd" as="p" className="h-[26px] text-[22px] font-medium text-colors1 lg:text-[18px]">
                                VALOR
                            </Heading>
                        </div>
                        <div className="mb-[246px] mr-3 h-[128px] w-[8px] cursor-pointer rounded md:mr-0" />
                    </div>
                    <div className="mt-3 flex h-[54px] items-center gap-3.5 lg:h-auto md:h-auto">
                        <div className="flex h-[54px] items-center rounded-[26px] p-4 lg:h-auto md:h-auto">
                            <div className="h-[22px] w-[22px] rounded-[10px]" />
                        </div>
                        <Button size="xl" className="w-[186px] rounded-[26px] px-3.5">
                            <Img src="images/img_magnifying_glass.svg" />
                        </Button>
                    </div>
                    <Img src="images/img_qrcode1.svg" alt="qrcode" className="mt-4 h-[90px] object-cover" />
                </div>
                <Footer1 />
            </div>
        </>
    );
}