<template>
  <div id="orderMain" class="scroll" style="height: 100%;">
      <q-pull-to-refresh >
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>General info:</q-item-label>
              <!-- <q-separator spaced inset /> -->
                <q-item  >
                  <q-item-section >
                    Amount : $400
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>Date : 16, September 2020</q-item-label>
                    <!-- <q-item-label>16, September 2020</q-item-label> -->
                    <!-- <q-item-label caption lines="2"></q-item-label> -->
                  </q-item-section>
                </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>User info:</q-item-label>
              <!-- <q-separator spaced inset /> -->
                <q-item  >
                  <q-item-section>
                    <q-item-label>Name : Shreesh Kulkarni</q-item-label>
                    <!-- <q-item-label caption lines="2"></q-item-label> -->
                  </q-item-section>
                </q-item>
                <q-item  >
                  <q-item-section>
                    <q-item-label>Phone Nnumber : 9606698912</q-item-label>
                    <!-- <q-item-label caption lines="2"></q-item-label> -->
                  </q-item-section>
                </q-item>
                <q-item  >
                  <q-item-section>
                    <q-item-label>Email : sgkul2002@gmail.com</q-item-label>
                    <!-- <q-item-label caption lines="2"></q-item-label> -->
                  </q-item-section>
                </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-pull-to-refresh>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped src="src/css/order.scss"></style>