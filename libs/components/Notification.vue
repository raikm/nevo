<script lang="ts" setup>
import { Notification as NotifactionType } from "../../libs/types/notifications";

defineProps<{ notifications: NotifactionType[] }>()

const timePasted = (created: Date) => {
  let result = "25"
  let currency = "min"
  return `${result} ${currency} ago`
}

// TODO Method to calucalte past minutes / hours ...
</script>

<template>
  <div class="notification" v-for="notification in notifications">
    <div class="notification-img-wrapper"></div>
    <div class="notification-info-wrapper">
      <div class="notification-header">
        <div class="notification-title">{{ notification.title }}</div>
        <div class="notification-time-past">{{ timePasted(notification.created) }}</div>
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
  display: grid;
  grid-template-columns: 4.5rem auto;
  padding: 0.5rem;

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  backdrop-filter: saturate(130%) blur(20px);

  .notification-info-wrapper {
    display: grid;
    grid-template-rows: 35% auto;
    font-size: 0.8rem;

    .notification-header {
      display: grid;
      grid-template-columns: 70% auto;

      .notification-title {
        align-self: top;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .notification-time-past {
        justify-self: right;
        align-self: center;
        font-weight: 200;
        font-size: 0.6rem;
      }
    }
  }
}
</style>
