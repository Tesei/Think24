import BaseDescription from '@/components/BaseDescription.vue'
import type { IHandlerArguments, ISchemeOptions } from '@/use/scheme'
import Step1Comp from '@/assets/03-11-00115-m3.1m-29-01/components/Step1Comp.vue'
import Step2Comp from '@/assets/03-11-00115-m3.1m-29-01/components/Step2Comp.vue'
import { EmitsCommonEnum } from '@/enums'
import { useEvents } from '@/use/events'
import SmilesBarModal from '@/components/modals/SmilesBarModal.vue'

if (import.meta.env.VITE_VARIABLES === '03-11-00115-m3.1m-29-01') {
  import('@/assets/03-11-00115-m3.1m-29-01/style.scss')
}

export const options: ISchemeOptions = {
  theme: 'high',
  withoutCheckSwitch: true
}

export const steps = [
  {
    layout: {
      props: {
        primary: true,
        firstStep: true,
        title: 'Наблюдение поляризации света'
      }
    },
    components: [
      {
        component: BaseDescription,
        props: {
          description: '<b>Цель:</b><br> Исследовать зависимость интенсивности света от взаимной ориентации поляроидов.',
          class: 'mb-9'
        }
      }
    ]
  },
  {
    layout: {
      props: {
        cloud: true,
        title: 'Наблюдение поляризации света',
        navigationActions: ['home', 'nextStep', 'prevStep'],
        disabledNavigationActions: ['prevStep']
      }
    },
    components: [
      {
        component: Step1Comp
      }
    ]
  },
  {
    layout: {
      props: {
        cloud: true,
        class: 'second-page',
        title: 'Наблюдение поляризации света',
        navigationActions: ['finish', 'restart', 'home', 'nextStep', 'prevStep'],
        disabledNavigationActions: ['nextStep']
      },
      events: {
        [EmitsCommonEnum.TOGGLE_FINISH_BTN]: (obj: IHandlerArguments) => useEvents(obj, EmitsCommonEnum.TOGGLE_FINISH_BTN)
      }
    },
    components: [
      {
        component: Step2Comp
      }
    ]
  }
]
