import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { bitToHex } from "../../../../helpers/strings";
import { useRetrievePC } from "../hooks/useRetrievePC";
import { useViewStyle } from "../hooks/useViewStyle";

export const ProgramCounter = () => {
  const { data: viewStyle } = useViewStyle();

  const { data: PC } = useRetrievePC();

  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", height: "fit-content", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Program Counter
      </Text>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        {viewStyle === "raw" ? PC : bitToHex(PC)}
      </Text>
    </Grid >
  )
}