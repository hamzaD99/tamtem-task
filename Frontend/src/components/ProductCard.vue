<template>
    <div class="product-card">
        <router-link style="width: 100%;" :to="`/product/${id}`">
            <div style="cursor: pointer;width: 100%;overflow: hidden;">
                <v-img cover :src="image ? getBlob(image) : require('@/assets/default-item.jpg')" height="300px" />
            </div>
        </router-link>
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 80%;" class="ma-2">
            <h2 class="mb-4 mt-4">{{ name }}</h2>
            <div style="background-color: rgb(48 114 66); width: 80%;color: white; padding: 10px;border-radius: 500px;text-align: center;font-size: 25px;" class="mb-3">${{ price }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductCard',
    props: {
        name: {
            type: String,
            required: true
        },
        image: {
            type: Object,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data: () => ({
    }),
    methods: {
        getBlob(image){
            return 'data:image/jpeg;base64,' + btoa(
                new Uint8Array(image.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
    },
}
</script>

<style scoped lang="scss">
.product-card{
    min-width: 200px;
    min-height: 200px;
    border-radius: 3%;
    box-shadow: 0px 0 20px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>