<script>
export default {
  name: "BaseButton",
  props: {
    href: {
      type: String,
      default: "#",
    },
    type: {
      type: String,
      default: "C",
    },
  },
  computed: {
    buttonClass() {
      return `base-button base-type--${this.type}`;
    },
  },
};
</script>

<template>
  <div class="base-button-container">
    <NuxtLink :to="href" :class="buttonClass">
      <div class="base-button__line"></div>
      <div class="base-button__line"></div>
      <span class="base-button__text">
        <slot>ENTRY</slot>
      </span>
      <div class="base-button__drow1"></div>
      <div class="base-button__drow2"></div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.base-type--A {
  --line_color: #555555;
  --back_color: #ffecf6;
}
.base-type--B {
  --line_color: #1b1919;
  --back_color: #e9ecff;
}
.base-type--C {
  --line_color: #656260;
  --back_color: #defffa;
}

.base-button {
  position: relative;
  z-index: 0;
  width: 200px;
  height: 56px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: var(--line_color);
  letter-spacing: 2px;
  transition: all 0.3s ease;
}
.base-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.base-button::before,
.base-button::after,
.base-button__text::before,
.base-button__text::after {
  content: "";
  position: absolute;
  height: 3px;
  border-radius: 2px;
  background: var(--line_color);
  transition: all 0.5s ease;
}
.base-button::before {
  top: 0;
  left: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.base-button::after {
  top: 0;
  right: 54px;
  width: 8px;
}
.base-button__text::before {
  bottom: 0;
  right: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.base-button__text::after {
  bottom: 0;
  left: 54px;
  width: 8px;
}
.base-button__line {
  position: absolute;
  top: 0;
  width: 56px;
  height: 100%;
  overflow: hidden;
}
.base-button__line::before {
  content: "";
  position: absolute;
  top: 0;
  width: 150%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 300px;
  border: solid 3px var(--line_color);
}
.base-button__line:nth-child(1),
.base-button__line:nth-child(1)::before {
  left: 0;
}
.base-button__line:nth-child(2),
.base-button__line:nth-child(2)::before {
  right: 0;
}
.base-button:hover {
  letter-spacing: 6px;
}
.base-button:hover::before,
.base-button:hover .base-button__text::before {
  width: 8px;
}
.base-button:hover::after,
.base-button:hover .base-button__text::after {
  width: calc(100% - 56px * 2 - 16px);
}
.base-button__drow1,
.base-button__drow2 {
  position: absolute;
  z-index: -1;
  border-radius: 16px;
  transform-origin: 16px 16px;
}
.base-button__drow1 {
  top: -16px;
  left: 40px;
  width: 32px;
  height: 0;
  transform: rotate(30deg);
}
.base-button__drow2 {
  top: 44px;
  left: 77px;
  width: 32px;
  height: 0;
  transform: rotate(-127deg);
}
.base-button__drow1::before,
.base-button__drow1::after,
.base-button__drow2::before,
.base-button__drow2::after {
  content: "";
  position: absolute;
}
.base-button__drow1::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-60deg);
}
.base-button__drow1::after {
  top: -10px;
  left: 45px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(69deg);
}
.base-button__drow2::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-146deg);
}
.base-button__drow2::after {
  bottom: 26px;
  left: -40px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-262deg);
}
.base-button__drow1,
.base-button__drow1::before,
.base-button__drow1::after,
.base-button__drow2,
.base-button__drow2::before,
.base-button__drow2::after {
  background: var(--back_color);
}
.base-button:hover .base-button__drow1 {
  animation: drow1 ease-in 0.06s;
  animation-fill-mode: forwards;
}
.base-button:hover .base-button__drow1::before {
  animation: drow2 linear 0.08s 0.06s;
  animation-fill-mode: forwards;
}
.base-button:hover .base-button__drow1::after {
  animation: drow3 linear 0.03s 0.14s;
  animation-fill-mode: forwards;
}
.base-button:hover .base-button__drow2 {
  animation: drow4 linear 0.06s 0.2s;
  animation-fill-mode: forwards;
}
.base-button:hover .base-button__drow2::before {
  animation: drow3 linear 0.03s 0.26s;
  animation-fill-mode: forwards;
}
.base-button:hover .base-button__drow2::after {
  animation: drow5 linear 0.06s 0.32s;
  animation-fill-mode: forwards;
}
@keyframes drow1 {
  0% {
    height: 0;
  }
  100% {
    height: 100px;
  }
}
@keyframes drow2 {
  0% {
    width: 0;
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  100% {
    width: 120px;
  }
}
@keyframes drow3 {
  0% {
    width: 0;
  }
  100% {
    width: 80px;
  }
}
@keyframes drow4 {
  0% {
    height: 0;
  }
  100% {
    height: 120px;
  }
}
@keyframes drow5 {
  0% {
    width: 0;
  }
  100% {
    width: 50px;
  }
}

.base-button-container {
  width: 100%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.base-button:not(:last-child) {
  margin-bottom: 64px;
}
</style>
