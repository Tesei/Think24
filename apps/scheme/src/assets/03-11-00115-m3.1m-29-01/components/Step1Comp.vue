<template>
  <h2 class="title mb-7 text-center">
    Состав оборудования:
  </h2>
  <div class="main__row grid grid-cols-3 w-full mx-4 gap-12">
    <div
      v-for="(item, index) in names"
      :key="index"
      class="main__cell cell flex w-full h-[175px] rounded-xl align-center"
      style="box-shadow: 0px 4px 4px rgba(12, 110, 214, 0.16)"
    >
      <div class="cell__image-wrapper w-[174px] h-full mr-3 ">
        <base-img
          :src="images[index + 1 + '.png']"
          alt="прибор"
          class="cell-image w-full f-full"
          is-cover
          is-full
        />
      </div>
      <h3 class="cell__text text-lg font-normal self-center">
        {{ item }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseImg from '@/components/BaseImg.vue'
import { getImagesFromPublic } from '@/use/scheme'

const images = getImagesFromPublic()
const names = ['Источник тока', 'Магнитный держатель 1', 'Магнитный держатель 2', 'Поляроид № 1', 'Поляроид № 2', 'Электрическая лампа', 'Ключ', 'Экран', 'Cоединительные провода']

</script>
