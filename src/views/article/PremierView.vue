<template>
  <div v-for="article in articles" :key="article.id">
	<article class="max-w-2xl px-4 py-24 mx-auto space-y-12 text-white dark:bg-gray-800 dark:text-gray-50">
		<div class="w-full mx-auto space-y-4 text-center">

			<h1 class="text-4xl font-bold leadi md:text-5xl">{{ article.title }}</h1>
			<p class="text-sm dark:text-gray-400">par
				<a rel="noopener noreferrer" href="/Contact" target="_blank" class="underline dark:text-violet-400">
					<span itemprop="name">Maxence Cante </span>
				</a>écrit le
				<time datetime="2021-02-12 15:34:18-0200">30 Janvier 2024</time>
			</p>
		</div>
		<div class="dark:text-gray-100">
			<div class="max-w-3xl mx-auto p-5">
  <p class="mb-6">
    Faire le premier pas dans une rencontre peut être à la fois <span class="font-bold">excitant</span> et <span class="font-bold">intimidant</span>.<br> Voici quelques conseils pour vous aider :<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Confiance en soi</span> : La confiance est clé. Croyez en vous et en votre valeur, cela se reflétera dans votre attitude.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Sourire et Contact Visuel</span> : Un sourire chaleureux et un contact visuel sont des signes non verbaux puissants qui montrent votre intérêt.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Engager la Conversation</span> : Commencez par une question ouverte ou un commentaire sur quelque chose que vous avez en commun, comme l'environnement ou l'événement où vous vous trouvez.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Écoute Active</span> : Montrez que vous êtes intéressé par ce que l'autre personne dit en écoutant activement et en posant des questions de suivi.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Soyez Vous-même</span> : Il est important d'être authentique. N'essayez pas de jouer un rôle ; soyez naturel et honnête.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Respecter l'Espace Personnel</span> : Respectez les limites de l'autre personne et ne soyez pas trop insistant.<br><br>
  </p>

  <p class="mb-6">
    <span class="font-bold">Proposer un Suivi</span> : Si la conversation se passe bien, n'hésitez pas à proposer une autre rencontre ou à échanger vos coordonnées.<br><br>
  </p>

  <p>
    Rappelez-vous, le plus important est de rester <span class="font-bold">détendu</span> et <span class="font-bold">ouvert</span>. Chaque interaction est une expérience d'apprentissage, alors ne vous découragez pas si tout ne se passe pas comme prévu.
  </p>
</div></div>
</article>
<button @click="addLike(articleId)" aria-label="Likes" class="flex items-center text-white transition-colors duration-200 hover:text-deep-purple-accent-700 group">
  <div class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5 text-gray-100 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                >
                  <polyline points="6 23 1 23 1 12 6 12" fill="none" stroke-miterlimit="10"></polyline>
                  <path d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z" fill="none" stroke="currentColor" stroke-miterlimit="10"></path>
                </svg>
              </div>
              <p class="font-semibold">{{ likesCount }}</p> 
              
</button>
</div>


		<div class="pt-12 border-t dark: <br>border-gray-700">
			<div class="flex flex-col space-y-4 md: <br>space-y-0 md: <br>space-x-6 md: <br>flex-row">
				<img src="../../assets/futursvg.png" alt="" class="bg-white self-center flex-shrink-0 w-24 h-24 border rounded-full md: <br>justify-self-start dark: <br>bg-gray-500 dark: <br>border-gray-700">
				<div class="flex flex-col">
					<h4 class="text-lg font-semibold">Maxence Cante</h4>
					<p class="dark: <br>text-gray-400">Tout cette article a été écrit par quelqu'un comme vous et moi ne voyez pas ce texte comme une vérité générale mais comme des conseils venant d'un ami.</p>
				</div>
			</div>

		</div>

</template>


<script setup>
// Importer les nécessaires depuis vos configurations Firebase et Firestore
import { db } from '../../firebase-config';
import { getAuth } from 'firebase/auth'; // Importer getAuth pour initialiser l'authentification
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Fonctions Firestore pour manipuler les données
import { ref, onMounted } from 'vue'; // Importer ref pour la réactivité et onMounted pour le cycle de vie
import { doc, setDoc } from 'firebase/firestore';

async function createArticle(articleData) {
  // Générer un nouvel ID pour l'article
  const articleRef = doc(collection(db, "articles"));
  await setDoc(articleRef, articleData);

  // L'ID de l'article est articleRef.id
  console.log("Article créé avec l'ID: ", articleRef.id);
}

// Initialiser l'authentification Firebase
const auth = getAuth();
const articleId = ref(''); // Initialisation avec une valeur par défaut ou la récupération de l'ID nécessaire
const articles = ref([]); 
// Fonction pour ajouter un like à un article. Nécessite l'ID de l'article.
async function addLike(articleId) {
  try {
    if (!auth.currentUser) {
      throw new Error("L'utilisateur doit être connecté pour liker.");
    }
    if (!articleId) {
      throw new Error("articleId est undefined");
    }
    await addDoc(collection(db, "likes"), {
      uid: auth.currentUser.uid,
      articleId,
    });
  } catch (error) {
    console.error(error);
  }
}


// Fonction pour compter le nombre total de likes pour un article spécifique
async function countLikes(articleId) {
  // Créer une requête pour trouver tous les likes associés à l'articleId
  const likesQuery = query(collection(db, "likes"), where("articleId", "==", articleId));
  const querySnapshot = await getDocs(likesQuery);
  // Retourner le nombre de documents trouvés, représentant le nombre de likes
  return querySnapshot.size;
}

async function hasUserLiked(articleId) {
  if (!articleId) {
    console.error("articleId est undefined dans hasUserLiked");
    return false; // Arrêtez la fonction si articleId est undefined
  }
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  if (!uid) return false;

  const likesQuery = query(collection(db, "likes"), where("articleId", "==", articleId), where("uid", "==", uid));
  const querySnapshot = await getDocs(likesQuery);
  return !querySnapshot.empty;
}


// Réactivité pour suivre si l'utilisateur a liké l'article
const userHasLiked = ref(false);

// Fonction pour mettre à jour l'état de like de l'utilisateur actuel sur l'article
async function updateUserLikeStatus(articleId) {
  const hasLiked = await hasUserLiked(articleId);
  userHasLiked.value = hasLiked;
}

// Réactivité pour suivre le nombre total de likes sur l'article
const likesCount = ref(0);

// Fonction pour mettre à jour le compteur de likes pour l'article
async function updateLikesCount(articleId) {
  const count = await countLikes(articleId);
  likesCount.value = count;
}

// Définir les props attendues par le composant, ici articleId
const props = defineProps({
  articleId: String
});

if (props.articleId) {
  updateUserLikeStatus(props.articleId);
}


// Exécuter ces fonctions au montage du composant pour initialiser les données
onMounted(() => {
  updateLikesCount(props.articleId);
  updateUserLikeStatus(props.articleId);
});
</script>
