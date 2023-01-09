<template>
    <div
        class="main main__content relative flex self-start items-start justify-self-start h-full w-full"
        @click="registerClick"
    >
        <div class="main__icons-wrapper flex flex-col mr-[110px] ml-[80px] min-w-[160px]">

            <div
                class="main__ekran-icon cursor-pointer relative mb-3"
                v-if="!ekran.showItem"
            >
                <base-img
                    class="w-[150px] h-[150px]"
                    :src="images['ekranIcon.png']"
                    is-cover
                    is-full
                />
                <div
                    class="main__tap-icon-wrapper z-10 w-16 h-16 rounded-full flex justify-center items-center absolute -bottom-4 -right-8">
                    <base-icon
                        class="icon text-white w-7 h-14 "
                        name="tapIcon"
                    />
                </div>
            </div>

            <div
                class="main__polaroid-icon cursor-pointer relative"
                v-if="_IconPoalriod"
            >
                <base-img
                    class="w-[150px] h-[150px]"
                    :src="images['polaroidIcon.png']"
                    is-cover
                    is-full
                />
                <div
                    class="main__tap-icon-wrapper w-16 h-16 rounded-full flex justify-center items-center absolute -bottom-4 -right-8"
                    v-show="ekran.showItem || step === 4"
                >
                    <base-icon
                        class="icon text-white w-7 h-14"
                        name="tapIcon"
                    />
                </div>
            </div>

        </div>
        <div
            class="main__text-todo text-todo bg-white p-6 rounded-xl flex items-start min-w-[700px]">
            <div class="text-todo__bullit mr-3">
                <base-bullit :number="(step + 1)" />
            </div>
            <h3 class="text-todo__text font-normal max-w-[612px] whitespace-normal leading-6">{{
            scenarioText[step] }}</h3>
        </div>

        <div
            class="main__electric-tools absolute -bottom-12 left-0 cursor-pointer "
            :class="[{ 'opacity-50': step === 0 }, { 'hover:brightness-[0.9] transition-all': step !== 0 }]"
        >
            <base-img
                :src=_ElectricToolLight
                is-cover
                is-full
            />
        </div>

        <div
            class="main__polaroid-parametrs parametrs-container_1 absolute bottom-[250px] left-[465px] rounded-xl p-[2px] flex cursor-pointer"
            v-if="polaroidOne.active"
        >
            <div
                class="parametrs-container__number"
                v-for="(percent, index) in degreesPolaroids"
                :key=index
                :class="[`parametrs-container__number_${percent}-1`, { '_active': polaroidOne.parametrs === percent }]"
            >{{ percent }}</div>
        </div>
        <div
            class="main__polaroid main__polaroid_1 absolute bottom-[20px] left-[560px] hover:brightness-[0.9] transition-all"
            v-if="polaroidOne.showItem"
        >
            <base-img
                :src="images['polaroid.png']"
                is-cover
                is-full
            />
        </div>
        <div
            class="main__polaroid-flag main__polaroid-flag_1 left-[555px]"
            v-if="polaroidOne.showItem"
            :class="_AnimationPositionFlagOne"
        >
        </div>

        <div
            class="main__polaroid-parametrs parametrs-container_2 absolute bottom-[250px] left-[720px] rounded-xl p-[2px] flex cursor-pointer"
            v-if="polaroidTwo.active"
        >
            <div
                class="parametrs-container__number"
                v-for="(percent, index) in degreesPolaroids"
                :key=index
                :class="[`parametrs-container__number_${percent}-2`, { '_active': polaroidTwo.parametrs === percent }]"
            >{{ percent }}</div>
        </div>
        <div
            class="main__polaroid main__polaroid_2 absolute bottom-[20px] left-[810px] hover:brightness-[0.9] transition-all"
            v-if="polaroidTwo.showItem"
        >
            <base-img
                :src="images['polaroid.png']"
                is-cover
                is-full
            />
        </div>
        <div
            class="main__polaroid-flag main__polaroid-flag_2 left-[805px]"
            v-if="polaroidTwo.showItem"
            :class="_AnimationPositionFlagTwo"
        >
        </div>

        <div
            class="main__ekran absolute -bottom-[220px] right-[10px]"
            v-if="ekran.showItem"
        >
            <base-img
                :src=_EkranLight
                is-cover
                is-full
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseImg from '@/components/BaseImg.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseBullit from '@/components/BaseBullit.vue'
import { getImagesFromPublic } from '@/use/scheme'
import { ref, computed, watch } from 'vue'

