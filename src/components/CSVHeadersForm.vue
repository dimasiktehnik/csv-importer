<template>
  <v-dialog
      v-model="showModal"
      width="500"
      @click:outside="close"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2 d-flex justify-space-between">
        <span>Mapping screen</span>
        <v-icon @click="close">mdi-window-close</v-icon>
      </v-card-title>
      <v-card-text>
        <div class="d-flex row-margin lighten-3">
          <div class="width-30">Fields</div>
          <div>CSV Headers</div>
        </div>
        <v-form>
          <div v-for="(header, index) in headers.slice(0, -1)" :key="index">
            <v-divider/>
            <div class="d-flex align-center row-margin">
              <div class="width-30">{{ header }}</div>
              <v-select
                  hide-details
                  :items="headers"
                  label="Select the field"
                  solo
                  @change="changeSelect($event, index)"
              />
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            large
            class="dashed-border"
            text
            color="primary"
            @click="importCsv"
        >
          Import
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {postData} from "@/utils/request";
import {mapMutations, mapState} from "vuex";

export default {
  name: "CSVHeadersForm",
  methods: {
    ...mapMutations(["updateState"]),
    importCsv() {
      this.selectColumnsByHeaders(this.matchedHeaders).forEach(item => {
        const url = item["post_url"];

        console.log(item);
        postData(item, url);
      });
    },
    changeSelect(value, index) {
      if (this.headers[index] === value) {
        this.matchedHeaders.indexOf(value) === -1 && this.matchedHeaders.push(value);
      } else {
        this.matchedHeaders = this.matchedHeaders.filter(item => item !== this.headers[index]);
      }
    },
    selectColumnsByHeaders(headers) {
      headers.push("post_url");
      const columns = this.data.map(column => Object.assign({}, column));
      columns.forEach(column => Object.keys(column).forEach(key => headers.includes(key) || delete column[key]));
      return columns;
    },
    close() {
      this.updateState({ showModal: false });
    }
  },
  computed: {
    ...mapState(["showModal", "data", "headers"])
  },
  data() {
    return {
      matchedHeaders: []
    }
  }
}
</script>
