<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTimetableStore } from '/@src/stores/timetables'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const timetable = useTimetableStore()
const router = useRouter()
const notif = useNotyf()

const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']

const hours = [
  'H08', 'H09', 'H10', 'H11', 'H12', 'H13',
  'H14', 'H15', 'H16', 'H17', 'H18', 'H19',
  'H20', 'H21',
]

const hourLabels = hours.map(h => `${parseInt(h.slice(1))}:00`)

const getType = (type: string) => {
  const typeMap: any = {
    Seminar: {
      color: 'success',
      name: 'staff',
      letter: '(S)',
    },
    Lab: {
      color: 'secondary',
      name: 'staff',
      letter: '(L)',
    },
    Course: {
      color: 'info',
      name: 'user',
      letter: '(C)',
    },
  }

  return typeMap[type]
}

const getSpanningClasses = (day: string, hour: string) => {
  return timetable.timetableStructure.timetable[day]?.filter((item) => {
    const startHour = parseInt(item.hour.slice(1))
    const currentHour = parseInt(hour.slice(1))
    return startHour <= currentHour && currentHour < startHour + item.duration
  }) || []
}

onMounted(async () => {
  try {
    await timetable.loadTimetableStructure()
  }
  catch (e: any) {
    notif.error({ message: e.message || String(e), duration: 5000 })
  }
  if (timetable.error) {
    notif.error({ message: timetable.error, duration: 5000 })
  }
})
</script>

<template>
  <div class="page-content-inner">
    <VLoader
      size="large"
      :active="timetable.loading"
      :translucent="true"
    >
      <div class="timetable-container">
        <table class="timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th v-for="day in days" :key="day">
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hour in hours" :key="hour">
              <td>{{ hourLabels[hours.indexOf(hour)] }}</td>
              <td v-for="day in days" :key="day">
                <div v-for="item in getSpanningClasses(day, hour)" :key="item.subject">
                  <VCard :color="getType(item.info.type).color">
                    <h3 class="title is-5 mb-2">
                      {{ item.subject }} {{ getType(item.info.type).letter }}
                    </h3>
                    <template v-if="item.info.type == 'Seminar'">
                      <RouterLink
                        v-tooltip.rounded="`${t('timetable.tooltips.viewGroup')}`"
                        class="order-link"
                        :to="`/students/group/${item.info.group.id}`"
                      >
                        <span>{{ item.info.group.code }}</span>
                      </RouterLink>
                      | {{ item.info.professor.name }}
                    </template>

                    <template v-if="item.info.type == 'Course'">
                      <RouterLink
                        v-tooltip.rounded="`${t('timetable.tooltips.viewYear')}`"
                        class="order-link"
                        :to="`/students/year/${item.info.year.id}`"
                      >
                        <span>{{ item.info.year.year }}</span>
                      </RouterLink>
                      | {{ item.info.professor.name }}
                    </template>

                    <template
                      v-else-if="item.info.type == 'Lab'"
                    >
                      <RouterLink
                        v-tooltip.rounded="`${t('timetable.tooltips.viewGroup')}`"
                        class="order-link"
                        :to="`/students/group/${item.info.group.id}`"
                      >
                        <span>{{ item.info.group.code }}</span>
                      </RouterLink>
                      <ul>
                        <li
                          v-for="prof in item.info.professors"
                        >
                          {{ prof.name }}
                        </li>
                      </ul>
                    </template>
                  </VCard>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </VLoader>
  </div>
</template>
<style lang="scss" scoped>
.timetable-container {
  max-width: 100%;
  overflow-x: auto;
}

.timetable {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.timetable th,
.timetable td {
  border: 1px solid #ccc;
  text-align: center;
}

.timetable th {
  color: var(--light-2);
}

.timetable th:first-child,
.timetable td:first-child {
  width: 80px; /* Set width for the first column */
  background-color: var(--dark-sidebar-light-16);
  color: var(--light-2);
}

.timetable th:not(:first-child),
.timetable td:not(:first-child) {
  width: calc((100% - 80px) / 5); /* Distribute remaining width equally among other columns */
}

.card-container {
  max-width: 20%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.r-card {
  border: 1px solid #ccc;
  border-radius: 0px !important;

  h3 {
    font-size: 1em;
  }

  a {
    color: var(--light-2);
  }
}
</style>
