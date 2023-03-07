<script setup lang="ts">
 import Editor from '@tinymce/tinymce-vue'
    const props = defineProps<{
        modelValue: string
    }>()

    const emit = defineEmits<{
        (event: 'update:model-value', html: string)
    }>()
</script>
<template>
    <div>
        <ClientOnly>
            <Editor api-key="kxi5mi9sowfcykjc4srab59q2n12oc0cosoduya1nm5tv6nx"
            :init="{
            height: 500,
            menubar: false,
            toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }"
        :model-value="props.modelValue" 
        @update:model-value="emit('update:model-value', $event)"></Editor>
        </ClientOnly>
    </div>
</template>