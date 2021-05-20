import EntityTableViewMixin from '@/mixins/EntityTableViewMixin';
import VAdvancedDataTable from '@/components/VAdvancedDataTable';

export default {
    name: 'v-entity-table',
    components: {
        VAdvancedDataTable
    },
    mixins: [
        EntityTableViewMixin
    ],
    props: {
        canCreateItems: {
            type: Boolean,
            default: true,
            description: 'Items can be created'
        },
        canDeleteItems: {
            type: Boolean,
            default: true,
            description: 'Items can be deleted'
        },
        canEditItems: {
            type: Boolean,
            default: true,
            description: 'Items can be edited'
        },
        canRefreshItems: {
            type: Boolean,
            default: true,
            description: 'Items can be refreshed'
        },
        canViewItems: {
            type: Boolean,
            default: true,
            description: 'Items can be viewed'
        },
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
          hide?: (value: any) => boolean
        }`
        },
        items: {
            type: Array,
            default: () => [],
            description: 'The array of items to display'
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
    data() {
        return {
            selected: [...this.value],
            search: ''
        };
    },
    computed: {},
    created() {
        console.log(this.headers,333)
    },
    methods: {
        emit(name, payload) {
            this.$emit(name, payload);
        },
        createItem() {
            if (this.canCreateItems) {
                this.emit("create:item");
            }
        },
        createItemFrom(item) {
            if (this.canCreateItems) {
                this.emit("create:item-from", item);
            }
        },
        refreshItem(item) {
            if (this.canRefreshItems) {
                this.emit("refresh:item", item);
            }
        },
        refreshItems(items) {
            if (this.canRefreshItems) {
                this.emit("refresh:items", items);
            }
        },
        viewItem(item) {
            if (this.canViewItems) {
                this.emit("view:item", item);
            }
        },
        editItem(item) {
            if (this.canEditItems) {
                this.emit("edit:item", item);
            }
        },
        deleteItem(item) {
            if (this.canEditItems) {
                this.emit("delete:item", item);
            }
        },
        deleteItems(items) {
            if (this.canEditItems) {
                this.emit("delete:items", items);
            }
        },
        input(selected) {
            this.emit('input', selected);
        }
    }
}