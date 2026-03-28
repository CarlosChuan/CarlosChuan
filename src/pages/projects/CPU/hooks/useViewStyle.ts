import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";
import { ViewStyle } from "../context/reducer";

interface ViewStyleResponse {
  setData: (newViewStyle: ViewStyle) => void;
  data: ViewStyle;
}

export const useViewStyle = (): ViewStyleResponse => {
  const { state, dispatch } = useCPUContext();

  const setData = (newViewStyle: ViewStyle) => {
    dispatch({
      type: CPUActionType.SET_VIEW_STYLE,
      payload: newViewStyle,
    })
  }

  return {
    setData,
    data: state.viewStyle,
  }
};
