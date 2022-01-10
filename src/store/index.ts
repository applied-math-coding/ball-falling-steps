import { createStore } from 'vuex';
import { Store } from 'vuex'

export interface State {
  currentStep: number,
  numberOfSteps: number
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state() {
    return {
      numberOfSteps: 7,
      currentStep: 6
    } as State
  },
  mutations: {
    decrCurrentStep(state: State, n: number) {
      state.currentStep -= n;
    },
    setNumberOfSteps(state: State, n: number) {
      state.numberOfSteps = n;
    },
    initCurrentStep(state: State) {
      state.currentStep = state.numberOfSteps - 1;
    }
  },
  actions: {
  },
  modules: {
  }
})
