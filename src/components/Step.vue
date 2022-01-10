<template>
  <div ref="step" class="step">
    <div class="ball" v-if="currentStep === idx"></div>
    <div class="next-step-positioner" v-if="idx + 1 < numberOfSteps">
      <Step :idx="idx + 1"></Step>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Step",
  props: {
    idx: Number,
  },
  computed: mapState(["numberOfSteps", "currentStep"]),
});
</script>

<style scoped lang="scss">
.step {
  --border-width: 1px;
  border: var(--border-width) solid black;
  border-left: none;
  border-top: none;
  box-sizing: content-box;
  position: relative;
  width: 100%;
  height: 100%;
  .ball {
    --ball-width: 75%;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: calc(var(--ball-width) / -2);
    width: var(--ball-width);
    height: var(--ball-width);
    border-radius: 50%;
    background-color: red;
  }
  .next-step-positioner {
    position: absolute;
    left: calc(100% + var(--border-width));
    bottom: calc(100% + var(--border-width));
    width: 100%;
    height: 100%;
  }
}
</style>