interface ParametersItem {
    active?: boolean,
    parametrs?: number | string,
    showItem: boolean
}

const images = getImagesFromPublic()
const scenarioText = [
    'В одну линию поставь лампу, держатель с поляроидом № 1, экран.',
    'Замкни электрическую цепь, состоящую из источника тока, ключа и лампы на подставке. Получи на экране светлое пятно.',
    'Поверни поляроид относительно горизонтальной оси на 90°, 180°, 270°. Пронаблюдай за изменением яркости пятна на экране.',
    'Разомкни цепь с помощью ключа.',
    'Установи между экраном и поляроидом № 1 поляроид № 2 в магнитном держателе 2 так, чтобы оси поляроидов совпадали.',
    'Замкни ключ и получи изображение на экране. Сделай вывод о яркости пятна.',
    'Поверни второй поляроид относительно горизонтальной оси на 90°, 180°, 270°. Пронаблюдай за изменением яркости пятна на экране. При этом поляроид №1 должен оставаться неподвижным.',
    'Установи оба поляроида в начальное положение так, чтобы оси поляроидов совпали.',
    'Поверни первый поляроид относительно горизонтальной оси на 90°, 180°, 270°.Пронаблюдай за изменением яркости пятна на экране.При этом поляроид № 2 должен оставаться неподвижным.',
    'Сделай общий вывод о влиянии взаимной ориентации поляроидов на яркость (интенсивность) света.'
]
const scenario = [
    ['.main__ekran-icon', '.main__polaroid-icon'],
    ['.main__electric-tools'],
    ['.parametrs-container__number_90-1', '.parametrs-container__number_180-1', '.parametrs-container__number_270-1'],
    ['.main__electric-tools'],
    ['.main__polaroid-icon'],
    ['.main__electric-tools'],
    ['.parametrs-container__number_90-2', '.parametrs-container__number_180-2', '.parametrs-container__number_270-2'],
    ['.parametrs-container__number_0-1', '.parametrs-container__number_0-2'],
    ['.parametrs-container__number_90-1', '.parametrs-container__number_180-1', '.parametrs-container__number_270-1'],
    []
]

let step = ref<number>(0) // max step = 9
const polaroidOne = ref<ParametersItem>({ active: false, parametrs: 0, showItem: false })
const polaroidTwo = ref<ParametersItem>({ active: false, parametrs: 0, showItem: false })
const ekran = ref<ParametersItem>({ showItem: false })
const electricTools = ref<ParametersItem>({ active: false, showItem: true })
const degreesPolaroids = [0, 90, 180, 270]

const _ElectricToolLight = computed(() => !electricTools.value.active ? images.value['lightOFF.png'] : images.value['lightON.png'])
const _IconPoalriod = computed(() => step.value === 0 && !polaroidOne.value.showItem || step.value === 4 && !polaroidTwo.value.showItem)
const _DifferenceDegree = computed(() => {
    if (typeof polaroidOne.value.parametrs === 'number'
        && typeof polaroidTwo.value.parametrs === 'number') {
        return Math.abs(polaroidOne.value.parametrs - polaroidTwo.value.parametrs)
    }
})
const _EkranLight = computed(() => {
    if (electricTools.value.active && polaroidOne.value.showItem) {
        if (!polaroidTwo.value.showItem) return images.value['ekranLowLight.png']

        else if (_DifferenceDegree.value === 0 || _DifferenceDegree.value === 180)
            return images.value['ekranHighLight.png']
    }
    return images.value['ekranClear.png']
})
const _AnimationPositionFlagOne = computed(() => { return `position-${polaroidOne.value.parametrs}` })
const _AnimationPositionFlagTwo = computed(() => { return `position-${polaroidTwo.value.parametrs}` })

