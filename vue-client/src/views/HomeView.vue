<template>
  <div id="home">
    <header
      class="hero w-full relative flex flex-col justify-center place-content-center pt-32 pb-32"
    >
      <div class="hero-content">
        <WordWrapper
          class="hero-header-font space-grotesk text-white font-bold uppercase -tracking-0.5 mb-4"
          sentence="We cook Powerful websites with Webflow."
        />
        <div :class="{ 'opacity-0 transition-opacity  duration-300': true, 'opacity-100': show }">
          <WordWrapper
            class="hero-subheader-font dm-sans max-w-[40rem] text-tm-white-text -tracking-0.5"
            sentence="Empowering businesses, brands and startups with the power of Webflow to elevate and spice up their online presence."
            :delay="0.007"
          />
        </div>
        <div
          class="button-wrapper flex gap-12 justify-center mt-11"
          :class="{ visible: buttonIsLoaded }"
        >
          <PButton>Let's cook a website</PButton>
          <a
            class="button-secondary flex dm-sans font-medium text-white py-3 items-center border-b border-b-white gap-x-3 max-w-full no-underline cursor-pointer pointer-events-auto"
          >
            Explore projects
            <div class="svg-container w-4 h-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_410_326)">
                  <path
                    d="M1.00042 6.99805C0.448134 6.99782 0.000231226 7.44534 1.04678e-07 7.99763C-0.000231017 8.54991 0.447297 8.99782 0.999582 8.99805L1.00042 6.99805ZM15.7068 8.71131C16.0975 8.32095 16.0978 7.68778 15.7074 7.29709L9.34611 0.930471C8.95574 0.539784 8.32258 0.539519 7.93189 0.929879C7.5412 1.32024 7.54094 1.95341 7.9313 2.34409L13.5858 8.00331L7.92657 13.6578C7.53588 14.0482 7.53561 14.6813 7.92597 15.072C8.31633 15.4627 8.9495 15.463 9.34019 15.0726L15.7068 8.71131ZM0.999582 8.99805L14.9996 9.00391L15.0004 7.00391L1.00042 6.99805L0.999582 8.99805Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_410_326">
                    <rect width="16" height="16" fill="currentColor"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div class="glass-lining"></div>
    </header>
    <section class="text-white">lol</section>
  </div>
</template>

<script>
import WordWrapper from '@/components/theme/WordWrapper.vue'
import PButton from '@/components/theme/PButton.vue'

export default {
  name: 'HomePage',
  components: {
    WordWrapper,
    PButton
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style>
.hero {
  min-height: 100vh;
}
.glass-lining {
  z-index: 1;
  background-image: radial-gradient(circle farthest-corner at 50% 50%, #fff, transparent);
  opacity: 0.6;
  width: 100%;
  max-width: 80rem;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: auto;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
body {
  background-color: #1a1a1a;
}

#home {
  font-family: Arial, sans-serif;
  text-align: center;
}

.hero-content {
  z-index: 2;
  text-align: center;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: relative;
}

.hero-header-font {
  font-size: 4.5rem;
  line-height: 1.1;
}

.hero-subheader-font {
  font-size: 1.28rem;
  line-height: 1.8;
}

.button-wrapper {
  opacity: 0;
  transition: opacity 0.55s ease-in-out;
}

.button-wrapper.visible {
  opacity: 1;
}

.svg-container {
  transition: transform 0.25s ease;
}

.button-secondary:hover .svg-container {
  transform: translateX(2px);
}
</style>
