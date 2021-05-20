import cfdiservices from "@/services/cfdi";
// import cfdiFixtures from "@/fixtures/cfdiFixtures";
import {
    dateFormatOptions,
    dateStringToLocaleString,
} from "@/utils/dateTimeUtils";
import VAdvancedEditDialog from "@/components/VAdvancedEditDialog";
import XLSX from "xlsx";
import VEntityTable from "@/components/VEntityTable";

export default {
    name: "App",
    components: {
        VAdvancedEditDialog,
        VEntityTable,
    },
    data: () => ({
        range: [],
        pagination: {},
        cfdiFilterChoosed: null,
        cfditype: ["", "Ingresos", "Egresos"],
        companyFilterChoosed: null,
        company: [
            "",
            "CEL",
            "CON",
            "EGR",
            "HSJ",
            "ICL",
            "IMD",
            "INC",
            "IOR",
            "NTE",
            "NTN",
            "OCC",
            "ORD",
            "P21",
            "P22",
            "PIC",
            "PIO",
            "PIR",
            "RAM",
            "RCL",
            "RIC",
            "URU",
        ],
        headers: [{
                text: "Compañia",
                value: "company",
            },
            {
                text: "Status",
                value: "status",
            },
            {
                text: "Fecha de Cancelación",
                value: "cancellation_datetime",
            },
            {
                text: "Version",
                value: "version",
            },
            {
                text: "Tipo de CFDI",
                value: "cfditype",
            },
            {
                text: "CFDI",
                value: "uuid",
                width: 300
            },
            {
                text: "Serie",
                value: "series",
            },
            {
                text: "Folio",
                value: "folio",
            },
            {
                text: "Emision",
                value: "cfdidatetime",
            },
            {
                text: "Receptor",
                value: "receiver_rfc",
            },
            {
                text: "Descripción del Receptor",
                value: "receiver_name",
            },
            {
                text: "Emisor",
                value: "issuer_rfc",
            },
            {
                text: "Descripción del Emisor",
                value: "issuer_name",
            },
            {
                text: "Descripcion",
                value: "descripcion",
            },
            {
                text: "Metodo de Pago",
                value: "payment_method",
            },
            {
                text: "Forma de Pago",
                value: "payment_mode",
            },
            {
                text: "SubTotal",
                value: "subtotal",
            },
            {
                text: "Descuento",
                value: "discount_total_amount",
            },
            {
                text: "Impuestos",
                value: "taxes",
            },
            {
                text: "IVA Retenido",
                value: "iva_retenido",
            },
            {
                text: "Total",
                value: "total",
            },
        ],
        cfdireport: [],
        totalElements: 0,
    }),
    created() {
        this.getcfidireport();
    },
    mounted() {
        console.log(this.pagination);
    },
    methods: {
        milliSecondToDate(milliSecond) {
            let time = new Date(milliSecond);
            return time.toLocaleDateString();
        },
        exportToExcel() {
            var issued = XLSX.utils.json_to_sheet(this.cfdireport);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, issued, "Issued");
            XLSX.writeFile(wb, "Issued.xlsx");
        },
        async getcfidireport() {
            const companygroup = "Inmobiliaria";
            let cfditype;
            let company;
            let datestart;
            let dateend;
            let page = this.pagination.page ? this.pagination.page - 1 : 0;
            let size = this.pagination.itemsPerPage ?
                this.pagination.itemsPerPage :
                10;
            if (
                this.companyFilterChoosed == null ||
                this.companyFilterChoosed == ""
            ) {
                company = null;
            } else {
                company = this.companyFilterChoosed;
            }
            if (this.cfdiFilterChoosed == null) {
                cfditype = null;
            } else {
                cfditype = this.cfdiFilterChoosed == "" ? null : this.cfdiFilterChoosed;
            }
            //var today = new Date();
            if (
                this.daterange == "" ||
                this.daterange == null ||
                this.daterange == false
            ) {
                this.datestart = null;
                this.end = null;
            } else {
                this.start = "00:00:00";
                datestart = this.range[0];
                datestart = datestart + " " + this.start;
                this.end = "23:59:59";
                dateend = this.range[1];
                dateend = dateend + " " + this.end;
            }

            let res = await cfdiservices.getcfdireporissues(
                companygroup,
                company,
                cfditype,
                datestart,
                dateend,
                size,
                page
            );
            if (res && res.content) {
                let cfdiresponse = res.content;
                this.cfdireport = cfdiresponse.map((report) => {
                    return {
                        company: report.company,
                        status: report.status,
                        cancellation_datetime: this.milliSecondToDate(
                            report.cancellation_datetime
                        ),
                        version: report.version,
                        cfditype: report.cfditype,
                        uuid: report.uuid,
                        series: report.series,
                        folio: report.folio,
                        cfdidatetime: this.milliSecondToDate(report.cfdidatetime),
                        receiver_rfc: report.receiver_rfc,
                        receiver_name: report.receiver_name,
                        issuer_rfc: report.issuer_rfc,
                        issuer_name: report.issuer_name,
                        descripcion: report.descripcion,
                        payment_method: report.payment_method,
                        payment_mode: report.payment_mode,
                        complement: report.complement,
                        discount_total_amount: report.discount_total_amount,
                        subtotal: report.subtotal,
                        taxes: report.taxes,
                        isr: report.isr,
                        iva: report.iva,
                        ieps: report.ieps,
                        iva_retenido: report.iva_retenido,
                        isr_retenido: report.isr_retenido,
                        transferred_taxes_total_amount: report.transferred_taxes_total_amount,
                        withheld_taxes_total_amount: report.withheld_taxes_total_amount,
                        total: report.total,
                    };
                });
            }
            console.log(this.cfdireport);
            if (res && res.content) {
                this.totalElements = res.totalElements;
            }
        },
        onFilterSelected() {
            this.getcfidireport();
        },
    },
    watch: {
        pagination: {
            handler: function() {
                this.getcfidireport();
            },
            deep: true,
        },
    },
    computed: {
        daterange() {
            return this.range[0] !== undefined ?
                dateStringToLocaleString(
                    this.range[0] + "T00:00:00",
                    dateFormatOptions,
                    this.$vuetify.lang.current
                ) +
                (this.range[1] !== undefined ?
                    "-" +
                    dateStringToLocaleString(
                        this.range[1] + "T00:00:00",
                        dateFormatOptions,
                        this.$vuetify.lang.current
                    ) :
                    "") :
                "";
        },
    },
};