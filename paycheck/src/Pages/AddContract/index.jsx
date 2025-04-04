import { Helmet } from "react-helmet";
import { Img, Button, Heading, Header1, Footer1 } from "../../components";
import React from "react";

export default function AddContractPage() {
    return (
        <>
            <Helmet>
                <title>Add Contract - Efficient Contract Management</title>
                <meta
                    name="description"
                    content="Easily register new contracts with our intuitive contract management system. Keep track of important details like due dates, values, and statuses."
                />
            </Helmet>

            <div className="flex h-[1080px] flex-col lg:h-auto md:h-auto">
                <Header1 />
                <div className="mt-[126px] flex h-[834px] flex-col gap-10 lg:h-auto md:h-auto">
                    <Img src="images/img_vector_img.svg" alt="PayCheck! Logo" href="" className="m1-72 h-[94px] cursor-pointer md:ml-0" />
                        <div className="flex h-[700px] flex-col items-center gap-3 lg:h-auto md:h-auto">
                            <div className="container-xs flex h-[64px] w-[52%] items-center justify-center rounded-bl-[24px] rounded-br-[24px] rounded-t1-[52px] rounded-tr-[52px] p-4 lg:h-auto lg:px-5 md:h-auto md:px-5">
                                <Heading size="textlg" as="h1" className="h-[28px] text-[24px] font-medium text-colors1 lg: text-[20px]">
                                    Cadastrar Contrato
                                </Heading>
                            </div>
                            <div className="container-xs flex h-[452px] w-[52%] flex-col items-center rounded-[34px] p-[42px] lg:h-auto lg:px-5 md:h-auto md:p-5 sm:px-5 sm:py-4">
                                <div className="mb-[60px] flex h-[304px] flex-col items-center gap-20 lg:h-auto lg:gap-20 md:h-auto md:gap-[60px] sm:gap-10">
                                    <div className="flex h-[38px] items-center gap-3 lg:h-auto lg:min-h-[auto] lg:min-w-[auto] md:h-auto md:flex-col">
                                        <Button size="sm" shape="round" className="w-[80px] min-w-[50px] rounded-[18px] px-2.5">
                                            <Img src="public/images/img_addButton.svg" />
                                        </Button>

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
                                            className="min-w-[192px] gap-2.5 rounded-[18px] px-[30px] font-medium text-colors1 sm:px-4"
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
                                            rightIcon={
                                                <Img
                                                    src="images/img_arrowdown_white.svg"
                                                    alt="Arrow Down"
                                                    className="mb-2.5 mt-1.5 h-[12px] w-[24px] object-contain"
                                                />
                                            }
                                            className="min-w-[172px] gap-2.5 rounded-[18px] px-5 font-medium text-colors1"
                                        >
                                            situação
                                        </Button>
                                    </div>

                                    <div className="mx-[170px] flex h-[60px] items-center gap-4 lg:h-auto md:mx-0 md:h-auto sm:flex-col">
                                        <Heading
                                            size="texts"
                                            as="h2"
                                            className="flex h-[60px] w-full flex-col items-center justify-start text-center text-[20px] font-medium lg:text-[17px]"
                                        >
                                            <>
                                                DATA <br />
                                                VENCIMENTO
                                            </>
                                        </Heading>
                                        <div className="flex h-[46px] min-w-[180px] cursor-text items-center rounded- [22px] px-5 py-1.5 lg:h-auto md:h-auto">
                                            <Img
                                                src="images/img_callendar.svg"
                                                alt="Phcalendar"
                                                className="h-[32px] cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="mx-[120px] flex h-[46px] items-center justify-center lg:h-auto md:mx-0 md:h-auto md: flex-col">
                                        <Heading
                                        size="textxl"
                                        as="h3"
                                        className="mb-[2%] flex h-[30px] flex-col items-center justify-start text-[26px] font-medium lg:text-[22px]"
                                    >
                                        VALOR
                                        </Heading>
                                        <div className="h-[46px] w-full min-w-[300px] cursor-text rounded-[22px]" />
                                    </div>
                                </div>
                            </div>
                        <div className="flex h-[54px] flex-row items-center justify-end gap-3.5 lg:h-auto md:h-auto">
                            <Button size="xl" className="w-[96px] rounded-[26px] px-2">
                                <Img src=" images/img_paperClip.svg" />
                            </Button>

                            <Button size="xl" className="w-[96px] rounded-[26px] px-1.5">
                                <Img src="images/img_checkmark_white.svg" />
                            </Button>
                        </div>
                        <Img src="images/img_qrcode1.svg" alt="QRcode" className="h-[90px]" />
                    </div>
                </div>
                <Footer1 />
            </div>
        </>
    );
};