import { Helmet } from "react-helmet";
import { Img, Button, Heading } from "../../components";
import Footer1 from "../ ../components/Footer1";
import Header1 from "../../components/Header1";
import React from "react";

export default function AddEmpresaPage() {
    return (
        <>
            <Helmet>
                <title>Adicionar Contrato - Adicione Seu Contrato</title>
                <meta
                    name="description"
                    content="Register companies quickly into our system and manage your business contacts effectively. Organize company information for easy access."
                />
            </Helmet>
            <div className="flex h-[1080px] flex-col lg:h-auto md:h-auto">
                <Header1 />
                <div className="mt-[126px] flex h-[834px] flex-col items-start lg:h-auto md:h-auto">
                    <Img src="images/img_vector_img.svg" alt="Logo" className="ml-[16%] h-[94px] cursor-pointer" />
                    <div className="container-xs mt-10 flex h-[64px] w-[52%] items-center justify-center rounded-bl-[24px] rounded-br-[24px] rounded-tl-[52px] rounded-tr-[52px] p-4 lg:h-auto lg:px-5 md:h-auto md:px-5">
                        <Heading size="textlg" as="h1" className="h-[28px] text-[24px] font-medium !text-colors1 lg:text-[20px]">
                            Cadastrar Empresa
                        </Heading>
                    </div>
                    <div className="mt-3 flex h-[318px] items-center gap-3.5 lg:h-auto md:h-auto md:flex-col">
                        <div className="flex h-[318px] flex-col items-end gap-3 lg:h-auto md:h-auto md: px-5">
                            <div className="mx-auto flex h-[252px] w-full max-w-[582px] flex-col items-center gap-9 rounded-[34px] p-[34px] 1g:h-auto lg:px-5 md:h-auto sm:p-4">
                                <Heading size="textxl" as="h2" className="h-[30px] text-[26px] font-medium lg: text-[22px]">
                                    NOME DA EMPRESA
                                </Heading>
                                <div className="mb-[66px] h-[46px] rounded-[22px]" />
                            </div>
                            <Button size="xl" className="w-[96px] rounded-[26px] px-1.5">
                                <Img src="images/img_checkmark_white.svg" />
                            </Button>
                        </div>
                        <div className="mx-auto flex h-[318px] w-full max-w-[402px] items-start justify-center rounded-[34px] lg:h-auto lg:px-5 md:h-auto md:px-5">
                            <div className="mb-[118px] flex h-[200px] flex-col gap-4 lg:h-auto md:h-auto">
                                <div className="flex h-[54px] items-center rounded-tl-[26px] rounded-tr-[26px] p-3 lg:h-auto md:h-auto">
                                    <Heading
                                        size="textmd"
                                        as="h3"
                                        className="h-[26px] text-[22px] font-medium !text-colors1 lg:text-[18px]"
                                    >
                                        EMPRESAS
                                    </Heading>
                                </div>
                                <div className="mx-auto flex h-[318px] w-full max-w-[402px] items-start justify-center rounded-[34x] lg:h-auto lg:px-5 md:h-auto md:px-5">
                                    <div className="mb-[118px] flex h-[200px] flex-col gap-4 lg:h-auto md:h-auto">
                                        <div className="flex h-[54px] items-center rounded-tl-[26px] rounded-tr-[26px] p-3 lg:h-auto md:h-auto">
                                            < Heading
                                                size="textmd"
                                                as="h3"
                                                className="h-[26px] text-[22px] font-medium !text-colors1 lg: text-[18px]"
                                            >
                                                EMPRESAS
                                            </Heading>
                                        </div>
                                        <div className="mx-3 flex h-[128px] items-start gap-3.5 lg:h-auto md:mx-0 md:h-auto sm:flex-col">
                                            <div className="flex h-[46px] flex-col gap-2.5 lg:h-auto md:h-auto">
                                                <div className="mx-3 flex h-[34px] items-center lg:h-auto md:mx-0 md: h-auto">
                                                    <Heading size="textmd" as="h4" className="h-[26px] text-[22px] font-medium lg:text-[18px]">
                                                        EMPRESA 1
                                                    </Heading>
                                                    <Button size="xs" shape="round" className="w-[60px] rounded-[16px] px-1">
                                                        <Img src="images/img_trash.svg" />
                                                    </Button>
                                                </div>
                                                <div className="h-px" />
                                            </div>
                                            <div className="h-[128px] w-[8px] rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Img src="images/img_qrcode2.svg" alt="Qrcode" className="mt-[214px] h-[90px]" />
                        </div>
                        <Footer1 />
                    </div>
                </div>
            </div>
        </>
    );
}