<template>
  <h1 class="sentence" ref="sentenceRef">
    <span v-for="(word, wordIndex) in words" :key="wordIndex" class="word">
      <span
        v-for="(char, charIndex) in word"
        :key="charIndex"
        class="char"
        :style="getCharStyle(wordIndex, charIndex)"
      >
        {{ char }}
      </span>
      <span v-if="wordIndex < words.length - 1" class="space">&nbsp;</span>
    </span>
  </h1>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

export default {
  props: {
    sentence: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0.55
    },
    delay: {
      type: Number,
      default: 0.02
    },
    rotate: {
      type: Number,
      default: 14
    }
  },

  setup(props, { emit }) {
    const sentenceRef = ref(null)
    const isAnimating = ref(false)

    const words = computed(() => props.sentence.split(' ').map((word) => word.split('')))

    const getCharStyle = (wordIndex, charIndex) => {
      const index =
        words.value.slice(0, wordIndex).reduce((acc, word) => acc + word.length, 0) + charIndex
      return {
        '--index': index,
        '--rotate': `${props.rotate}deg`,
        '--duration': `${props.duration}s`,
        '--delay': `${props.delay * index}s`
      }
    }

    const startAnimation = () => {
      isAnimating.value = true
      sentenceRef.value.classList.add('animate')
    }

    onMounted(() => {
      nextTick(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !isAnimating.value) {
              startAnimation()
            }
          },
          { threshold: 0.1 }
        )

        observer.observe(sentenceRef.value)
      })
    })

    return {
      sentenceRef,
      words,
      getCharStyle
    }
  }
}
</script>

<style scoped>
.sentence {
  display: inline-block;
  overflow: hidden;
}

.word {
  display: inline-flex;
  overflow: hidden;
}

.char {
  display: inline-block;
  transform: translateY(100%) rotate(var(--rotate));
  transition: transform var(--duration) ease;
  transition-delay: var(--delay);
  will-change: transform;
}

.sentence.animate .char {
  transform: translateY(0) rotate(0deg);
}
</style>
