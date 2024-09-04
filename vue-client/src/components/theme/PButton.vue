<template>
  <a class="button_link" :href="href" :target="target">
    <div class="button dm-sans">
      <slot></slot>
    </div>
    <div class="button_bg-grad"></div>
  </a>
</template>

<script>
export default {
  name: 'PButton',
  props: {
    href: {
      type: String,
      default: '#'
    },
    target: {
      type: String,
      default: '_self'
    }
  }
}
</script>

<style>
.button_link {
  position: relative;
  display: inline-block;
  z-index: 1;
  /* transition: all 0.2s; */
  text-decoration: none;
}

.button {
  position: relative;
  z-index: 0;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: var(--black-text);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1rem 0 rgba(26, 26, 26, 0.15);
  transition: all 0.2s;
  cursor: pointer;
  backdrop-filter: blur(20px);
}

.button_bg-grad {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(234, 85, 74, 1) 0%, rgba(247, 218, 145, 1) 100%);
  transform: translate(0.5rem, 0.5rem);
  transition: transform 0.2s;
  pointer-events: none;
}

.button_link:hover .button {
  transform: translate(-2px, -2px);
}

.button_link:hover .button_bg-grad {
  transform: translate(0.45rem, 0.45rem);
}
</style>
