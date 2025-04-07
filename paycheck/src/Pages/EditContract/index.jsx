import { Helmet } from "react-helmet";
import {Img, Button, Heading } from "../../components" ;
import Footer1 from "../../ components/Footer1";
import Header1 from "../.. /components/Header1";
import React from "react";

export default function EditContractPage() {
    return (
        <>
            <Helmet>
                <title>Editar Contrato</title>
                <meta
                    name="description"
                    content="descrições"
                />
            </Helmet>
            <div className="flex h-[1080px] flex-col lg:h-auto md:h-auto">
                <Header1 />
                <div className="mt-[126px] flex h-[834px] flex-col items-center lg:h-auto md:h-auto">
                    <Img src="images/img_vector_img.svg" alt="logo" className="m1-[15%] h-[94px] cursor-pointer" />
                    <div className="container-xs mt-10 flex h-[64px] w-[52%] items-center justify-center rounded-bl-[24px] rounded-br-[24px] rounded-tl-[52px] rounded-tr-[52px] p-4 lg:h-auto lg:px-5 md:h-auto md:px-5">
                        <Heading size="textlg" as="h1" className="h-[28px] text-[24px] font-medium !text-colors1 lg: text-[20px]">
                            Editar Contrato
                        </Heading>
                    </div>
                    <div className="mt-3 flex h-[452px] items-center rounded-[34px] p-[54px] lg:h-auto md:h-auto md:p-5 sm:p-4">
                        <div className="mb-4 flex h-[326px] flex-col gap-12 lg:h-auto md:h-auto">
                            <div className="flex h-[38px] items-center gap-3 lg:h-auto md:h-auto md: flex-col">
                                <Button
                                    color="black_900_01"
                                    shape="round"
                                    rightIcon={
                                        <Img
                                            src="images/img_arrowdown_white.svg"
                                            alt="Arrow Down"
                                            className="mb-3 mt-1 h-[12px] w-[24px] object-contain"
                                        />
                                    }
                                    className="min-w-[192px] gap-2.5 rounded- [18px] px-[30px] font-medium text-colors1 sm: px-4"
                                >
                                    empresa
                                </Button>
                                <Button
                                    color="black_900_01"
                                    shape="round"
                                    rightIcon={
                                        <Img
                                            src="images/img_arrowdown_white.svg"
                                            alt="Arrow Down"
                                            className="mb-2.5 mt-1.5 h-[12px] w-[24px] object-contain"
                                        />
                                    }       
                                    className="min-w-[254px] gap-2.5 rounded-[18px] px-[34px] font-medium text-colors1 sm:px-4"
                                >
                                    competência
                                </Button>
                                <Button
                                    color="black_900_01"
                                    shape="round"
                                    righticon={
                                        < Img
                                            src="images/img_arrowdown_white.svg"
                                            alt="Arrow Down"
                                            className="mb-2.5 mt-1.5 h-[12px] w-[24px] object-contain"
                                        />
                                    }
                                    className="min-w-[172px] gap-2.5 rounded- [18px] px-5 font-medium text-colors1"
                                >
                                    situação
                                </Button>
                            </div>
                            <div className="mx-11 flex h-[46px] items-center gap-9 lg:h-auto md:mx-0 md:h-auto md: flex-col">
                                <Heading size="textxl" as="h2" className="h-[30px] text-[26px] font-medium lg: text-[22px]">
                                    DATA VEN:
                                </Heading>
                                <div className="flex h-[46px] items-center rounded-[22px] px-5 py-1.5 lg:h-auto md:h-auto">
                                    <Img
                                        src="images/img_callendar.svg"
                                        alt="Dateselection"
                                        className="h-[32px] cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="mx-[82px] flex h-[46px] items-center lg:h-auto md:mx-0 md:h-auto md: flex-col">
                                <Heading size="textxl" as="h3" className="h-[30px] text-[26px] font-medium lg:text-[22px]">
                                    VALOR:
                                </Heading>
                                <div className="h-[46px] cursor-text rounded-[22px]" />
                            </div>
                            <div className="mx-[132px] flex h-[48px] items-center gap-3.5 lg:h-auto md:mx-0 md:h-auto md: flex-col">
                                <Heading
                                    as="h4"
                                    className="h-[38px] text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                                >
                                    ANEXO :
                                </Heading>
                                <Button size="lg" className="w-[86px] rounded-[24px] px-1">
                                    <Img src="images/img_downloadButton.svg" />
                                </Button>
                                <Button size="lg" className="w-[62px] rounded-[24px] px-2">
                                    <Img src="images/img_trash.svg" />
                                </Button>
                                <Button size="lg" className="w-[62px] rounded-[24px] px-1">
                                    <Img src="images/img_paperClip.svg" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex h-[54px] items-center gap-3.5 lg:h-auto md:h-auto">
                        <Button size="xl" className="w- [62px] rounded- [26px] px-3">
                            <Img src="images/img_trash.svg" />
                        </Button>
                        <Button size="xl" className="w-[96px] rounded-[26px] px-1.5">
                            <Img src="images/img_checkmark_white.svg" />
                        </Button>
                    </div>
                    <Img src="images/img_qrcode1.svg" alt="qrcode" className="mt-3.5 h-[90px]" />
                </div>
                <Footer1 />
            </div>
        </>
    );
}