const registerClick = (value: any) => {

    // Включение/отключение света:
    if (value.target.closest('.main__electric-tools') && step.value !== 0) electricTools.value.active = !electricTools.value.active

    // открытие/закрытие панели управления поворотом полароида
    if (value.target.closest('.main__polaroid')) {
        value.target.closest('.main__polaroid_1')
            ? polaroidOne.value.active = !polaroidOne.value.active
            : polaroidTwo.value.active = !polaroidTwo.value.active
    }

    // Видимость предметов:
    if (value.target.closest('.main__polaroid-icon')) {
        step.value === 0
            ? polaroidOne.value.showItem = true
            : polaroidTwo.value.showItem = true
    }
    if (value.target.closest('.main__ekran-icon')) ekran.value.showItem = true

    // Изменение состояния полароидов
    if (value.target.closest('.parametrs-container__number')) {
        value.target.closest('.parametrs-container_1')
            ? polaroidOne.value.parametrs = +value.target.innerHTML
            : polaroidTwo.value.parametrs = +value.target.innerHTML
    }

    // Регистрация шагов сценария:
    if (scenario[step.value]) {
        for (let index = 0; index < scenario[step.value].length; index++) {
            const element = scenario[step.value][index]
            if (value.target.closest(element)) scenario[step.value].splice(index, 1)
        }
        if (scenario[step.value].length === 0
            && step.value !== scenarioText.length) step.value++
    }
}

// выявление уже активированных показателей
const findReadyItem = () => {
    scenario[step.value] = scenario[step.value].filter(item => {
        return item !== `.parametrs-container__number_${polaroidTwo.value.parametrs}-2`
            && item !== `.parametrs-container__number_${polaroidOne.value.parametrs}-1`
    })
}
watch(step, () => findReadyItem())

</script>

<style scoped lang="scss">
.main__tap-icon-wrapper,
.main__polaroid-parametrs {
    background-color: var(--color-blue-200);
}

.main__text-todo {
    box-shadow: 0px 4px 4px rgba(12, 110, 214, 0.16);
}

.parametrs-container__number {
    @apply text-white w-[55px] h-10 text-lg rounded-xl flex justify-center gap-x-1 items-center;

    &._active {
        color: var(--color-blue-200);
        @apply bg-white
    }
}

.main__polaroid-flag {
    animation-timing-function: cubic-bezier(.79, .29, .29, .89);
    animation-iteration-count: 1;
    animation-delay: 0s;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-duration: .2s;
    @apply absolute w-[70px] h-[150px] bottom-[95px] pointer-events-none;
}

.position-0 {
    animation-name: set0;
}

.position-90 {
    animation-name: set90;
}

.position-180 {
    animation-name: set180;
}

.position-270 {
    animation-name: set270;
}

@keyframes set90 {
    0% {
        background: url('../flags.png') -1px 55px/auto auto no-repeat;
    }

    33% {
        background: url('../flags30.png') 2px 30px/auto auto no-repeat;
    }

    66% {
        background: url('../flagsVertical30.png') 8px 8px/auto auto no-repeat;
        transform: skew(-3deg, 10deg);
    }

    100% {
        background: url('../flagsVertical.png') 20px 2px/auto auto no-repeat;
    }
}

@keyframes set0 {
    0% {
        background: url('../flagsVertical.png') 20px 2px/auto auto no-repeat;
    }

    40% {
        background: url('../flagsVertical30.png') 8px 8px/auto auto no-repeat;
        transform: skew(-3deg, 10deg);
    }

    75% {
        background: url('../flags30.png') 2px 30px/auto auto no-repeat;
    }

    100% {
        background: url('../flags.png') -1px 55px/auto auto no-repeat;
    }
}

@keyframes set180 {
    0% {
        background: url('../flagsVertical.png') 20px 2px/auto auto no-repeat;
    }

    35% {
        background: url('../flagsVertical30-2.png') -22px 14px/auto auto no-repeat;
    }

    65% {
        background: url('../flags30-2.png') -1px 30px/auto auto no-repeat;
    }

    100% {
        background: url('../flags.png') -1px 55px/auto auto no-repeat;
    }
}

@keyframes set270 {
    0% {
        background: url('../flags.png') -1px 55px/auto auto no-repeat;
    }

    35% {
        background: url('../flags30-2.png') -1px 30px/auto auto no-repeat;
    }

    65% {
        background: url('../flagsVertical30-2.png') -22px 14px/auto auto no-repeat;
    }

    100% {
        background: url('../flagsVertical.png') 20px 2px/auto auto no-repeat;
    }
}
</style>
