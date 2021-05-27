import cfdiservices from "@/services/complementReciep";
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
        headers: [{
                text: "Compañía",
                value: "company",
            },
            {
                text: "UUID de Pago",
                value: "uuid_pay",
                width: 300
            },
            {
                text: "Fecha Pago (ERP)",
                value: "transdate",
            },
            {
                text: "Fecha CFDI de Pago",
                value: "payment_date_time",
            },
            {
                text: "Serie Folio",
                value: "folio",
            },
            {
                text: "UUID Factura",
                value: "uuid_invoice",
                width: 350
            },
            {
                text: "Emisión factura",
                value: "cfdidatetime",
            },
            {
                text: "RFC",
                value: "issuer_rfc",
            },
            {
                text: "Descripción",
                value: "desc_vend",
                width: 450
            },
            {
                text: "Método de Pago",
                value: "paymentmethod",
            },
            {
                text: "Monto del Pago (Complemento)",
                value: "pay_amount",
            },
            {
                text: "Moneda",
                value: "currency_invoice",
            },
            {
                text: "Tipo de CFDI",
                value: "cfditype",
            },
            {
                text: "SubtTotal",
                value: "subtotal",
            },
            {
                text: "IVA",
                value: "taxes_invoice",
            },
            {
                text: "Descuento",
                value: "discount_total_amount",
            },
            {
                text: "Total",
                value: "total",
            },
            {
                text: "Saldo Insoluto",
                value: "outstanding_balance",
            },
        ],
        complement: [],
        totalElements: 0,
    }),
    created() {
        this.getcfdireporcomplemnt();
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
        async getcfdireporcomplemnt() {
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

            let res = await cfdiservices.getcfdireporcomplemnt(
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
                this.complement = cfdiresponse.map((report) => {
                    return {
                        company: report.company,
                        uuid_pay: report.uuid_pay,
                        transdate: this.milliSecondToDate(report.transdate),
                        payment_date_time: this.milliSecondToDate(report.payment_date_time),
                        folio: report.folio,
                        uuid_invoice: report.uuid_invoice,
                        cfdidatetime: this.milliSecondToDate(report.cfdidatetime),
                        issuer_rfc: report.issuer_rfc,
                        desc_vend: report.desc_vend,
                        paymentmethod: report.paymentmethod,
                        pay_amount: report.pay_amount,
                        currency_invoice: report.currency_invoice,
                        cfditype: report.cfditype,
                        subtotal: this.formaterCurrency(report.subtotal),
                        taxes_invoice: this.formaterCurrency(report.taxes_invoice),
                        discount_total_amount: this.formaterCurrency(report.discount_total_amount),
                        total: this.formaterCurrency(report.total),
                        outstanding_balance: this.formaterCurrency(report.outstanding_balance),
                    };
                });
            }
            console.log(this.complement);
            if (res && res.content) {
                this.totalElements = res.totalElements;
            }
        },
        onFilterSelected() {
            this.getcfdireporcomplemnt();
        },
    },
    watch: {
        pagination: {
            handler: function() {
                this.getcfdireporcomplemnt();
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