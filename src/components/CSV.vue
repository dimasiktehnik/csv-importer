<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col lg="6" class="d-flex">
          <v-file-input
              type="file"
              accept="text/csv"
              v-model="chosenFile"
              label="CSV File input"
              show-size
              dense/>
          <v-btn @click="uploadCsvFile" class="button-margin">
            Upload
          </v-btn>
          <CSVHeadersForm/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CSVHeadersForm from "@/components/CSVHeadersForm";
import {mapMutations, mapState} from "vuex";

export default {
  name: "CSV",
  components: {
    CSVHeadersForm,
  },
  data() {
    return {
      chosenFile: null,
    }
  },
  computed: {
    ...mapState(["showModal", "headers", "data"])
  },
  methods: {
    ...mapMutations(["updateState", "addData"]),
    uploadCsvFile() {
      if (!this.chosenFile) {
        return;
      }
      this.updateState({headers: []});
      this.updateState({data: []});
      this.$papa.parse(this.chosenFile, {
        complete: results => {
          //get the first row - header
          const [ parsedFile ] = results.data
          this.updateState({headers: parsedFile});
          //get the rest rows
          const resultWithoutHeaders = results.data.slice(1);
          this.getData(resultWithoutHeaders);
          this.updateState({
            showModal: true
          });
        }
      });
    },
    getData(tableData) {
      tableData.forEach(row => {
        const csvRow = {};

        row.forEach((col, index) => {
          csvRow[this.headers[index]] = col;
        })
        this.addData(csvRow);
      });
    }
  },
}
</script>
