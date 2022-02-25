<script lang="ts" setup>
import { Notification as NotifactionType } from "../../libs/types/notifications";

const props = defineProps<{ notifications: NotifactionType[] }>()


// TODO Method to calucalte past minutes / hours ...
</script>

<template>
  <div class="notification" v-for="notification in notifications">
    <div class="notification-img-wrapper"></div>
    <div class="notification-info-wrapper">
      <div class="notification-header">
        <div class="notification-title">{{ notification.title }}</div>
        <div class="notification-time-past">25min ago</div>
      </div>
      <div class="notification-body">{{ notification.description }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../style/mainstyle.scss";

.notification {
  margin: $standard-space;
  border-radius: 12px;
  height: 4rem;
  background-color: rgb(236, 236, 236);
  display: grid;
  grid-template-columns: 4.5rem auto;
  padding: 0.5rem;

  .notification-info-wrapper {
    display: grid;
    grid-template-rows: 35% auto;

    .notification-header {
      display: grid;
      grid-template-columns: 60% auto;
      .notification-title {
        align-self: top;
        font-weight: 600;
      }

      .notification-time-past {
        justify-self: right;
        align-self: center;
        font-weight: 200;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
