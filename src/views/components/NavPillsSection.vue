<template>
  <div class="wrapper">
    <div id="navigation-pills">
      <!-- <div class="title">
        <h3>Navigation Pills</h3>
      </div>
      <div class="title">
        <h3><small>With Icons</small></h3>
      </div> -->
      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <!-- <tabs
            :tab-name="['Apt검색', 'Bookmark']"
            :tab-icon="['dashboard', 'schedule']"
            plain
            nav-pills-icons
            color-button="primary"
          > -->
            <!-- here you can add your content for tab-content -->
            <template>
                <news></news>
            </template>
            
          <!-- </tabs> -->
        </div>

        <div class="md-layout-item md-size-50 md-small-size-100">
          <!-- <tabs
            :tab-name="['Apt검색', 'Bookmark']"
            :tab-icon="['dashboard', 'schedule']"
            plain
            nav-pills-icons
            color-button="primary"
          > -->
            <template>
              <div class="container">
                안할건데?
                <br /><br />
                Dramatically visualize customer directed convergence without
                revolutionary ROI.
              </div>
            </template>
          <!-- </tabs>   -->
        </div>


        <!-- <div class="md-layout-item md-size-50 md-small-size-100">
          <tabs
            :tab-name="['Dashboard', 'Schedule']"
            :tab-icon="['dashboard', 'schedule']"
            plain
            flex-column
            nav-pills-icons
            color-button="primary"
          > -->
            <!-- here you can add your content for tab-content -->
            <!-- <template slot="tab-pane-1"> -->
              <!-- Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </template>
            <template slot="tab-pane-2">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />
              Dramatically maintain clicks-and-mortar solutions without
              functional solutions.
            </template>
          </tabs>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { Tabs } from "@/components";
import News from "@/components/News.vue";
export default {
  components: {
    // Tabs,
    News
  }
};
</script>

<style lang="css"></style>
