import BasicMixin from '@/mixins/BasicMixin';

export default {
  name: 'v-advanced-edit-dialog',
  components: {},
  mixins: [
    BasicMixin
  ],
  props: {
    activator: {
      description: 'Designate a custom activator when the activator slot is not used. String can be any valid querySelector and Object can be any valid Node.'
    },
    defaultActivatorButtonIcon: {
      type: String,
      description: 'The icon will show on default activator button if no activator given'
    },
    defaultActivatorButtonText: {
      type: String,
      default: 'Abrir menú',
      description: 'The text will show on default activator button if no activator given'
    },
    returnValue: {
      description: 'The value that is updated when the menu is closed - must be primitive. Dot notation is supported'
    },
    title: {
      type: String,
      description: 'Title'
    },
    value: {
      type: Boolean,
      default: false,
      description: 'The value that is updated when the menu is closed - must be primitive. Dot notation is supported'
    }
  },
  data () {
    return {
      showDialog: this.value,
      originalReturnValue: this.shallowCopy(this.returnValue),
      canceled: false
    };
  },
  computed: {
    hasActivatorSlot () {
      return !!this.$slots['activator'] || !!this.$scopedSlots['activator'];
    },
    activatorProp () {
      return !this.hasActivatorSlot ? this.activator : undefined;
    },
    props () {
      var props = {...this.$attrs};
      
      props.activator = this.activatorProp;

      return props;
    }
  },
  watch: {
    showDialog() {
      if (this.showDialog) {
        this.canceled = false;
      }
    }
  },
  created () {
  },
  methods: {
    emit (name, payload) {
      this.$emit(name, payload);
    },
    input() {
      this.emit("input", this.showDialog);
    },
    updateReturnValue(returnValue) {
      this.emit("update:return-value", returnValue);
      this.input();
    },
    save () {
      this.$refs.menu.save(this.returnValue);
    },
    cancel () {
      this.showDialog = false;
      this.canceled = true;
    }
  }
}