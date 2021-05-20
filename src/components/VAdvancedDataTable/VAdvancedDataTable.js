import VAdvancedDataTableHeaders from '@/components/VAdvancedDataTableHeaders';
import VAdvancedEditDialog from '@/components/VAdvancedEditDialog';
import BasicMixin from '@/mixins/BasicMixin';

export default {
  name: 'v-advanced-data-table',
  components: {
    VAdvancedDataTableHeaders,
    VAdvancedEditDialog
  },
  mixins: [
    BasicMixin
  ],
  props: {
    headers: {
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
    },
    items: {
      type: Array,
      default: () => [],
      description: 'The array of items to display'
    },
    multiSort: {
      type: Boolean,
      default: false,
      description: 'If true then one can sort on multiple properties. Can be used with .sync modifier'
    },
    sortBy: {
      type: [String, Array],
      default: () => [],
      description: 'Changes which item property (or properties) should be used for sort order. Can be used with .sync modifier'
    },
    sortDesc: {
      type: [Boolean, Array],
      default: () => [],
      description: 'Changes which direction sorting is done. Can be used with .sync modifier'
    },
    title: {
      type: String,
      description: 'Title'
    },
    value: {	
      type: Array,
      default: () => [],
      description: 'Used for controlling selected rows'
    }
  },
  data () {
    return {
      userHiddenHeaders: [],
      tableHeaders: [...this.headers],
      showFilters: false,
      tableSortBy: this.shallowCopy(this.sortBy),
      tableSortDesc: this.shallowCopy(this.sortDesc),
      tableMultiSort: this.multiSort,
      selected: [...this.value]
    };
  },
  computed: {
    visibleHeaders () {
      return this.tableHeaders.filter(header => (header.hideable !== undefined && !header.hideable) || !header.hidden);
    },
    isSorted () {
      if (Array.isArray(this.tableSortBy)) {
        return this.tableSortBy.length > 0;
      }

      return this.tableSortBy !== '';
    }
  },
  created () {
  },
  methods: {
    toogleFiltersVisibility () {
      this.showFilters = !this.showFilters;
    },
    clearSorts () {
      this.tableSortBy = [];
      this.tableSortDesc = [];
    },
    emit (name, payload) {
      this.$emit(name, payload);
    },
    input (selected) {
      this.emit('input', selected);
    }
  }
}