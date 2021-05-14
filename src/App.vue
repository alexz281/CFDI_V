<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
       
        <v-flex xs12 md2>
          <div class="give-space-field-right">
            <v-select
            v-model="companyFilterChoosed"
              :items="company"
              label="Escoge un filtro"
              @change="onFilterSelected"
            ></v-select>
          </div>
        </v-flex>

        <v-flex xs18 md4>
          <div >
            <v-advanced-edit-dialog :return-value.sync="range" title="Seleccionar Fecha" scrollable max-width="300">
            <v-date-picker v-model="range" lang="en" range></v-date-picker>
            <template #activator="{ attrs, on }">
            <v-text-field v-bind="attrs" v-on="on" readonly v-model="daterange" @input="onFilterSelected"></v-text-field>            
        </template>
      </v-advanced-edit-dialog>
          </div>
        </v-flex>        

        <v-flex xs12 md2>
          <div class="give-space-field-left">
            <v-select
              v-model="cfdiFilterChoosed"
              :items="cfditype"
              label="Escoge un filtro"
              @change="onFilterSelected"
            ></v-select>
          </div>
        </v-flex>
        
          <v-data-table
            :headers="headers"
            :items="cfdireport"
            :options.sync="pagination"
            :server-items-length="totalElements"
          >
          </v-data-table>
        
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="scss">
.give-space-field-right {
  margin-right: 20px;
  @media (max-width: 960px) {
    margin: 0px 10px 0px 10px;
  }
}
.give-space-field-left {
  margin-left: 20px;
  @media (max-width: 960px) {
    margin: 0px 10px 0px 10px;
  }
}
.give-space-field-center {
  margin-left: 20px;
  @media (max-width: 960px) {
    margin: 0px 10px 0px 10px;
  }
}
</style>

