<template>
  <div>
    <!-- supplier, sender, trackingnumber -->
    <TextField :labelName="'SENDER'"/>
    <TextField :labelName="'TRACKINGNUMBER'"/>
  </div>
</template>

<script>
import TextField from "../../components/Inputs/TextField"

export default {
  name: "NewPackageContent",
  components: {TextField}
};
</script>

<style></style>
