<template>
    <div class="index-search">
        <div class="div">
            <img class="frame" alt="Frame" :src="frame1" />

            <div class="overlap-group">
                <div class="frame-2">
                    <div class="frame-3">
                        <p class="text-wrapper">buscar ID ou nome do contrato...</p>

                        <img class="line" alt="Line" :src="line1" />
                    </div>

                    <div class="frame-4">
                        <div class="text-wrapper-2">situação</div>

                        <WeuiArrowFilledWrapper class="weui-arrow-filled" />
                    </div>

                    <img class="img" alt="Line" :src="line3" />

                    <div class="frame-5">
                        <div class="text-wrapper-2">competência</div>

                        <WeuiArrowFilled class="weui-arrow-filled-instance" />
                    </div>
                </div>

                <div class="frame-2">
                    <div class="frame-3">
                        <p class="text-wrapper">buscar ID ou nome do contrato...</p>

                        <img class="line" alt="Line" :src="line12" />
                    </div>

                    <div class="frame-4">
                        <div class="text-wrapper-2">situação</div>

                        <img class="vector" alt="Vector" :src="vector" />
                    </div>

                    <img class="img" alt="Line" :src="line32" />

                    <div class="frame-5">
                        <div class="text-wrapper-2">competência</div>

                        <img class="vector" alt="Vector" :src="image" />
                    </div>
                </div>
            </div>

            <img class="group" alt="Group" :src="group2" />

            <div class="frame-6">
                <p class="p">
                    Gerenciador de Contratos do GETI da Sec. de Saúde - Jaboatão dos
                    Guararapes - Março de 2025 -
                </p>

                <div class="text-wrapper-3">Ver: 0.1.0</div>
            </div>

            <img class="frame-7" alt="Frame" :src="frame21" />

            <div class="frame-8">
                <div class="text-wrapper-4">STOCK</div>

                <img class="img" alt="Line" :src="line2" />

                <div class="text-wrapper-4">SysTab</div>
            </div>

            <img class="frame-9" alt="Frame" :src="frame9" />
        </div>
    </div>
</template>

<script>
import { WeuiArrowFilled } from "./WeuiArrowFilled";
import { WeuiArrowFilledWrapper } from "./WeuiArrowFilledWrapper";
import frame1 from "./frame-1.svg";
import frame21 from "./frame-2-1.png";
import frame9 from "./frame-9.svg";
import group2 from "./group-2.png";
import image from "./image.svg";
import line12 from "./line-1-2.svg";
import line1 from "./line-1.svg";
import line2 from "./line-2.svg";
import line32 from "./line-3-2.svg";
import line3 from "./line-3.svg";
import vector from "./vector.svg";

export default {
    name: "IndexSearch",
    components: {
        WeuiArrowFilled,
        WeuiArrowFilledWrapper
    },
    data() {
        return {
            frame1,
            frame21,
            frame9,
            group2,
            image,
            line12,
            line1,
            line2,
            line32,
            line3,
            vector
        };
    }
};
</script>

<style>
.index-search {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
}

.index-search .div {
    background-color: #ffffff;
    height: 1080px;
    position: relative;
    width: 1920px;
}

.index-search .frame {
    height: 62px;
    left: 1270px;
    position: absolute;
    top: 867px;
    width: 194px;
}

.index-search .overlap-group {
    border-radius: 52px 52px 24px 24px;
    height: 65px;
    left: 460px;
    position: absolute;
    top: 327px;
    width: 1000px;
}

.index-search .frame-2 {
    align-items: center;
    background-color: #0e0e0e;
    border-radius: 52px 52px 24px 24px;
    display: flex;
    gap: 23px;
    height: 65px;
    left: 0;
    padding: 13px 41px;
    position: absolute;
    top: 0;
    width: 1000px;
}

.index-search .frame-3 {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    height: 34px;
    justify-content: flex-end;
    position: relative;
    width: 403px;
}

.index-search .text-wrapper {
    color: #979797;
    font-family: "Kantumruy Pro-Light", Helvetica;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 39px;
    margin-top: -6.00px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.index-search .line {
    align-self: stretch;
    height: 1px;
    margin-bottom: -0.50px;
    object-fit: cover;
    position: relative;
    width: 100%;
}

.index-search .frame-4 {
    align-items: center;
    background-color: #d9d9d9;
    border-radius: 28px;
    display: flex;
    gap: 10px;
    height: 39px;
    justify-content: center;
    padding: 6px 21px;
    position: relative;
    width: 172px;
}

.index-search .text-wrapper-2 {
    color: #000000;
    font-family: "Kantumruy Pro-Medium", Helvetica;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 36px;
    margin-bottom: -3.50px;
    margin-top: -5.50px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.index-search .weui-arrow-filled {
    left: unset !important;
    position: relative !important;
    top: unset !important;
    transform: unset !important;
}

.index-search .img {
    height: 36px;
    position: relative;
    width: 2px;
}

.index-search .frame-5 {
    align-items: center;
    background-color: #d9d9d9;
    border-radius: 28px;
    display: flex;
    gap: 10px;
    height: 39px;
    justify-content: center;
    padding: 6px 21px;
    position: relative;
    width: 254px;
}

.index-search .weui-arrow-filled-instance {
    height: 12px !important;
    position: relative !important;
    width: 24px !important;
}

.index-search .vector {
    height: 7.36px;
    position: relative;
    width: 12.73px;
}

.index-search .group {
    height: 460px;
    left: 456px;
    position: absolute;
    top: 403px;
    width: 1008px;
}

.index-search .frame-6 {
    align-items: center;
    background-color: #0e0e0e;
    display: flex;
    gap: 10px;
    height: 40px;
    justify-content: center;
    left: 0;
    padding: 7px 726px;
    position: absolute;
    top: 1040px;
    width: 1920px;
}

.index-search .p {
    color: #ffffff;
    font-family: "Kantumruy Pro-Medium", Helvetica;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 21px;
    margin-left: -129.50px;
    margin-right: -60.50px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.index-search .text-wrapper-3 {
    color: #ffffff;
    font-family: "Kantumruy Pro-Medium", Helvetica;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 21px;
    margin-right: -129.50px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.index-search .frame-7 {
    height: 91px;
    left: 1817px;
    object-fit: cover;
    position: absolute;
    top: 937px;
    width: 91px;
}

.index-search .frame-8 {
    align-items: center;
    background-color: #0e0e0e;
    display: flex;
    gap: 45px;
    height: 67px;
    justify-content: center;
    left: 0;
    padding: 11px 784px;
    position: absolute;
    top: -2px;
    width: 1920px;
}

.index-search .text-wrapper-4 {
    color: #ffffff;
    font-family: "Kantumruy Pro-Medium", Helvetica;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 36px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.index-search .frame-9 {
    height: 62px;
    left: 1178px;
    position: absolute;
    top: 867px;
    width: 87px;
}
</style>