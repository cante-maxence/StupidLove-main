<template>
  <div class="min-h-screen items-center justify-center p-4">
    <div class="text-white max-w-md mx-auto p-5 bg-black rounded-lg shadow-xl">
      <p class="text-xl md:text-2xl font-bold text-white mb-6">Êtes-vous amoureux ?</p>

      <div v-if="currentQuestion < questions.length" class="space-y-4">
        <p class="text-lg font-semibold">{{ questions[currentQuestion].text }}</p>
        <div class="space-y-2">
          <button v-for="(answer, index) in questions[currentQuestion].answers" :key="index"
                  @click="selectAnswer(answer.score)"
                  class="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-red-200 transition">
            {{ answer.text }}
          </button>
        </div>
      </div>

      <div v-else class="text-center p-6 bg-gray-800/50 rounded-lg shadow-lg">
        <p class="text-xl md:text-2xl font-bold text-red-300 mb-6">Résultat</p>
        <p class="text-2xl md:text-3xl font-semibold text-white mb-4">{{ interpretScore() }}</p>
        <button @click="restartQuiz" class="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 font-semibold transition duration-300 ease-in-out shadow-md">
          Recommencer le test
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      score: 0,
      questions: [
  {
    text: "Pensez-vous souvent à cette personne ?",
    answers: [
      { text: "Tout le temps", score: 2 },
      { text: "Assez souvent", score: 1 },
      { text: "Rarement", score: 0 },
    ]
  },
  {
    text: "Avez-vous des papillons dans le ventre quand vous voyez cette personne ?",
    answers: [
      { text: "Oui, à chaque fois", score: 2 },
      { text: "Parfois", score: 1 },
      { text: "Non, jamais", score: 0 },
    ]
  },
  {
    text: "Comment vous sentez-vous lorsque vous êtes séparé de cette personne ?",
    answers: [
      { text: "Je me sens incomplet(e)", score: 2 },
      { text: "Un peu triste, mais ça va", score: 1 },
      { text: "Je ne ressens pas de différence", score: 0 },
    ]
  },
  {
    text: "Vous imaginez-vous un avenir avec cette personne ?",
    answers: [
      { text: "Oui, constamment", score: 2 },
      { text: "Quelquefois", score: 1 },
      { text: "Non, jamais", score: 0 },
    ]
  },
  {
    text: "Comment réagissez-vous à leurs messages ou appels ?",
    answers: [
      { text: "Je suis toujours excité(e) et réponds immédiatement", score: 2 },
      { text: "Je suis content(e) mais je ne réponds pas toujours tout de suite", score: 1 },
      { text: "Cela ne me fait ni chaud ni froid", score: 0 },
    ]
  },
  {
    text: "Vous intéressez-vous à ses hobbies et passions ?",
    answers: [
      { text: "Oui, j'essaie même de les partager", score: 2 },
      { text: "Un peu, mais je garde mes propres intérêts", score: 1 },
      { text: "Non, pas vraiment", score: 0 },
    ]
  },
  {
    text: "Êtes-vous prêt(e) à faire des compromis pour cette personne ?",
    answers: [
      { text: "Oui, sans hésiter", score: 2 },
      { text: "Dans une certaine mesure", score: 1 },
      { text: "Non, je ne veux pas changer pour quelqu'un", score: 0 },
    ]
  },
  {
    text: "Ressentez-vous le besoin de parler de cette personne à vos amis ou à votre famille ?",
    answers: [
      { text: "Oui, tout le temps", score: 2 },
      { text: "De temps en temps", score: 1 },
      { text: "Non, pas spécialement", score: 0 },
    ]
  },
  {
    text: "Votre humeur s'améliore-t-elle après avoir passé du temps avec cette personne ?",
    answers: [
      { text: "Oui, toujours", score: 2 },
      { text: "Parfois", score: 1 },
      { text: "Non, ça ne change rien", score: 0 },
    ]
  },
  {
    text: "Êtes-vous jaloux(se) quand cette personne passe du temps avec d'autres ?",
    answers: [
      { text: "Oui, ça me dérange beaucoup", score: 2 },
      { text: "Un peu, mais je le gère", score: 1 },
      { text: "Non, pas du tout", score: 0 },
    ]
  },
],

    };
  },
  methods: {
    selectAnswer(score) {
      this.score += score;
      this.currentQuestion++;
    },
    interpretScore() {
      if (this.score >= 0 && this.score <= 5) {
        return "Il semble que vous ne soyez pas amoureux.";
      } else if (this.score >= 6 && this.score <= 10) {
        return "Peut-être que vous commencez à avoir des sentiments.";
      } else if (this.score >= 11 && this.score <= 15) {
        return "Il y a de fortes chances que vous soyez amoureux.";
      } else {
        return "Vous êtes définitivement amoureux !";
      }
    },
    restartQuiz() {
      this.currentQuestion = 0;
      this.score = 0;
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Satisfy|Pathway+Gothic+One');
</style>
