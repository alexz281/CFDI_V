import draggable from 'vuedraggable';

export default {
  name: 'v-advanced-data-table-headers',
  components: {
    draggable
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      description: `An array of objects that each describe a header column. See the example below for a definition of all properties.
        {
          text: string,
          value: string,
          align?: 'start' | 'center' | 'end',
          sortable?: boolean,
          filterable?: boolean,
          groupable?: boolean,
          hideable?: boolean,
          divider?: boolean,
          class?: string | string[],
          cellClass?: string | string[],
          width?: string | number,
          filter?: (value: any, search: string, item: any) => boolean,
          sort?: (a: any, b: any) => number,
          hidden?: boolean
        }`
    }
  },
  data () {
    return {
      headers: [...this.value],
      editingHeader: null
    };
  },
  computed: {},
  created () {},
  methods: {
    toogleHeaderVisibility (header) {
      if (Object.prototype.hasOwnProperty.call(header, 'hidden')) {
        header.hidden = !header.hidden;
      }
      else {
        this.$set(header, 'hidden', true);
      }
    },
    editHeaderText (header) {
      this.editingHeader = this.editingHeader == header ? null : header;
    },
    moveHeaderUp (index) {
      const selectedHeader = this.headers.splice(index, 1)[0];
      this.headers.splice(index - 1, 0, selectedHeader);
    },
    moveHeaderDown (index) {
      const selectedHeader = this.headers.splice(index, 1)[0];
      this.headers.splice(index + 1, 0, selectedHeader);
    },
    emitInput() {
      this.$emit('input', this.headers);
    }
  }
}