<script>
import cfdiservices from "@/services/cfdi"
// import cfdiFixtures from "@/fixtures/cfdiFixtures";
import { dateFormatOptions, dateStringToLocaleString } from "@/utils/dateTimeUtils"
import VAdvancedEditDialog from "@/components/VAdvancedEditDialog"
export default {
  name: "App",
  components: {
    VAdvancedEditDialog
  },
  data: () => ({
    filter: {
      search: "",
      added_by: ""
    },
    range: [],
    pagination: {},
    cfdiFilterChoosed: null,
    cfditype: ["","Ingresos", "Egresos"],
    date: '',
    time: '',
    datetime: '',
    shortcuts:[
      {
        text: 'Today',
        Onclick: () =>{
          this.range = [ new Date(), new Date() ]
        }
      }
    ],
    //pagination: {},    
    companyFilterChoosed: null,
    company: ["","CEL","CON","EGR","HSJ","ICL","IMD","INC","IOR","NTE","NTN","OCC","ORD","P21","P22","PIC","PIO","PIR","RAM","RCL","RIC","URU"],
    headers: [
      {
        text: "Compañia",
        value: "company"
      },
      {
        text: "Status",
        value: "status"
      },
      {
        text: "Fecha de Cancelación",
        value: "cancellation_datetime"
      },
      {
        text: "Version",
        value:  "version"
      },
      {
        text: "Tipo de CFDI",
        value:  "cfditype"
      },
      {
        text: "CFDI",
        value:"uuid"},
      {
        text: "Serie",
        value:  "series"
      },
      {
        text: "Folio",
        value:  "folio"
      },
      {
        text: "Emision",
        value: "cfdidatetime"
      },
      {
        text: "Receptor",        
        value: "receiver_rfc"
      },
      {
        text: "Descripción del Receptor",
        value:  "receiver_name"
      },
      {
        text: "Emisor",
        value:  "issuer_rfc"
      },
      {
        text: "Descripción del Emisor",
        value:  "issuer_name"
      },
      {
        text: "Descripcion",
        value:  "descripcion"
      },
      {
        text: "Metodo de Pago",
        value:  "payment_method"
      },
      {
        text: "Forma de Pago",
        value:  "payment_mode"
      },
      {
        text: "SubTotal",
        value:  "subtotal"
      },
      {
        text: "Descuento",
        value:  "discount_total_amount"
      },
      {
        text: "Impuestos",
        value:  "taxes"
      },
      {
        text: "IVA Retenido",
        value: "iva_retenido"},
      {
        text: "Total",
        value: "total"},      
    ],
    cfdireport: [],
    totalElements: 0
  }),
  created() {
    this.getcfidireport()
  },
  mounted() {
    console.log(this.pagination)
  },
  methods: {
    milliSecondToDate(milliSecond) {
      let time = new Date(milliSecond)
      return time.toLocaleDateString();      
    },
    async getcfidireport() {
      const companygroup = "Inmobiliaria"
      let cfditype
      let company
      let datestart 
      let dateend 
      let page = this.pagination.page ? this.pagination.page - 1 : 0
      let size = this.pagination.itemsPerPage ? this.pagination.itemsPerPage : 10
      if (this.companyFilterChoosed == null || this.companyFilterChoosed ==  '') {
        company = null
      } else {
        company = this.companyFilterChoosed
      }
      if (this.cfdiFilterChoosed == null) {
        cfditype = null
      } else {
        cfditype = this.cfdiFilterChoosed == '' ? null : this.cfdiFilterChoosed
      }
      //var today = new Date();
      if(this.daterange == '' || this.daterange == null || this.daterange == false){
        this.datestart = null
        this.end = null
      } else{
        this.start = "00:00:00"
        datestart = this.range[0] 
        datestart =  datestart +" "+ this.start
        this.end = "23:59:59"
        dateend = this.range[1]
        dateend =  dateend +" "+ this.end
      }
      
      let res = await cfdiservices.getcfdireporissues(
        companygroup,
        company,
        cfditype,
        datestart,
        dateend,
        size,
        page
      )
      if(res && res.content){
        let cfdiresponse = res.content
      this.cfdireport = cfdiresponse.map(report => {
        return {
          "status":  report.status,
          "cancellation_datetime": this.milliSecondToDate(report.cancellation_datetime),
          "version":  report.version,
          "cfditype":  report.cfditype,
          "uuid":  report.uuid,
          "series":  report.series,
          "folio":  report.folio,
          "cfdidatetime": this.milliSecondToDate(report.cfdidatetime),
          "receiver_rfc":  report.receiver_rfc,
          "receiver_name":  report.receiver_name,
          "issuer_rfc":  report.issuer_rfc,
          "issuer_name":  report.issuer_name,
          "descripcion":  report.descripcion,
          "discount_total_amount":  report.discount_total_amount,
          "subtotal":  report.subtotal,
          "taxes":  report.taxes,
          "isr":  report.isr,
          "iva":  report.iva,
          "ieps":  report.ieps,
          "iva_retenido":  report.iva_retenido,
          "isr_retenido":  report.isr_retenido,
          "transferred_taxes_total_amount":  report.transferred_taxes_total_amount,
          "withheld_taxes_total_amount":  report.withheld_taxes_total_amount,
          "total":  report.total,
          "payment_method":  report.payment_method,
          "payment_mode":  report.payment_mode,
          "complement":  report.complement,
          "company":  report.company,
        }
      })
      }
      console.log(this.cfdireport)
      if(res && res.content){
        this.totalElements = res.totalElements
      }
    },    
    onFilterSelected() {
      this.getcfidireport()
    }
  },
  watch: {
    pagination: {
      handler: function() {
        this.getcfidireport()
      },
      deep: true
    }
  },
  computed: {
    daterange() {
      return (this.range[0] !== undefined ? dateStringToLocaleString(this.range[0] + 'T00:00:00', dateFormatOptions, this.$vuetify.lang.current) +  (this.range[1] !== undefined ? "-" + dateStringToLocaleString(this.range[1] + 'T00:00:00', dateFormatOptions,this.$vuetify.lang.current) : '') : '') ; 
      }
  },
}
</script>