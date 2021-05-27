import cfdiservices from "@/services/complementReciepf";
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
        payment_method: ["", "PUE", "PPD"],
        companyFilterChoosed: null,
        paymentmethodFilterChoosed: null,
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
        headers: [
            { text: "Compañía", value: "company", },
            { text: "Fecha Pago (ERP)", value: "transdate", },
            { text: "Usuario Solicitante", value: "requestinguser", },
            { text: "Documento Original", value: "originaldocument", },
            { text: "Status", value: "status", },
            { text: "Folio de Pago de ERP", value: "payment", },
            { text: "Folio de Factura en el ERP", value: "invoice", },
            { text: "Serie Folio", value: "folio", },
            { text: "UUID Factura", value: "uuid_invoice", },
            { text: "Emisión factura", value: "cfdidatetime", },
            { text: "RFC", value: "issuer_rfc", },
            { text: "Descripción", value: "desc_vend", },
            { text: "Método de Pago", value: "payment_method", },
            { text: "Moneda de la Factura", value: "currency_invoice", },
            { text: "Tipo de Cambio de la Factura", value: "exchrateinvoice", },
            { text: "Tipo de CFDI", value: "cfditype", },
            { text: "SubtTotal", value: "subtotal", },
            { text: "IVA", value: "taxes_invoice", },
            { text: "Descuento", value: "discount_total_amount", },
            { text: "Total", value: "total", },
        ],
        complementf: [],
        totalElements: 0,
    }),
    created() {
        this.getcfdireporcomplemntf();
    },
    mounted() {
        console.log(this.pagination);
    },
    methods: {
        milliSecondToDate(milliSecond) {
            let time = new Date(milliSecond);
            return time.toLocaleDateString();
        },
        formaterCurrency(currency) {
            let val = (currency / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        exportToExcel() {
            var issued = XLSX.utils.json_to_sheet(this.complement);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, issued, "Issued");
            XLSX.writeFile(wb, "Issued.xlsx");
        },
        async getcfdireporcomplemntf() {
            const companygroup = "Inmobiliaria";
            let cfditype;
            let company;
            let paymentmethod;
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
            if (this.paymentmethodFilterChoosed == null) {
                paymentmethod = null;
            } else {
                paymentmethod = this.paymentmethodFilterChoosed == "" ? null : this.paymentmethodFilterChoosed;
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

            let res = await cfdiservices.getcfdireporcomplemntf(
                companygroup,
                company,
                cfditype,
                paymentmethod,
                datestart,
                dateend,
                size,
                page
            );
            if (res && res.content) {
                let cfdiresponse = res.content;
                this.complementf = cfdiresponse.map((report) => {
                    return {
                        company: report.company,
                        transdate: this.milliSecondToDate(report.transdate),
                        requestinguser: report.requestinguser,
                        originaldocument: report.originaldocument,
                        status: report.status,
                        payment: report.payment,
                        invoice: report.invoice,
                        folio: report.folio,
                        uuid_invoice: report.uuid_invoice,
                        cfdidatetime: this.milliSecondToDate(report.cfdidatetime),
                        issuer_rfc: report.issuer_rfc,
                        desc_vend: report.desc_vend,
                        payment_method: report.payment_method,
                        currency_invoice: report.currency_invoice,
                        exchrateinvoice: this.formaterCurrency(report.exchrateinvoice),
                        cfditype: report.cfditype,
                        subtotal: this.formaterCurrency(report.subtotal),
                        taxes_invoice: this.formaterCurrency(report.taxes_invoice),
                        discount_total_amount: this.formaterCurrency(report.discount_total_amount),
                        total: this.formaterCurrency(report.total),

                    };
                });
            }
            console.log(this.complementf);
            if (res && res.content) {
                this.totalElements = res.totalElements;
            }
        },
        onFilterSelected() {
            this.getcfdireporcomplemntf();
        },
    },
    watch: {
        pagination: {
            handler: function() {
                this.getcfdireporcomplemntf();
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