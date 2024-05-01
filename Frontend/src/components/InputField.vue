<template>
    <div class="d-flex flex-column">
        <h4 v-if="name && !label" class="font-weight-medium mb-2">{{ name }} <span style="color: red;">{{star ? ' *' : ''}}</span></h4>
        <v-text-field :append-inner-icon="type == 'password' ? (show ? 'mdi-eye' : 'mdi-eye-off') : null"  dense :type="type == 'password' && !show ? type : 'text'" :label="label ? name : null" :rules="rules" :loading="loading" :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" style="width: 100%;" @click:append-inner="show = !show" />
    </div>
</template>

<script>

export default {
    name: 'InputField',
    props:{
        name:{
           type: String, 
        },
        label:{
           type: Boolean, 
        },
        type:{
            type: String
        },
        loading:{
            type: Boolean,
            default: false
        },
        rules: {
            type: Array,
            default: () => []
        },
        star:{
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        modelValue: null,
        show: false
    }),
    methods: {
    },
}
</script>

<style scoped lang="scss">
:deep(.v-text-field input.v-field__input) {
    max-height: 40px !important;
    min-height: 40px !important;
    display: flex !important;
    align-items: center !important;
}
</style>