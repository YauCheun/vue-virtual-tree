import { defineComponent, computed } from "vue";
import { CustomEventFuncType } from "../tree/types";
import "./index.scss";
import "../../assets/styles/index.scss";

export default defineComponent({
  name: "ACheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    halfChecked: {
      // 是否半选
      type: Boolean,
      default: false,
    },
    onChange: Function as CustomEventFuncType<boolean>,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const rootCls = computed(() => {
      let result = "vir-checkbox";
      if (props.modelValue) {
        result += " checked";
      } else if (props.halfChecked) {
        result += " half-checked";
      }
      if (props.disabled) {
        result += " disabled";
      }
      return result;
    });
    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabled) {
        emit("update:modelValue", !props.modelValue);
        emit("change", !props.modelValue);
      }
    };
    return () => {
      return (
        <div class={rootCls.value} onClick={handleClick}>
          <div class="inner" />
          <div class="content">{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});
