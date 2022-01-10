<template>
  <h1 class="text-center mb-5">How many ways a ball can fall down a stair.</h1>
  <div class="actions">
    <div>
      <Button label="Start" @click="handleStart()" v-if="!simulating" />
      <Button
        label="Stop"
        @click="simulating = false"
        class="p-button-danger"
        v-if="simulating"
      />
    </div>
    <div>
      <span class="mr-1">Steps:</span>
      <InputNumber
        v-model="requestedNumberOfSteps"
        :min="2"
        :max="100"
        showButtons
      />
    </div>
  </div>
  <div class="steps-container">
    <div class="step-positioner" :style="{ width, height: width }">
      <Step :idx="0"></Step>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Step from "@/components/Step.vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import { enumerate_climbing_stairs } from "./algorithm";

export default defineComponent({
  name: "App",
  components: {
    Step,
    Button,
    InputNumber,
  },
  data() {
    return {
      requestedNumberOfSteps: this.$store.state.numberOfSteps,
      simulating: false,
    };
  },
  computed: {
    width(): string {
      return `calc(100% / ${this.$store.state.numberOfSteps} - 1px)`;
    },
  },
  methods: {
    async handleStart() {
      this.simulating = true;
      await this.$nextTick(); // ensure the min/max validator to have run
      this.$store.commit("setNumberOfSteps", this.requestedNumberOfSteps);
      for (let seq of enumerate_climbing_stairs(
        this.$store.state.numberOfSteps
      )) {
        this.$store.commit("initCurrentStep");
        for (let idx of seq) {
          await new Promise<void>((res) => setTimeout(() => res(), 200));
          this.$store.commit("decrCurrentStep", idx);
          if (!this.simulating) {
            break;
          }
        }
        if (!this.simulating) {
          break;
        }
      }
      this.simulating = false;
    },
  },
});
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0 5vh 5vh 5vh;

  @media only screen and (max-width: 600px) {
    padding: 0 2vh 2vh 2vh;
  }
}

.actions {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.steps-container {
  position: relative;
  margin: 10vh auto 0 auto;
  width: 65vmin;
  aspect-ratio: 1 / 1;
  .step-positioner {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
