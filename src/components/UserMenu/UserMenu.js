export default {
  name: 'user-menu',
  components: {},
  props: [],
  data () {
    return {
      open: true,
      items: [],
      mini: false
    };
  },
  computed: {},
  mounted () {
    this.items = [
    {
      icon: 'mdi-domain',
      title: 'Organización',
      children: [
        {
          icon: 'mdi-group',
          title: 'Grupos de Compañias',
          path: '/company-groups'
        },
        {
          icon: 'mdi-domain',
          title: 'Compañias',
          path: '/companies'
        },
        {
          icon: 'mdi-file-key',
          title: 'Certificados y claves',
          path: '/company-keystores'
        }
      ]
    },
    {
      icon: 'mdi-xml',
      title: 'CFDI',
      children: [
        {
          icon: 'mdi-download-box-outline',
          title: 'Solicitudes de descarga',
          path: '/cfdi-download-requests'
        }
      ]
    },
    {
      icon: 'mdi-cloud-tags',
      title: 'Contabilidad Electrónica',
      children: [
        {
          icon: 'mdi-book-information-variant',
          title: 'Documentos electrónicos',
          path: '/electronic-ledger/documents'
        }
      ]
    },
    {
      icon: 'mdi-file-chart',
      title: 'Reportes (DataStudio)',
      path: '/embedded-report'
    }
  ];
  },
  methods: {
    navigate: function (link) {
      this.$router.push(link);
    },
    toggleMini () {
      this.mini = !this.mini;
    },
    showMenu () {
      this.open = true;
    }
  }
}