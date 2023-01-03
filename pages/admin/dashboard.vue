<template>
  <div class="flex-container justify-center flex flex-wrap bg-polka">
    <DashboardCard title="Activity" link="/admin/stats">
      <trending-up-icon size="4x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Reports" link="/admin/reports">
      <alert-octagon-icon size="4x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Users" link="/admin/users">
      <user-icon size="4x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Locations" link="/admin/locations">
      <map-icon size="4x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Micro Service Health" link="/admin/health">
      <heart-icon size="4x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="News" link="/admin/news">
      <radio-icon size="4x" class="block mx-auto" />
    </DashboardCard>
  </div>
</template>

<script>
import { TrendingUpIcon, AlertOctagonIcon, UserIcon, MapIcon, HeartIcon, RadioIcon } from 'vue-feather-icons'
import DashboardCard from '~/components/Widgets/Admin/DashboardCard'
export default {
  middleware: 'isadmin',
  components: {
    DashboardCard,
    TrendingUpIcon,
    AlertOctagonIcon,
    UserIcon,
    MapIcon,
    HeartIcon,
    RadioIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
