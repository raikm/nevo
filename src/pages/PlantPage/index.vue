<template>
    <div>
        <PlantCard v-bind:plants="plants" />

    </div>
</template>

<script>
import PlantCard from './PlantCard'

export default {
    name:'PlantPage',
    components: {
        PlantCard
    },
   data() {
        return {
            plants: [
            {
                id: 1,
                name: "Monstera",
                imgurl: "../img/plants//Monstera-Banner.png"

            },
            {
                id: 2,
                name: "Banana Tree",
                imgurl: "../img/plants/Banana.png"

            },
            {
                id: 3,
                name: "Dracarena",
                imgurl: "../img/plants/Drac.png"

            }
            ]
    } 
},
   methods: {
            imagePath(image) {
                return require(image.url.default);
            }
   }
}
</script>